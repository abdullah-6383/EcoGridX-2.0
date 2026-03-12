from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import connect_to_mongo, close_mongo_connection
from app.routes import auth, demand, renewable, optimization, failure, load_balancing
from app.routes import alerts, storage, dashboard, settings as settings_routes, consumer, export


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()


app = FastAPI(
    title="EcoGridX 2.0 API",
    description="Smart Grid Energy Management Backend",
    version="2.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(demand.router, prefix="/api")
app.include_router(renewable.router, prefix="/api")
app.include_router(optimization.router, prefix="/api")
app.include_router(failure.router, prefix="/api")
app.include_router(load_balancing.router, prefix="/api")
app.include_router(alerts.router, prefix="/api")
app.include_router(storage.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")
app.include_router(settings_routes.router, prefix="/api")
app.include_router(consumer.router, prefix="/api")
app.include_router(export.router, prefix="/api")


@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "EcoGridX API"}
