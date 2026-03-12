import csv
import io
import json
from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from app.core.security import get_current_user
from app.core.database import get_database
from app.schemas.grid import ExportRequest, StandardResponse

router = APIRouter(prefix="/export", tags=["Data Export"])

ALLOWED_COLLECTIONS = {
    "demand_predictions",
    "renewable_forecasts",
    "grid_optimizations",
    "failure_predictions",
    "load_balancing",
    "alerts",
}


@router.post("")
async def export_data(
    body: ExportRequest,
    current_user: dict = Depends(get_current_user),
):
    if body.collection not in ALLOWED_COLLECTIONS:
        return {"success": False, "data": None, "message": f"Invalid collection. Allowed: {', '.join(ALLOWED_COLLECTIONS)}"}

    db = get_database()
    from datetime import datetime, timezone, timedelta

    cutoff = datetime.now(timezone.utc) - timedelta(days=body.days)
    cursor = db[body.collection].find({
        "user_id": current_user["id"],
        "created_at": {"$gte": cutoff},
    }).sort("created_at", -1)

    records = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        doc["created_at"] = str(doc.get("created_at", ""))
        records.append(doc)

    if body.format == "json":
        content = json.dumps(records, indent=2, default=str)
        return StreamingResponse(
            io.BytesIO(content.encode()),
            media_type="application/json",
            headers={"Content-Disposition": f"attachment; filename={body.collection}.json"},
        )

    elif body.format == "csv":
        if not records:
            return StreamingResponse(
                io.BytesIO(b"No data found"),
                media_type="text/csv",
                headers={"Content-Disposition": f"attachment; filename={body.collection}.csv"},
            )

        output = io.StringIO()
        flat_records = []
        for r in records:
            flat = {}
            for k, v in r.items():
                if isinstance(v, (dict, list)):
                    flat[k] = json.dumps(v, default=str)
                else:
                    flat[k] = v
            flat_records.append(flat)

        writer = csv.DictWriter(output, fieldnames=flat_records[0].keys())
        writer.writeheader()
        writer.writerows(flat_records)

        return StreamingResponse(
            io.BytesIO(output.getvalue().encode()),
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename={body.collection}.csv"},
        )

    else:
        return {"success": False, "data": None, "message": "Supported formats: json, csv"}
