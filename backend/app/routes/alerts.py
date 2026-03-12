from fastapi import APIRouter, Depends
from datetime import datetime, timezone
from app.core.security import get_current_user
from app.core.database import get_database
from app.schemas.grid import AlertActionRequest, StandardResponse

router = APIRouter(prefix="/alerts", tags=["Alerts"])


SEED_ALERTS = [
    {
        "id": "alert-001",
        "type": "critical",
        "title": "Power Line Overload",
        "source": "Transmission Line TL-47",
        "description": "Line operating at 105% capacity (2,625 MW / 2,500 MW limit). Immediate load redistribution required.",
        "actions": ["Redistribute Load", "View Details"],
        "created_at": None,
        "status": "active",
    },
    {
        "id": "alert-002",
        "type": "critical",
        "title": "Voltage Drop Critical",
        "source": "Substation Alpha-7",
        "description": "Voltage dropped to 0.89 p.u. (below 0.95 threshold). Affecting 12,000 customers in residential zones.",
        "actions": ["Voltage Regulation", "Isolate Section"],
        "created_at": None,
        "status": "active",
    },
    {
        "id": "alert-003",
        "type": "critical",
        "title": "Equipment Overload",
        "source": "Transformer T-23",
        "description": "Transformer operating at 115% capacity (23 MVA / 20 MVA rated). Temperature rising to 95°C.",
        "actions": ["Load Transfer", "Emergency Cooling"],
        "created_at": None,
        "status": "active",
    },
    {
        "id": "alert-004",
        "type": "critical",
        "title": "Unusual Pattern Detected",
        "source": "Industrial Zone 4",
        "description": "Abnormal load fluctuation detected: ±340 MW swings in 2-minute intervals. Potential equipment malfunction.",
        "actions": ["Investigate", "Isolate Zone"],
        "created_at": None,
        "status": "active",
    },
    {
        "id": "alert-005",
        "type": "warning",
        "title": "Solar Output Declining",
        "source": "Solar Farm Alpha",
        "description": "Cloud cover increasing. Solar output expected to drop 40% in next 30 minutes.",
        "actions": ["Activate Reserves", "Dismiss"],
        "created_at": None,
        "status": "active",
    },
    {
        "id": "alert-006",
        "type": "warning",
        "title": "Storage Below Threshold",
        "source": "Battery Bank West",
        "description": "Battery storage at 22%. Below recommended 30% minimum reserve level.",
        "actions": ["Begin Charging", "Dismiss"],
        "created_at": None,
        "status": "active",
    },
    {
        "id": "alert-007",
        "type": "info",
        "title": "Scheduled Maintenance",
        "source": "Substation Beta-3",
        "description": "Maintenance scheduled for tomorrow 02:00-06:00. Backup routing will be activated.",
        "actions": ["Acknowledge", "Reschedule"],
        "created_at": None,
        "status": "active",
    },
    {
        "id": "alert-008",
        "type": "info",
        "title": "Model Retraining Complete",
        "source": "AI System",
        "description": "Demand prediction model retrained with latest data. Accuracy improved from 93.8% to 95.1%.",
        "actions": ["View Report", "Dismiss"],
        "created_at": None,
        "status": "active",
    },
]


@router.get("", response_model=StandardResponse)
async def get_alerts(current_user: dict = Depends(get_current_user)):
    db = get_database()
    alerts = await db["alerts"].find({"user_id": current_user["id"]}).sort("created_at", -1).to_list(100)

    if not alerts:
        now = datetime.now(timezone.utc)
        seed = []
        for a in SEED_ALERTS:
            doc = {**a, "user_id": current_user["id"], "created_at": now}
            seed.append(doc)
        if seed:
            await db["alerts"].insert_many(seed)
        alerts = await db["alerts"].find({"user_id": current_user["id"]}).sort("created_at", -1).to_list(100)

    for a in alerts:
        a["_id"] = str(a["_id"])
        a["created_at"] = str(a["created_at"])

    summary = {
        "critical": len([a for a in alerts if a["type"] == "critical" and a["status"] == "active"]),
        "warning": len([a for a in alerts if a["type"] == "warning" and a["status"] == "active"]),
        "info": len([a for a in alerts if a["type"] == "info" and a["status"] == "active"]),
        "resolved": len([a for a in alerts if a["status"] == "resolved"]),
    }

    return {
        "success": True,
        "data": {"alerts": alerts, "summary": summary},
        "message": "Alerts retrieved",
    }


@router.post("/action", response_model=StandardResponse)
async def alert_action(
    body: AlertActionRequest,
    current_user: dict = Depends(get_current_user),
):
    db = get_database()
    result = await db["alerts"].update_one(
        {"id": body.alert_id, "user_id": current_user["id"]},
        {
            "$set": {
                "status": "resolved" if body.action in ("resolve", "acknowledge") else "in_progress",
                "action_taken": body.action,
                "resolved_at": datetime.now(timezone.utc),
            }
        },
    )

    if result.modified_count == 0:
        return {"success": False, "data": None, "message": "Alert not found"}

    return {
        "success": True,
        "data": {"alert_id": body.alert_id, "action": body.action},
        "message": f"Alert action '{body.action}' applied",
    }
