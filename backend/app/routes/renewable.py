from fastapi import APIRouter, Depends
from app.core.security import get_current_user
from app.core.database import get_database
from app.models.grid import prediction_document
from app.schemas.grid import RenewableForecastRequest, StandardResponse
from app.services.gemini import gemini_service

router = APIRouter(prefix="/ai", tags=["Renewable Forecasting"])


@router.post("/renewable-forecast", response_model=StandardResponse)
async def forecast_renewable(
    body: RenewableForecastRequest,
    current_user: dict = Depends(get_current_user),
):
    input_data = body.model_dump()
    result = await gemini_service.forecast_renewable(input_data)

    db = get_database()
    doc = prediction_document(current_user["id"], input_data, result)
    await db["renewable_forecasts"].insert_one(doc)

    return {
        "success": True,
        "data": result,
        "message": "Renewable energy forecast complete",
    }


@router.get("/renewable-forecast/history", response_model=StandardResponse)
async def renewable_history(current_user: dict = Depends(get_current_user)):
    db = get_database()
    cursor = (
        db["renewable_forecasts"]
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
        "message": "Renewable forecast history retrieved",
    }
