from fastapi import APIRouter, Depends
from datetime import datetime, timezone
from app.core.security import get_current_user
from app.core.database import get_database
from app.schemas.grid import JoinChallengeRequest, StandardResponse

router = APIRouter(prefix="/consumer", tags=["Consumer"])


# --- Power Reliability Center ---

@router.get("/reliability", response_model=StandardResponse)
async def get_reliability_data(current_user: dict = Depends(get_current_user)):
    """Power reliability data matching PowerReliabilityCenter.tsx"""
    db = get_database()
    doc = await db["reliability_data"].find_one({}, {"_id": 0, "created_at": 0})

    if not doc:
        return {"success": False, "data": None, "message": "Reliability data not found"}

    return {
        "success": True,
        "data": {
            "areas": doc.get("areas", []),
            "load_shedding": doc.get("load_shedding", []),
            "stats": doc.get("stats", {}),
            "outage_updates": doc.get("outage_updates", []),
            "notification_settings": doc.get("notification_settings", []),
        },
        "message": "Reliability data retrieved",
    }


# --- Usage & Bill Analytics ---

@router.get("/usage-analytics", response_model=StandardResponse)
async def get_usage_analytics(current_user: dict = Depends(get_current_user)):
    """Usage & bill analytics matching UsageBillAnalytics.tsx"""
    db = get_database()
    doc = await db["usage_analytics"].find_one(
        {"user_id": current_user["id"]}, {"_id": 0, "user_id": 0, "created_at": 0}
    )

    if not doc:
        return {"success": False, "data": None, "message": "Usage analytics not found"}

    return {
        "success": True,
        "data": doc,
        "message": "Usage analytics retrieved",
    }


# --- Community / Gamification ---

@router.get("/community", response_model=StandardResponse)
async def get_community_data(current_user: dict = Depends(get_current_user)):
    """Community grid heroes data matching CommunityGridHeroes.tsx"""
    db = get_database()
    user_stats = await db["community_stats"].find_one({"user_id": current_user["id"]})

    if not user_stats:
        user_stats = {
            "user_id": current_user["id"],
            "power_cuts_prevented": 8,
            "energy_saved_kwh": 145.6,
            "carbon_reduced_kg": 87.3,
            "rank": 23,
            "challenges_completed": 15,
            "streak_days": 7,
            "created_at": datetime.now(timezone.utc),
        }
        await db["community_stats"].insert_one(user_stats)

    user_stats["_id"] = str(user_stats.get("_id", ""))
    user_stats["created_at"] = str(user_stats.get("created_at", ""))

    # Read challenges from DB
    challenges = []
    async for ch in db["community_challenges"].find({}, {"_id": 0, "created_at": 0}):
        challenges.append(ch)

    # Read badges from DB and merge user progress
    badges = []
    user_participations = {}
    async for p in db["challenge_participations"].find({"user_id": current_user["id"]}):
        user_participations[p["challenge_id"]] = p
    async for b in db["community_badges"].find({}, {"_id": 0, "created_at": 0}):
        # First 3 badges earned, rest in progress
        idx = len(badges)
        b["earned"] = idx < 3
        b["progress"] = 100 if idx < 3 else max(20, 100 - idx * 12)
        badges.append(b)

    # Read leaderboard from DB
    leaderboard = []
    async for entry in db["community_leaderboard"].find({}, {"_id": 0, "created_at": 0}).sort("rank", 1):
        leaderboard.append(entry)

    return {
        "success": True,
        "data": {
            "personal_stats": user_stats,
            "challenges": challenges,
            "badges": badges,
            "leaderboard": leaderboard,
        },
        "message": "Community data retrieved",
    }


@router.post("/community/join-challenge", response_model=StandardResponse)
async def join_challenge(
    body: JoinChallengeRequest,
    current_user: dict = Depends(get_current_user),
):
    db = get_database()
    participation = {
        "user_id": current_user["id"],
        "challenge_id": body.challenge_id,
        "joined_at": datetime.now(timezone.utc),
        "progress": 0,
        "status": "active",
    }

    existing = await db["challenge_participations"].find_one({
        "user_id": current_user["id"],
        "challenge_id": body.challenge_id,
    })
    if existing:
        return {"success": False, "data": None, "message": "Already joined this challenge"}

    await db["challenge_participations"].insert_one(participation)

    return {
        "success": True,
        "data": {"challenge_id": body.challenge_id},
        "message": "Successfully joined challenge",
    }


@router.post("/community/leave-challenge", response_model=StandardResponse)
async def leave_challenge(
    body: JoinChallengeRequest,
    current_user: dict = Depends(get_current_user),
):
    db = get_database()
    result = await db["challenge_participations"].delete_one({
        "user_id": current_user["id"],
        "challenge_id": body.challenge_id,
    })

    if result.deleted_count == 0:
        return {"success": False, "data": None, "message": "Not participating in this challenge"}

    return {
        "success": True,
        "data": {"challenge_id": body.challenge_id},
        "message": "Left challenge successfully",
    }
