from fastapi import APIRouter, Depends, HTTPException, status
from app.core.database import get_database
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token,
    get_current_user,
)
from app.models.user import user_document, user_response
from app.schemas.user import UserRegister, UserLogin, RefreshTokenRequest
from app.schemas.grid import UserProfileUpdate, ConsumerProfileUpdate, PasswordChangeRequest

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
async def register(body: UserRegister):
    db = get_database()

    existing = await db["users"].find_one({"email": body.email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    hashed = hash_password(body.password)
    doc = user_document(body.name, body.email, hashed)
    result = await db["users"].insert_one(doc)

    user_id = str(result.inserted_id)
    access_token = create_access_token({"sub": user_id})
    refresh_token = create_refresh_token({"sub": user_id})

    await db["users"].update_one(
        {"_id": result.inserted_id},
        {"$push": {"refresh_tokens": refresh_token}},
    )

    doc["_id"] = result.inserted_id
    return {
        "success": True,
        "data": {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": user_response(doc),
        },
        "message": "Registration successful",
    }


@router.post("/login")
async def login(body: UserLogin):
    db = get_database()

    user = await db["users"].find_one({"email": body.email})
    if not user or not verify_password(body.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    user_id = str(user["_id"])
    access_token = create_access_token({"sub": user_id})
    refresh_token = create_refresh_token({"sub": user_id})

    await db["users"].update_one(
        {"_id": user["_id"]},
        {"$push": {"refresh_tokens": refresh_token}},
    )

    return {
        "success": True,
        "data": {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": user_response(user),
        },
        "message": "Login successful",
    }


@router.post("/refresh")
async def refresh_token(body: RefreshTokenRequest):
    db = get_database()

    payload = decode_token(body.refresh_token)
    if payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    user_id = payload.get("sub")
    from bson import ObjectId

    user = await db["users"].find_one({
        "_id": ObjectId(user_id),
        "refresh_tokens": body.refresh_token,
    })
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token not found or expired",
        )

    new_access_token = create_access_token({"sub": user_id})

    return {
        "success": True,
        "data": {
            "access_token": new_access_token,
            "token_type": "bearer",
        },
        "message": "Token refreshed",
    }


@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "success": True,
        "data": {
            "id": current_user.get("id"),
            "name": current_user.get("name"),
            "email": current_user.get("email"),
            "created_at": str(current_user.get("created_at", "")),
        },
        "message": "User profile retrieved",
    }


@router.post("/logout")
async def logout(body: RefreshTokenRequest, current_user: dict = Depends(get_current_user)):
    db = get_database()
    from bson import ObjectId

    await db["users"].update_one(
        {"_id": ObjectId(current_user["id"])},
        {"$pull": {"refresh_tokens": body.refresh_token}},
    )

    return {
        "success": True,
        "data": None,
        "message": "Logged out successfully",
    }


@router.put("/profile")
async def update_profile(
    body: UserProfileUpdate,
    current_user: dict = Depends(get_current_user),
):
    db = get_database()
    from bson import ObjectId
    from datetime import datetime, timezone

    update_data = {k: v for k, v in body.model_dump().items() if v is not None}
    if not update_data:
        return {"success": False, "data": None, "message": "No fields to update"}

    update_data["updated_at"] = datetime.now(timezone.utc)

    await db["users"].update_one(
        {"_id": ObjectId(current_user["id"])},
        {"$set": update_data},
    )

    return {
        "success": True,
        "data": update_data,
        "message": "Profile updated successfully",
    }


@router.put("/password")
async def change_password(
    body: PasswordChangeRequest,
    current_user: dict = Depends(get_current_user),
):
    db = get_database()
    from bson import ObjectId

    user = await db["users"].find_one({"_id": ObjectId(current_user["id"])})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(body.current_password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect",
        )

    new_hash = hash_password(body.new_password)
    await db["users"].update_one(
        {"_id": ObjectId(current_user["id"])},
        {"$set": {"password": new_hash}},
    )

    return {
        "success": True,
        "data": None,
        "message": "Password changed successfully",
    }
