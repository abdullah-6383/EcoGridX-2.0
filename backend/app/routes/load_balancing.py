from fastapi import APIRouter, Depends
from app.core.security import get_current_user
from app.core.database import get_database
from app.models.grid import prediction_document
from app.schemas.grid import LoadBalancingRequest, StandardResponse
from app.services.gemini import gemini_service

router = APIRouter(prefix="/ai", tags=["Load Balancing"])


@router.post("/load-balance", response_model=StandardResponse)
async def balance_load(
    body: LoadBalancingRequest,
    current_user: dict = Depends(get_current_user),
):
    input_data = body.model_dump()
    result = await gemini_service.balance_load(input_data)

    db = get_database()
    doc = prediction_document(current_user["id"], input_data, result)
    await db["load_balancing"].insert_one(doc)

    return {
        "success": True,
        "data": result,
        "message": "Load balancing optimization complete",
    }


@router.get("/load-balance/history", response_model=StandardResponse)
async def load_balance_history(current_user: dict = Depends(get_current_user)):
    db = get_database()
    cursor = (
        db["load_balancing"]
        .find({"user_id": current_user["id"]})
        .sort("created_at", -1)
        .limit(10)
    )
    records = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        doc["created_at"] = str(doc["created_at"])
        records.append(doc)

    return {
        "success": True,
        "data": records,
        "message": "Load balancing history retrieved",
    }
