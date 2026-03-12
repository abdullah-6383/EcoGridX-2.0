from pydantic import BaseModel
from typing import List, Optional, Any


class DemandPredictionRequest(BaseModel):
    historical_data: List[float]
    location: str
    season: str
    time_of_day: str


class RenewableForecastRequest(BaseModel):
    temperature: float
    wind_speed: float
    cloud_cover: float
    humidity: float
    solar_capacity_kw: float
    wind_capacity_kw: float


class EnergySource(BaseModel):
    name: str
    capacity_kw: float
    current_output_kw: float
    cost_per_kwh: float


class GridOptimizationRequest(BaseModel):
    current_load_kw: float
    available_sources: List[EnergySource]
    storage_level_percent: float
    demand_forecast: List[float]


class EquipmentData(BaseModel):
    id: str
    name: str
    temperature: float
    vibration: float
    load_cycles: int
    age_years: float
    last_maintenance_days: int


class FailurePredictionRequest(BaseModel):
    equipment: List[EquipmentData]


class Zone(BaseModel):
    id: str
    name: str
    current_load_kw: float
    capacity_kw: float


class TransferLimit(BaseModel):
    from_zone: str
    to_zone: str
    max_kw: float


class LoadBalancingRequest(BaseModel):
    zones: List[Zone]
    transfer_limits: List[TransferLimit]


class StandardResponse(BaseModel):
    success: bool
    data: Optional[Any] = None
    message: str


# --- Alerts ---
class AlertActionRequest(BaseModel):
    alert_id: str
    action: str  # "acknowledge", "resolve", "redistribute", "isolate", etc.


# --- Storage Management ---
class StorageUnit(BaseModel):
    id: str
    name: str
    capacity_kwh: float
    current_level_percent: float
    current_mode: str  # "Charging", "Discharging", "Standby"
    type: str  # "Lithium-ion", "Pumped Hydro", "Vanadium Flow"
    location: str


class StorageCommandRequest(BaseModel):
    unit_id: str
    command: str  # "charge", "discharge", "standby"
    target_level_percent: Optional[float] = None


# --- Settings ---
class GridSettings(BaseModel):
    model_config = {"protected_namespaces": ()}

    base_voltage_kv: Optional[float] = 400
    frequency_hz: Optional[float] = 50
    load_flow_method: Optional[str] = "Newton-Raphson"
    voltage_tolerance_min: Optional[float] = 0.95
    voltage_tolerance_max: Optional[float] = 1.05
    auto_optimization: Optional[bool] = True
    model_retraining: Optional[str] = "Daily"
    prediction_horizon: Optional[str] = "24 hours"
    confidence_threshold: Optional[int] = 85
    dark_mode: Optional[bool] = True
    auto_refresh: Optional[bool] = True
    refresh_rate_seconds: Optional[int] = 5
    data_retention_days: Optional[int] = 30
    export_format: Optional[str] = "CSV"
    session_timeout_minutes: Optional[int] = 30


class ConsumerSettings(BaseModel):
    bill_alerts: Optional[bool] = True
    outage_notifications: Optional[bool] = True
    energy_saving_tips: Optional[bool] = False
    theme: Optional[str] = "Dark Theme"
    language: Optional[str] = "English"


# --- User Profile Update ---
class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    department: Optional[str] = None


class ConsumerProfileUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    consumer_number: Optional[str] = None


class PasswordChangeRequest(BaseModel):
    current_password: str
    new_password: str


# --- Consumer Dashboard ---
class TariffSlab(BaseModel):
    slab: int
    min_units: int
    max_units: Optional[int] = None
    rate_per_unit: float
    color: str


# --- Community / Gamification ---
class JoinChallengeRequest(BaseModel):
    challenge_id: str


# --- Data Export ---
class ExportRequest(BaseModel):
    format: str  # "csv", "json", "excel"
    collection: str  # which data to export
    days: Optional[int] = 30
