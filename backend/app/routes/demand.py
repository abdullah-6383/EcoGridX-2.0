from fastapi import APIRouter, Depends
from app.core.security import get_current_user
from app.core.database import get_database
from app.models.grid import prediction_document
from app.schemas.grid import DemandPredictionRequest, StandardResponse
from app.services.gemini import gemini_service

router = APIRouter(prefix="/ai", tags=["Demand Prediction"])


@router.post("/demand-prediction", response_model=StandardResponse)
async def predict_demand(
    body: DemandPredictionRequest,
    current_user: dict = Depends(get_current_user),
):
    input_data = body.model_dump()
    result = await gemini_service.predict_demand(input_data)

    db = get_database()
    doc = prediction_document(current_user["id"], input_data, result)
    await db["demand_predictions"].insert_one(doc)

    return {
        "success": True,
        "data": result,
        "message": "Demand prediction complete",
    }


@router.get("/demand-prediction/history", response_model=StandardResponse)
async def demand_history(current_user: dict = Depends(get_current_user)):
    db = get_database()
    cursor = (
        db["demand_predictions"]
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
        "message": "Demand prediction history retrieved",
    }
