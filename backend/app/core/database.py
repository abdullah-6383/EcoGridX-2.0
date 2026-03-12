from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING, DESCENDING
from app.core.config import settings

client: AsyncIOMotorClient = None
db = None


async def connect_to_mongo():
    global client, db
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    db = client["ecogridx"]
    await create_indexes()


async def close_mongo_connection():
    global client
    if client:
        client.close()


async def create_indexes():
    await db["users"].create_index([("email", ASCENDING)], unique=True)
    prediction_collections = [
        "demand_predictions",
        "renewable_forecasts",
        "grid_optimizations",
        "failure_predictions",
        "load_balancing",
    ]
    for collection_name in prediction_collections:
        await db[collection_name].create_index([("created_at", DESCENDING)])
        await db[collection_name].create_index([("user_id", ASCENDING)])


def get_database():
    return db
