from fastapi import APIRouter, Depends
from app.core.security import get_current_user
from app.core.database import get_database
from app.models.grid import prediction_document
from app.schemas.grid import FailurePredictionRequest, StandardResponse
from app.services.gemini import gemini_service

router = APIRouter(prefix="/ai", tags=["Failure Prediction"])


@router.post("/failure-predict", response_model=StandardResponse)
async def predict_failure(
    body: FailurePredictionRequest,
    current_user: dict = Depends(get_current_user),
):
    input_data = body.model_dump()
    result = await gemini_service.predict_failure(input_data)

    db = get_database()
    doc = prediction_document(current_user["id"], input_data, result)
    await db["failure_predictions"].insert_one(doc)

    return {
        "success": True,
        "data": result,
        "message": "Failure prediction complete",
    }


@router.get("/failure-predict/history", response_model=StandardResponse)
async def failure_history(current_user: dict = Depends(get_current_user)):
    db = get_database()
    cursor = (
        db["failure_predictions"]
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
        "message": "Failure prediction history retrieved",
    }
