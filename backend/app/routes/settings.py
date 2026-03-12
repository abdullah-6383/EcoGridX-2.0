from fastapi import APIRouter, Depends
from datetime import datetime, timezone
from app.core.security import get_current_user
from app.core.database import get_database
from app.schemas.grid import GridSettings, ConsumerSettings, StandardResponse

router = APIRouter(prefix="/settings", tags=["Settings"])


@router.get("/grid", response_model=StandardResponse)
async def get_grid_settings(current_user: dict = Depends(get_current_user)):
    db = get_database()
    settings = await db["grid_settings"].find_one({"user_id": current_user["id"]})

    if not settings:
        defaults = GridSettings().model_dump()
        defaults["user_id"] = current_user["id"]
        defaults["created_at"] = datetime.now(timezone.utc)
        await db["grid_settings"].insert_one(defaults)
        settings = defaults

    settings["_id"] = str(settings.get("_id", ""))
    settings["created_at"] = str(settings.get("created_at", ""))

    return {"success": True, "data": settings, "message": "Grid settings retrieved"}


@router.put("/grid", response_model=StandardResponse)
async def update_grid_settings(
    body: GridSettings,
    current_user: dict = Depends(get_current_user),
):
    db = get_database()
    update_data = {k: v for k, v in body.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc)

    result = await db["grid_settings"].update_one(
        {"user_id": current_user["id"]},
        {"$set": update_data},
        upsert=True,
    )

    return {"success": True, "data": update_data, "message": "Grid settings updated"}


@router.get("/consumer", response_model=StandardResponse)
async def get_consumer_settings(current_user: dict = Depends(get_current_user)):
    db = get_database()
    settings = await db["consumer_settings"].find_one({"user_id": current_user["id"]})

    if not settings:
        defaults = ConsumerSettings().model_dump()
        defaults["user_id"] = current_user["id"]
        defaults["created_at"] = datetime.now(timezone.utc)
        await db["consumer_settings"].insert_one(defaults)
        settings = defaults

    settings["_id"] = str(settings.get("_id", ""))
    settings["created_at"] = str(settings.get("created_at", ""))

    return {"success": True, "data": settings, "message": "Consumer settings retrieved"}


@router.put("/consumer", response_model=StandardResponse)
async def update_consumer_settings(
    body: ConsumerSettings,
    current_user: dict = Depends(get_current_user),
):
    db = get_database()
    update_data = {k: v for k, v in body.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc)

    await db["consumer_settings"].update_one(
        {"user_id": current_user["id"]},
        {"$set": update_data},
        upsert=True,
    )

    return {"success": True, "data": update_data, "message": "Consumer settings updated"}
