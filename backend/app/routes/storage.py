from fastapi import APIRouter, Depends
from datetime import datetime, timezone
from app.core.security import get_current_user
from app.core.database import get_database
from app.schemas.grid import StorageCommandRequest, StandardResponse

router = APIRouter(prefix="/storage", tags=["Storage Management"])


SEED_UNITS = [
    {
        "id": "bat-001",
        "name": "Battery Bank Alpha",
        "capacity_kwh": 850,
        "current_level_percent": 78,
        "charge_rate_kw": 120,
        "discharge_rate_kw": 95,
        "current_mode": "Charging",
        "health": 94,
        "efficiency": 96.2,
        "location": "Substation West",
        "status": "active",
        "type": "Lithium-ion",
        "temperature": 32,
        "cycles": 1247,
        "last_maintenance": "2026-02-15",
    },
    {
        "id": "bat-002",
        "name": "Battery Bank Beta",
        "capacity_kwh": 650,
        "current_level_percent": 45,
        "charge_rate_kw": 85,
        "discharge_rate_kw": 110,
        "current_mode": "Discharging",
        "health": 91,
        "efficiency": 94.8,
        "location": "Industrial Zone",
        "status": "active",
        "type": "Lithium-ion",
        "temperature": 35,
        "cycles": 2103,
        "last_maintenance": "2026-01-28",
    },
    {
        "id": "hyd-001",
        "name": "Pumped Hydro Unit",
        "capacity_kwh": 1200,
        "current_level_percent": 82,
        "charge_rate_kw": 200,
        "discharge_rate_kw": 180,
        "current_mode": "Standby",
        "health": 97,
        "efficiency": 88.5,
        "location": "Mountain Reserve",
        "status": "active",
        "type": "Pumped Hydro",
        "temperature": 18,
        "cycles": 856,
        "last_maintenance": "2026-02-01",
    },
    {
        "id": "flow-001",
        "name": "Flow Battery East",
        "capacity_kwh": 350,
        "current_level_percent": 61,
        "charge_rate_kw": 50,
        "discharge_rate_kw": 45,
        "current_mode": "Charging",
        "health": 99,
        "efficiency": 82.3,
        "location": "Commercial District",
        "status": "active",
        "type": "Vanadium Flow",
        "temperature": 28,
        "cycles": 412,
        "last_maintenance": "2026-02-20",
    },
    {
        "id": "bat-003",
        "name": "Battery Bank Gamma",
        "capacity_kwh": 200,
        "current_level_percent": 33,
        "charge_rate_kw": 40,
        "discharge_rate_kw": 35,
        "current_mode": "Standby",
        "health": 88,
        "efficiency": 93.1,
        "location": "Residential South",
        "status": "standby",
        "type": "Lithium-ion",
        "temperature": 29,
        "cycles": 3021,
        "last_maintenance": "2025-12-10",
    },
]


@router.get("", response_model=StandardResponse)
async def get_storage_units(current_user: dict = Depends(get_current_user)):
    db = get_database()
    units = await db["storage_units"].find({"user_id": current_user["id"]}).to_list(50)

    if not units:
        seed = []
        for u in SEED_UNITS:
            seed.append({**u, "user_id": current_user["id"], "created_at": datetime.now(timezone.utc)})
        await db["storage_units"].insert_many(seed)
        units = await db["storage_units"].find({"user_id": current_user["id"]}).to_list(50)

    for u in units:
        u["_id"] = str(u["_id"])
        u["created_at"] = str(u.get("created_at", ""))

    total_capacity = sum(u["capacity_kwh"] for u in units)
    current_energy = sum(u["capacity_kwh"] * u["current_level_percent"] / 100 for u in units)
    active_count = len([u for u in units if u["status"] == "active"])
    standby_count = len([u for u in units if u["status"] == "standby"])

    overview = {
        "total_capacity_kwh": total_capacity,
        "current_energy_kwh": round(current_energy, 1),
        "utilization_percent": round(current_energy / total_capacity * 100, 1) if total_capacity > 0 else 0,
        "total_units": len(units),
        "active_units": active_count,
        "standby_units": standby_count,
    }

    return {
        "success": True,
        "data": {"units": units, "overview": overview},
        "message": "Storage units retrieved",
    }


@router.get("/{unit_id}", response_model=StandardResponse)
async def get_storage_unit(unit_id: str, current_user: dict = Depends(get_current_user)):
    db = get_database()
    unit = await db["storage_units"].find_one({"id": unit_id, "user_id": current_user["id"]})
    if not unit:
        return {"success": False, "data": None, "message": "Storage unit not found"}

    unit["_id"] = str(unit["_id"])
    return {"success": True, "data": unit, "message": "Storage unit retrieved"}


@router.post("/command", response_model=StandardResponse)
async def storage_command(
    body: StorageCommandRequest,
    current_user: dict = Depends(get_current_user),
):
    db = get_database()
    update_fields = {
        "current_mode": body.command.capitalize(),
        "updated_at": datetime.now(timezone.utc),
    }
    if body.target_level_percent is not None:
        update_fields["target_level_percent"] = body.target_level_percent

    result = await db["storage_units"].update_one(
        {"id": body.unit_id, "user_id": current_user["id"]},
        {"$set": update_fields},
    )

    if result.modified_count == 0:
        return {"success": False, "data": None, "message": "Storage unit not found"}

    return {
        "success": True,
        "data": {"unit_id": body.unit_id, "new_mode": body.command.capitalize()},
        "message": f"Storage unit set to {body.command}",
    }
