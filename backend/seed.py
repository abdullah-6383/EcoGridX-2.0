"""
Seed script for EcoGridX 2.0 — defines schemas + populates MongoDB with demo data.

Creates:
  - JSON Schema validators on all 13 collections
  - 2 demo users (grid operator + consumer)
  - Alerts, storage units, settings, consumer data
  - AI prediction history (demand, renewable, optimization, failure, load-balancing)
  - Community stats + challenge participation

Usage:
    cd backend
    python seed.py
"""

import asyncio
import random
from datetime import datetime, timedelta, timezone

from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext

# ── Config ──────────────────────────────────────────────────────────
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "ecogridx"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

now = datetime.now(timezone.utc)


def ts(days_ago: int = 0, hours_ago: int = 0) -> datetime:
    return now - timedelta(days=days_ago, hours=hours_ago)


# ════════════════════════════════════════════════════════════════════
#  JSON SCHEMA VALIDATORS  (MongoDB $jsonSchema)
# ════════════════════════════════════════════════════════════════════

SCHEMAS = {
    "users": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["name", "email", "password", "created_at", "updated_at"],
            "properties": {
                "name":            {"bsonType": "string", "description": "Full name of user"},
                "email":           {"bsonType": "string", "description": "Unique email address"},
                "password":        {"bsonType": "string", "description": "Bcrypt hashed password"},
                "phone":           {"bsonType": "string", "description": "Contact phone number"},
                "department":      {"bsonType": "string", "description": "User department or category"},
                "refresh_tokens":  {"bsonType": "array", "items": {"bsonType": "string"}, "description": "Active JWT refresh tokens"},
                "created_at":      {"bsonType": "date", "description": "Account creation timestamp"},
                "updated_at":      {"bsonType": "date", "description": "Last profile update timestamp"},
            },
        }
    },

    "alerts": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["id", "type", "title", "source", "description", "status", "user_id"],
            "properties": {
                "id":              {"bsonType": "string", "description": "Alert identifier (alert-XXX)"},
                "type":            {"enum": ["critical", "warning", "info"], "description": "Severity level"},
                "title":           {"bsonType": "string", "description": "Alert headline"},
                "source":          {"bsonType": "string", "description": "Originating equipment or system"},
                "description":     {"bsonType": "string", "description": "Detailed alert message"},
                "actions":         {"bsonType": "array", "items": {"bsonType": "string"}, "description": "Available action buttons"},
                "status":          {"enum": ["active", "resolved", "acknowledged"], "description": "Current status"},
                "action_taken":    {"bsonType": "string", "description": "Action taken on resolved alerts"},
                "resolved_at":     {"bsonType": "date", "description": "When the alert was resolved"},
                "user_id":         {"bsonType": "string", "description": "Owner user ID"},
                "created_at":      {"bsonType": "date", "description": "Alert timestamp"},
            },
        }
    },

    "storage_units": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["id", "name", "capacity_kwh", "current_level_percent", "user_id"],
            "properties": {
                "id":                      {"bsonType": "string", "description": "Unit identifier (bat-XXX)"},
                "name":                    {"bsonType": "string", "description": "Storage unit display name"},
                "capacity_kwh":            {"bsonType": ["int", "double"], "description": "Max capacity in kWh"},
                "current_level_percent":   {"bsonType": ["int", "double"], "minimum": 0, "maximum": 100, "description": "Current charge %"},
                "charge_rate_kw":          {"bsonType": ["int", "double"], "description": "Charge rate in kW"},
                "discharge_rate_kw":       {"bsonType": ["int", "double"], "description": "Discharge rate in kW"},
                "current_mode":            {"enum": ["Charging", "Discharging", "Standby"], "description": "Operating mode"},
                "health":                  {"bsonType": ["int", "double"], "minimum": 0, "maximum": 100, "description": "Health score %"},
                "efficiency":              {"bsonType": ["int", "double"], "description": "Round-trip efficiency %"},
                "location":                {"bsonType": "string", "description": "Physical location"},
                "status":                  {"enum": ["active", "inactive", "maintenance"], "description": "Unit status"},
                "type":                    {"bsonType": "string", "description": "Battery chemistry / type"},
                "temperature":             {"bsonType": ["int", "double"], "description": "Current temperature C"},
                "cycles":                  {"bsonType": "int", "description": "Total charge/discharge cycles"},
                "last_maintenance":        {"bsonType": "string", "description": "Last maintenance date YYYY-MM-DD"},
                "user_id":                 {"bsonType": "string", "description": "Owner user ID"},
                "created_at":              {"bsonType": "date", "description": "Record creation timestamp"},
            },
        }
    },

    "grid_settings": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["user_id"],
            "properties": {
                "user_id":                 {"bsonType": "string", "description": "Owner user ID"},
                "base_voltage_kv":         {"bsonType": ["int", "double"], "description": "Base voltage in kV"},
                "frequency_hz":            {"bsonType": ["int", "double"], "description": "Grid frequency in Hz"},
                "load_flow_method":        {"bsonType": "string", "description": "Load flow algorithm name"},
                "voltage_tolerance_min":   {"bsonType": "double", "description": "Min voltage tolerance (p.u.)"},
                "voltage_tolerance_max":   {"bsonType": "double", "description": "Max voltage tolerance (p.u.)"},
                "auto_optimization":       {"bsonType": "bool", "description": "Enable auto grid optimization"},
                "model_retraining":        {"bsonType": "string", "description": "Retraining schedule"},
                "prediction_horizon":      {"bsonType": "string", "description": "Prediction look-ahead window"},
                "confidence_threshold":    {"bsonType": ["int", "double"], "description": "Min confidence threshold %"},
                "dark_mode":               {"bsonType": "bool", "description": "UI dark mode toggle"},
                "auto_refresh":            {"bsonType": "bool", "description": "UI auto-refresh toggle"},
                "refresh_rate_seconds":    {"bsonType": ["int", "double"], "description": "Refresh interval in seconds"},
                "data_retention_days":     {"bsonType": ["int", "double"], "description": "Data retention in days"},
                "export_format":           {"bsonType": "string", "description": "Default export format"},
                "session_timeout_minutes": {"bsonType": ["int", "double"], "description": "Session timeout in minutes"},
                "created_at":              {"bsonType": "date", "description": "Record creation timestamp"},
            },
        }
    },

    "consumer_settings": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["user_id"],
            "properties": {
                "user_id":              {"bsonType": "string", "description": "Owner user ID"},
                "bill_alerts":          {"bsonType": "bool", "description": "Enable bill threshold alerts"},
                "outage_notifications": {"bsonType": "bool", "description": "Enable outage push notifications"},
                "energy_saving_tips":   {"bsonType": "bool", "description": "Enable energy saving suggestions"},
                "theme":                {"bsonType": "string", "description": "UI theme preference"},
                "language":             {"bsonType": "string", "description": "UI language preference"},
                "created_at":           {"bsonType": "date", "description": "Record creation timestamp"},
            },
        }
    },

    "consumer_data": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["user_id", "units_used", "bill_amount"],
            "properties": {
                "user_id":       {"bsonType": "string", "description": "Owner user ID"},
                "units_used":    {"bsonType": ["int", "double"], "description": "Current billing period units consumed"},
                "current_slab":  {"bsonType": "int", "description": "Current tariff slab (1-4)"},
                "bill_amount":   {"bsonType": ["int", "double"], "description": "Current bill amount"},
                "bill_history": {
                    "bsonType": "array",
                    "description": "Monthly billing history",
                    "items": {
                        "bsonType": "object",
                        "properties": {
                            "month":  {"bsonType": "string", "description": "Month label (e.g. Mar 2026)"},
                            "amount": {"bsonType": ["int", "double"], "description": "Bill amount"},
                            "units":  {"bsonType": ["int", "double"], "description": "Units consumed"},
                        },
                    },
                },
                "comparison": {
                    "bsonType": "object",
                    "description": "Usage comparison with peers",
                    "properties": {
                        "neighbors":     {"bsonType": "object", "description": "vs. neighbors"},
                        "city":          {"bsonType": "object", "description": "vs. city average"},
                        "similar_homes": {"bsonType": "object", "description": "vs. similar homes"},
                    },
                },
                "created_at": {"bsonType": "date", "description": "Record creation timestamp"},
            },
        }
    },

    "community_stats": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["user_id"],
            "properties": {
                "user_id":              {"bsonType": "string", "description": "Owner user ID"},
                "power_cuts_prevented": {"bsonType": "int", "description": "Total power cuts prevented"},
                "energy_saved_kwh":     {"bsonType": ["int", "double"], "description": "Total energy saved in kWh"},
                "carbon_reduced_kg":    {"bsonType": ["int", "double"], "description": "Carbon emissions reduced in kg"},
                "rank":                 {"bsonType": "int", "description": "Community rank position"},
                "challenges_completed": {"bsonType": "int", "description": "Total challenges completed"},
                "streak_days":          {"bsonType": "int", "description": "Current streak in days"},
                "created_at":           {"bsonType": "date", "description": "Record creation timestamp"},
            },
        }
    },

    "challenge_participations": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["user_id", "challenge_id", "status"],
            "properties": {
                "user_id":      {"bsonType": "string", "description": "Participant user ID"},
                "challenge_id": {"bsonType": "string", "description": "Challenge identifier"},
                "joined_at":    {"bsonType": "date", "description": "When the user joined the challenge"},
                "progress":     {"bsonType": ["int", "double"], "minimum": 0, "maximum": 100, "description": "Completion progress %"},
                "status":       {"enum": ["active", "completed", "abandoned"], "description": "Participation status"},
            },
        }
    },

    "demand_predictions": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["user_id", "input", "output", "created_at"],
            "properties": {
                "user_id": {"bsonType": "string", "description": "Owner user ID"},
                "input": {
                    "bsonType": "object",
                    "description": "Prediction input parameters",
                    "properties": {
                        "historical_data": {"bsonType": "array", "items": {"bsonType": ["int", "double"]}, "description": "24-hr load profile (kW)"},
                        "location":        {"bsonType": "string", "description": "Target location"},
                        "season":          {"bsonType": "string", "description": "Season (summer/winter/monsoon/spring)"},
                        "time_of_day":     {"bsonType": "string", "description": "Time of day category"},
                    },
                },
                "output": {
                    "bsonType": "object",
                    "description": "AI model prediction results",
                    "properties": {
                        "predicted_demand_kw": {"bsonType": ["int", "double"], "description": "Predicted demand in kW"},
                        "confidence":          {"bsonType": ["int", "double"], "description": "Confidence score %"},
                        "peak_hour":           {"bsonType": "int", "description": "Predicted peak hour (0-23)"},
                        "recommendations":     {"bsonType": "array", "items": {"bsonType": "string"}, "description": "Action recommendations"},
                    },
                },
                "created_at": {"bsonType": "date", "description": "Prediction timestamp"},
            },
        }
    },

    "renewable_forecasts": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["user_id", "input", "output", "created_at"],
            "properties": {
                "user_id": {"bsonType": "string", "description": "Owner user ID"},
                "input": {
                    "bsonType": "object",
                    "description": "Weather and capacity inputs",
                    "properties": {
                        "temperature":       {"bsonType": ["int", "double"], "description": "Temperature C"},
                        "wind_speed":        {"bsonType": ["int", "double"], "description": "Wind speed m/s"},
                        "cloud_cover":       {"bsonType": ["int", "double"], "description": "Cloud cover %"},
                        "humidity":          {"bsonType": ["int", "double"], "description": "Humidity %"},
                        "solar_capacity_kw": {"bsonType": ["int", "double"], "description": "Installed solar capacity kW"},
                        "wind_capacity_kw":  {"bsonType": ["int", "double"], "description": "Installed wind capacity kW"},
                    },
                },
                "output": {
                    "bsonType": "object",
                    "description": "Renewable generation forecast",
                    "properties": {
                        "solar_forecast_kw":  {"bsonType": ["int", "double"], "description": "Predicted solar output kW"},
                        "wind_forecast_kw":   {"bsonType": ["int", "double"], "description": "Predicted wind output kW"},
                        "total_renewable_kw": {"bsonType": ["int", "double"], "description": "Total predicted renewable kW"},
                        "confidence":         {"bsonType": ["int", "double"], "description": "Confidence score %"},
                        "optimal_hours":      {"bsonType": "array", "items": {"bsonType": "string"}, "description": "Best hour ranges"},
                    },
                },
                "created_at": {"bsonType": "date", "description": "Forecast timestamp"},
            },
        }
    },

    "grid_optimizations": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["user_id", "input", "output", "created_at"],
            "properties": {
                "user_id": {"bsonType": "string", "description": "Owner user ID"},
                "input": {
                    "bsonType": "object",
                    "description": "Current grid state for optimization",
                    "properties": {
                        "current_load_kw":       {"bsonType": ["int", "double"], "description": "Current total load kW"},
                        "available_sources":     {"bsonType": "array", "description": "Available energy sources with capacity and cost"},
                        "storage_level_percent": {"bsonType": ["int", "double"], "description": "Storage charge level %"},
                        "demand_forecast":       {"bsonType": "array", "items": {"bsonType": ["int", "double"]}, "description": "Upcoming demand forecast kW"},
                    },
                },
                "output": {
                    "bsonType": "object",
                    "description": "Optimized energy distribution plan",
                    "properties": {
                        "optimized_distribution":  {"bsonType": "object", "description": "Source to kW allocation map"},
                        "efficiency_gain_percent": {"bsonType": ["int", "double"], "description": "Efficiency improvement %"},
                        "cost_savings_percent":    {"bsonType": ["int", "double"], "description": "Cost savings %"},
                        "confidence":              {"bsonType": ["int", "double"], "description": "Confidence score %"},
                    },
                },
                "created_at": {"bsonType": "date", "description": "Optimization timestamp"},
            },
        }
    },

    "failure_predictions": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["user_id", "input", "output", "created_at"],
            "properties": {
                "user_id": {"bsonType": "string", "description": "Owner user ID"},
                "input": {
                    "bsonType": "object",
                    "description": "Equipment telemetry data",
                    "properties": {
                        "equipment": {
                            "bsonType": "array",
                            "description": "Equipment sensor readings",
                            "items": {
                                "bsonType": "object",
                                "properties": {
                                    "id":                    {"bsonType": "string"},
                                    "name":                  {"bsonType": "string"},
                                    "temperature":           {"bsonType": ["int", "double"]},
                                    "vibration":             {"bsonType": ["int", "double"]},
                                    "load_cycles":           {"bsonType": "int"},
                                    "age_years":             {"bsonType": ["int", "double"]},
                                    "last_maintenance_days": {"bsonType": "int"},
                                },
                            },
                        },
                    },
                },
                "output": {
                    "bsonType": "object",
                    "description": "Failure risk assessment",
                    "properties": {
                        "risk_assessment": {
                            "bsonType": "array",
                            "items": {
                                "bsonType": "object",
                                "properties": {
                                    "equipment_id":        {"bsonType": "string"},
                                    "failure_probability": {"bsonType": "double"},
                                    "risk_level":          {"enum": ["low", "medium", "high"]},
                                    "recommended_action":  {"bsonType": "string"},
                                },
                            },
                        },
                        "confidence": {"bsonType": ["int", "double"]},
                    },
                },
                "created_at": {"bsonType": "date", "description": "Prediction timestamp"},
            },
        }
    },

    "load_balancing": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["user_id", "input", "output", "created_at"],
            "properties": {
                "user_id": {"bsonType": "string", "description": "Owner user ID"},
                "input": {
                    "bsonType": "object",
                    "description": "Zone load and transfer constraints",
                    "properties": {
                        "zones": {
                            "bsonType": "array",
                            "items": {
                                "bsonType": "object",
                                "properties": {
                                    "id":              {"bsonType": "string"},
                                    "name":            {"bsonType": "string"},
                                    "current_load_kw": {"bsonType": ["int", "double"]},
                                    "capacity_kw":     {"bsonType": ["int", "double"]},
                                },
                            },
                        },
                        "transfer_limits": {
                            "bsonType": "array",
                            "items": {
                                "bsonType": "object",
                                "properties": {
                                    "from_zone": {"bsonType": "string"},
                                    "to_zone":   {"bsonType": "string"},
                                    "max_kw":    {"bsonType": ["int", "double"]},
                                },
                            },
                        },
                    },
                },
                "output": {
                    "bsonType": "object",
                    "description": "Recommended load transfers between zones",
                    "properties": {
                        "recommended_transfers": {
                            "bsonType": "array",
                            "items": {
                                "bsonType": "object",
                                "properties": {
                                    "from":      {"bsonType": "string"},
                                    "to":        {"bsonType": "string"},
                                    "amount_kw": {"bsonType": ["int", "double"]},
                                },
                            },
                        },
                        "balance_improvement_percent": {"bsonType": ["int", "double"]},
                        "confidence":                  {"bsonType": ["int", "double"]},
                    },
                },
                "created_at": {"bsonType": "date", "description": "Balancing timestamp"},
            },
        }
    },

    # ── NEW collections for DB-driven pages ──

    "grid_status": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["nodes", "connections", "grid_data"],
            "properties": {
                "nodes":       {"bsonType": "array", "description": "Grid network nodes"},
                "connections": {"bsonType": "array", "description": "Node-to-node connections"},
                "grid_data":   {"bsonType": "object", "description": "Aggregate grid metrics"},
                "created_at":  {"bsonType": "date"},
            },
        }
    },

    "reliability_data": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["areas", "load_shedding", "stats"],
            "properties": {
                "areas":         {"bsonType": "array", "description": "Power area statuses"},
                "load_shedding": {"bsonType": "array", "description": "Scheduled load shedding"},
                "stats":         {"bsonType": "object", "description": "Reliability statistics"},
                "outage_updates": {"bsonType": "array", "description": "Recent outage timeline"},
                "notification_settings": {"bsonType": "array", "description": "Notification prefs"},
                "created_at":    {"bsonType": "date"},
            },
        }
    },

    "usage_analytics": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["user_id"],
            "properties": {
                "user_id":        {"bsonType": "string"},
                "bill_breakdown": {"bsonType": "array"},
                "daily_usage":    {"bsonType": "array"},
                "weekly_usage":   {"bsonType": "array"},
                "monthly_usage":  {"bsonType": "array"},
                "comparison":     {"bsonType": "object"},
                "quick_insights": {"bsonType": "object"},
                "created_at":     {"bsonType": "date"},
            },
        }
    },

    "community_challenges": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["id", "name"],
            "properties": {
                "id":            {"bsonType": "string"},
                "name":          {"bsonType": "string"},
                "description":   {"bsonType": "string"},
                "status":        {"enum": ["active", "upcoming", "completed"]},
                "difficulty":    {"bsonType": "string"},
                "reward_points": {"bsonType": "int"},
                "participants":  {"bsonType": "int"},
                "end_time":      {"bsonType": "string"},
                "created_at":    {"bsonType": "date"},
            },
        }
    },

    "community_badges": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["id", "name"],
            "properties": {
                "id":          {"bsonType": "string"},
                "name":        {"bsonType": "string"},
                "description": {"bsonType": "string"},
                "icon":        {"bsonType": "string"},
                "rarity":      {"bsonType": "string"},
                "category":    {"bsonType": "string"},
                "created_at":  {"bsonType": "date"},
            },
        }
    },

    "community_leaderboard": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["rank", "neighborhood"],
            "properties": {
                "rank":          {"bsonType": "int"},
                "neighborhood":  {"bsonType": "string"},
                "participants":  {"bsonType": "int"},
                "score":         {"bsonType": "int"},
                "energy_saved":  {"bsonType": ["int", "double"]},
                "carbon_reduced": {"bsonType": ["int", "double"]},
                "created_at":    {"bsonType": "date"},
            },
        }
    },

    "tariff_slabs": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["slab", "rate_per_unit"],
            "properties": {
                "slab":          {"bsonType": "int"},
                "min_units":     {"bsonType": "int"},
                "max_units":     {"bsonType": ["int", "null"]},
                "rate_per_unit": {"bsonType": ["int", "double"]},
                "color":         {"bsonType": "string"},
                "label":         {"bsonType": "string"},
                "created_at":    {"bsonType": "date"},
            },
        }
    },
}


# ════════════════════════════════════════════════════════════════════
#  MOCK DATA BUILDERS
# ════════════════════════════════════════════════════════════════════

USERS = [
    {
        "name": "Admin Operator",
        "email": "admin@ecogridx.com",
        "password": pwd_context.hash("admin123"),
        "refresh_tokens": [],
        "created_at": ts(90),
        "updated_at": ts(0),
        "phone": "+91 98765 43210",
        "department": "Grid Operations",
    },
    {
        "name": "Demo Consumer",
        "email": "consumer@ecogridx.com",
        "password": pwd_context.hash("consumer123"),
        "refresh_tokens": [],
        "created_at": ts(60),
        "updated_at": ts(0),
        "phone": "+91 91234 56789",
        "department": "Residential",
    },
]


def build_alerts(user_id: str) -> list:
    return [
        {
            "id": "alert-001", "type": "critical", "title": "Power Line Overload",
            "source": "Transmission Line TL-47",
            "description": "Line operating at 105% capacity (2,625 MW / 2,500 MW limit). Immediate load redistribution required.",
            "actions": ["Redistribute Load", "View Details"], "status": "active",
            "user_id": user_id, "created_at": ts(0, 0),
        },
        {
            "id": "alert-002", "type": "critical", "title": "Voltage Drop Critical",
            "source": "Substation Alpha-7",
            "description": "Voltage dropped to 0.89 p.u. (below 0.95 threshold). Affecting 12,000 customers.",
            "actions": ["Voltage Regulation", "Isolate Section"], "status": "active",
            "user_id": user_id, "created_at": ts(0, 0),
        },
        {
            "id": "alert-003", "type": "critical", "title": "Equipment Overload",
            "source": "Transformer T-23",
            "description": "Transformer operating at 115% capacity (23 MVA / 20 MVA rated). Temperature rising to 95C.",
            "actions": ["Load Transfer", "Emergency Cooling"], "status": "active",
            "user_id": user_id, "created_at": ts(0, 1),
        },
        {
            "id": "alert-004", "type": "critical", "title": "Unusual Pattern Detected",
            "source": "Industrial Zone 4",
            "description": "Abnormal load fluctuation: 340 MW swings in 2-minute intervals.",
            "actions": ["Investigate", "Isolate Zone"], "status": "active",
            "user_id": user_id, "created_at": ts(0, 1),
        },
        {
            "id": "alert-005", "type": "warning", "title": "Solar Output Declining",
            "source": "Solar Farm Alpha",
            "description": "Cloud cover increasing. Solar output expected to drop 40% in next 30 minutes.",
            "actions": ["Activate Reserves", "Dismiss"], "status": "active",
            "user_id": user_id, "created_at": ts(0, 2),
        },
        {
            "id": "alert-006", "type": "warning", "title": "Storage Below Threshold",
            "source": "Battery Bank West",
            "description": "Battery storage at 22%. Below recommended 30% minimum reserve level.",
            "actions": ["Begin Charging", "Dismiss"], "status": "active",
            "user_id": user_id, "created_at": ts(0, 3),
        },
        {
            "id": "alert-007", "type": "info", "title": "Scheduled Maintenance",
            "source": "Substation Beta-3",
            "description": "Maintenance scheduled for tomorrow 02:00-06:00. Backup routing will be activated.",
            "actions": ["Acknowledge", "Reschedule"], "status": "active",
            "user_id": user_id, "created_at": ts(0, 5),
        },
        {
            "id": "alert-008", "type": "info", "title": "Model Retraining Complete",
            "source": "AI System",
            "description": "Demand prediction model retrained. Accuracy improved from 93.8% to 95.1%.",
            "actions": ["View Report", "Dismiss"], "status": "active",
            "user_id": user_id, "created_at": ts(0, 8),
        },
        {
            "id": "alert-009", "type": "critical", "title": "Frequency Deviation",
            "source": "Grid Sector 2",
            "description": "Frequency dropped to 49.3 Hz. Auto-corrected by load shedding.",
            "actions": ["View Report"], "status": "resolved", "action_taken": "resolve",
            "resolved_at": ts(1, 0), "user_id": user_id, "created_at": ts(1, 4),
        },
        {
            "id": "alert-010", "type": "warning", "title": "Wind Turbine Vibration",
            "source": "Wind Farm B - Turbine 14",
            "description": "Abnormal vibration levels detected. Maintenance team dispatched.",
            "actions": ["View Report"], "status": "resolved", "action_taken": "acknowledge",
            "resolved_at": ts(2, 0), "user_id": user_id, "created_at": ts(2, 6),
        },
    ]


def build_storage(user_id: str) -> list:
    return [
        {
            "id": "bat-001", "name": "Battery Bank Alpha", "capacity_kwh": 850,
            "current_level_percent": 78, "charge_rate_kw": 120, "discharge_rate_kw": 95,
            "current_mode": "Charging", "health": 94, "efficiency": 96.2,
            "location": "Substation West", "status": "active", "type": "Lithium-ion",
            "temperature": 32, "cycles": 1247, "last_maintenance": "2026-02-15",
            "user_id": user_id, "created_at": ts(30),
        },
        {
            "id": "bat-002", "name": "Battery Bank Beta", "capacity_kwh": 620,
            "current_level_percent": 45, "charge_rate_kw": 80, "discharge_rate_kw": 75,
            "current_mode": "Discharging", "health": 88, "efficiency": 94.8,
            "location": "Substation East", "status": "active", "type": "Lithium-ion",
            "temperature": 35, "cycles": 2103, "last_maintenance": "2026-01-28",
            "user_id": user_id, "created_at": ts(30),
        },
        {
            "id": "bat-003", "name": "Pumped Hydro Reserve", "capacity_kwh": 2400,
            "current_level_percent": 91, "charge_rate_kw": 200, "discharge_rate_kw": 180,
            "current_mode": "Standby", "health": 97, "efficiency": 92.1,
            "location": "Mountain Base", "status": "active", "type": "Pumped Hydro",
            "temperature": 18, "cycles": 456, "last_maintenance": "2026-03-01",
            "user_id": user_id, "created_at": ts(60),
        },
        {
            "id": "bat-004", "name": "Flow Battery East", "capacity_kwh": 1100,
            "current_level_percent": 62, "charge_rate_kw": 150, "discharge_rate_kw": 130,
            "current_mode": "Charging", "health": 92, "efficiency": 89.5,
            "location": "Industrial Park", "status": "active", "type": "Vanadium Flow",
            "temperature": 28, "cycles": 789, "last_maintenance": "2026-02-20",
            "user_id": user_id, "created_at": ts(45),
        },
        {
            "id": "bat-005", "name": "Emergency Reserve", "capacity_kwh": 350,
            "current_level_percent": 100, "charge_rate_kw": 50, "discharge_rate_kw": 200,
            "current_mode": "Standby", "health": 99, "efficiency": 97.8,
            "location": "Critical Systems", "status": "active", "type": "Lithium-ion",
            "temperature": 22, "cycles": 87, "last_maintenance": "2026-03-05",
            "user_id": user_id, "created_at": ts(15),
        },
    ]


def build_demand_predictions(user_id: str) -> list:
    entries = []
    for i in range(15):
        entries.append({
            "user_id": user_id,
            "input": {
                "historical_data": [round(random.uniform(1800, 3200), 1) for _ in range(24)],
                "location": random.choice(["Mumbai", "Delhi", "Bangalore", "Chennai"]),
                "season": random.choice(["summer", "winter", "monsoon", "spring"]),
                "time_of_day": random.choice(["morning", "afternoon", "evening", "night"]),
            },
            "output": {
                "predicted_demand_kw": round(random.uniform(2000, 3500), 1),
                "confidence": round(random.uniform(85, 98), 1),
                "peak_hour": random.randint(14, 21),
                "recommendations": [
                    "Pre-charge storage units before peak",
                    "Activate demand response programs",
                    "Schedule non-critical loads to off-peak hours",
                ],
            },
            "created_at": ts(i, random.randint(0, 12)),
        })
    return entries


def build_renewable_forecasts(user_id: str) -> list:
    entries = []
    for i in range(12):
        entries.append({
            "user_id": user_id,
            "input": {
                "temperature": round(random.uniform(20, 42), 1),
                "wind_speed": round(random.uniform(3, 25), 1),
                "cloud_cover": round(random.uniform(0, 80), 1),
                "humidity": round(random.uniform(30, 90), 1),
                "solar_capacity_kw": 500,
                "wind_capacity_kw": 300,
            },
            "output": {
                "solar_forecast_kw": round(random.uniform(200, 480), 1),
                "wind_forecast_kw": round(random.uniform(80, 290), 1),
                "total_renewable_kw": round(random.uniform(350, 700), 1),
                "confidence": round(random.uniform(82, 96), 1),
                "optimal_hours": ["10:00-14:00", "15:00-17:00"],
            },
            "created_at": ts(i, random.randint(0, 12)),
        })
    return entries


def build_grid_optimizations(user_id: str) -> list:
    entries = []
    for i in range(10):
        entries.append({
            "user_id": user_id,
            "input": {
                "current_load_kw": round(random.uniform(2000, 3200), 1),
                "available_sources": [
                    {"name": "Solar Farm A", "capacity_kw": 500, "current_output_kw": round(random.uniform(100, 480), 1), "cost_per_kwh": 0.02},
                    {"name": "Wind Farm B", "capacity_kw": 300, "current_output_kw": round(random.uniform(50, 280), 1), "cost_per_kwh": 0.03},
                    {"name": "Power Hub", "capacity_kw": 3000, "current_output_kw": round(random.uniform(1500, 2800), 1), "cost_per_kwh": 0.08},
                ],
                "storage_level_percent": round(random.uniform(20, 95), 1),
                "demand_forecast": [round(random.uniform(2000, 3500), 1) for _ in range(6)],
            },
            "output": {
                "optimized_distribution": {
                    "Solar Farm A": round(random.uniform(200, 450), 1),
                    "Wind Farm B": round(random.uniform(100, 260), 1),
                    "Power Hub": round(random.uniform(1500, 2500), 1),
                },
                "efficiency_gain_percent": round(random.uniform(2, 12), 1),
                "cost_savings_percent": round(random.uniform(5, 18), 1),
                "confidence": round(random.uniform(87, 97), 1),
            },
            "created_at": ts(i, random.randint(0, 12)),
        })
    return entries


def build_failure_predictions(user_id: str) -> list:
    entries = []
    equipment_names = [
        "Transformer T-23", "Circuit Breaker CB-45", "Transmission Line TL-47",
        "Generator G-12", "Capacitor Bank C-08", "Relay R-31",
    ]
    for i in range(8):
        entries.append({
            "user_id": user_id,
            "input": {
                "equipment": [
                    {
                        "id": f"eq-{j:03d}",
                        "name": equipment_names[j % len(equipment_names)],
                        "temperature": round(random.uniform(40, 95), 1),
                        "vibration": round(random.uniform(0.1, 5.0), 2),
                        "load_cycles": random.randint(500, 5000),
                        "age_years": round(random.uniform(1, 20), 1),
                        "last_maintenance_days": random.randint(5, 180),
                    }
                    for j in range(3)
                ],
            },
            "output": {
                "risk_assessment": [
                    {
                        "equipment_id": f"eq-{j:03d}",
                        "failure_probability": round(random.uniform(0.02, 0.35), 3),
                        "risk_level": random.choice(["low", "medium", "high"]),
                        "recommended_action": random.choice([
                            "Schedule maintenance within 2 weeks",
                            "Monitor closely for next 48 hours",
                            "Immediate inspection required",
                            "No action needed at this time",
                        ]),
                    }
                    for j in range(3)
                ],
                "confidence": round(random.uniform(85, 97), 1),
            },
            "created_at": ts(i, random.randint(0, 12)),
        })
    return entries


def build_load_balancing(user_id: str) -> list:
    entries = []
    for i in range(8):
        entries.append({
            "user_id": user_id,
            "input": {
                "zones": [
                    {"id": "zone-n", "name": "North Residential", "current_load_kw": round(random.uniform(600, 1200), 1), "capacity_kw": 1500},
                    {"id": "zone-s", "name": "South Residential", "current_load_kw": round(random.uniform(500, 1000), 1), "capacity_kw": 1200},
                    {"id": "zone-w", "name": "West Commercial", "current_load_kw": round(random.uniform(800, 1600), 1), "capacity_kw": 2000},
                    {"id": "zone-e", "name": "East Industrial", "current_load_kw": round(random.uniform(1000, 2000), 1), "capacity_kw": 2500},
                ],
                "transfer_limits": [
                    {"from_zone": "zone-n", "to_zone": "zone-s", "max_kw": 300},
                    {"from_zone": "zone-w", "to_zone": "zone-e", "max_kw": 500},
                    {"from_zone": "zone-n", "to_zone": "zone-w", "max_kw": 400},
                ],
            },
            "output": {
                "recommended_transfers": [
                    {
                        "from": random.choice(["zone-n", "zone-s"]),
                        "to": random.choice(["zone-w", "zone-e"]),
                        "amount_kw": round(random.uniform(50, 400), 1),
                    }
                ],
                "balance_improvement_percent": round(random.uniform(5, 20), 1),
                "confidence": round(random.uniform(88, 97), 1),
            },
            "created_at": ts(i, random.randint(0, 12)),
        })
    return entries


def build_consumer_data(user_id: str) -> dict:
    return {
        "user_id": user_id,
        "units_used": 155,
        "current_slab": 2,
        "bill_amount": 1250.75,
        "bill_history": [
            {"month": "Mar 2026", "amount": 1250.75, "units": 155},
            {"month": "Feb 2026", "amount": 1180.50, "units": 147},
            {"month": "Jan 2026", "amount": 1340.20, "units": 168},
            {"month": "Dec 2025", "amount": 1095.80, "units": 138},
            {"month": "Nov 2025", "amount": 1210.30, "units": 152},
            {"month": "Oct 2025", "amount": 1320.00, "units": 165},
        ],
        "comparison": {
            "neighbors": {"avg": 167, "your": 155, "difference": -12, "percentile": 68},
            "city": {"avg": 142, "your": 155, "difference": 13, "percentile": 34},
            "similar_homes": {"avg": 159, "your": 155, "difference": -4, "percentile": 55},
        },
        "created_at": ts(0),
    }


def build_community_stats(user_id: str) -> dict:
    return {
        "user_id": user_id,
        "power_cuts_prevented": 8,
        "energy_saved_kwh": 145.6,
        "carbon_reduced_kg": 87.3,
        "rank": 23,
        "challenges_completed": 15,
        "streak_days": 7,
        "created_at": ts(30),
    }


def build_challenge_participations(user_id: str) -> list:
    return [
        {"user_id": user_id, "challenge_id": "ch-001", "joined_at": ts(0, 3), "progress": 67, "status": "active"},
        {"user_id": user_id, "challenge_id": "ch-003", "joined_at": ts(1, 0), "progress": 100, "status": "completed"},
    ]


def build_grid_settings(user_id: str) -> dict:
    return {
        "user_id": user_id,
        "base_voltage_kv": 400, "frequency_hz": 50, "load_flow_method": "Newton-Raphson",
        "voltage_tolerance_min": 0.95, "voltage_tolerance_max": 1.05,
        "auto_optimization": True, "model_retraining": "Daily",
        "prediction_horizon": "24 hours", "confidence_threshold": 85,
        "dark_mode": True, "auto_refresh": True, "refresh_rate_seconds": 5,
        "data_retention_days": 30, "export_format": "CSV", "session_timeout_minutes": 30,
        "created_at": ts(30),
    }


def build_consumer_settings(user_id: str) -> dict:
    return {
        "user_id": user_id,
        "bill_alerts": True, "outage_notifications": True, "energy_saving_tips": False,
        "theme": "Dark Theme", "language": "English", "created_at": ts(30),
    }


# ── NEW data builders ──

def build_grid_status() -> dict:
    """Grid network nodes, connections, and aggregate metrics."""
    return {
        "nodes": [
            {"id": "power-hub", "label": "Power Hub", "type": "hub",
             "power_output_mw": 2847, "efficiency": 98.2, "status": "optimal", "x": 400, "y": 250},
            {"id": "residential-n", "label": "Residential North", "type": "consumer",
             "power_output_mw": 820, "efficiency": 94.1, "status": "optimal", "x": 200, "y": 100},
            {"id": "residential-s", "label": "Residential South", "type": "consumer",
             "power_output_mw": 950, "efficiency": 96.3, "status": "optimal", "x": 200, "y": 400},
            {"id": "commercial-w", "label": "Commercial West", "type": "consumer",
             "power_output_mw": 650, "efficiency": 93.8, "status": "warning", "x": 100, "y": 250},
            {"id": "industrial-e", "label": "Industrial East", "type": "consumer",
             "power_output_mw": 980, "efficiency": 91.8, "status": "optimal", "x": 700, "y": 250},
            {"id": "critical-sys", "label": "Critical Systems", "type": "critical",
             "power_output_mw": 200, "efficiency": 99.9, "status": "optimal", "x": 400, "y": 450},
            {"id": "solar-a", "label": "Solar Farm A", "type": "generator",
             "power_output_mw": 450, "efficiency": 96.2, "status": "optimal", "x": 600, "y": 100},
            {"id": "wind-b", "label": "Wind Farm B", "type": "generator",
             "power_output_mw": 680, "efficiency": 94.7, "status": "optimal", "x": 600, "y": 400},
            {"id": "storage-w", "label": "Storage West", "type": "storage",
             "power_output_mw": 125, "efficiency": 96.8, "status": "optimal", "x": 100, "y": 100},
            {"id": "storage-e", "label": "Storage East", "type": "storage",
             "power_output_mw": 110, "efficiency": 97.2, "status": "optimal", "x": 700, "y": 100},
        ],
        "connections": [
            {"from": "power-hub", "to": "residential-n", "flow_mw": 820, "status": "active"},
            {"from": "power-hub", "to": "residential-s", "flow_mw": 950, "status": "active"},
            {"from": "power-hub", "to": "commercial-w", "flow_mw": 650, "status": "warning"},
            {"from": "power-hub", "to": "industrial-e", "flow_mw": 980, "status": "active"},
            {"from": "power-hub", "to": "critical-sys", "flow_mw": 200, "status": "active"},
            {"from": "solar-a", "to": "power-hub", "flow_mw": 450, "status": "active"},
            {"from": "wind-b", "to": "power-hub", "flow_mw": 680, "status": "active"},
            {"from": "storage-w", "to": "power-hub", "flow_mw": 125, "status": "active"},
            {"from": "storage-e", "to": "power-hub", "flow_mw": 110, "status": "active"},
        ],
        "grid_data": {
            "total_production_mw": 2847,
            "current_demand_mw": 2650,
            "battery_storage_percent": 67,
            "grid_losses_mw": 197,
            "production_change": "+2.3% from yesterday",
            "peak_demand_mw": 3100,
            "storage_capacity_mwh": 1340,
            "loss_percent": 6.9,
            "current_load_mw": 2847,
            "efficiency_percent": 94.2,
            "grid_balance_percent": 99.1,
            "storage_level_percent": 67,
            "carbon_reduction_percent": 23.4,
            "renewable_contribution_percent": 39.7,
            "frequency_hz": 50.02,
            "voltage_deviation_percent": 0.8,
        },
        "created_at": now,
    }


def build_reliability_data() -> dict:
    """Power reliability areas, load shedding, stats, outage updates, notification settings."""
    return {
        "areas": [
            {"id": "sector-15", "name": "Sector 15", "status": "outage", "affected": 2400, "since": "10:30 AM",
             "estimated_restore": "2:00 PM", "cause": "Transformer failure"},
            {"id": "downtown", "name": "Downtown", "status": "outage", "affected": 1800, "since": "11:15 AM",
             "estimated_restore": "3:30 PM", "cause": "Cable fault"},
            {"id": "tech-district", "name": "Tech District", "status": "normal", "affected": 0, "since": None,
             "estimated_restore": None, "cause": None},
            {"id": "green-valley", "name": "Green Valley", "status": "normal", "affected": 0, "since": None,
             "estimated_restore": None, "cause": None},
            {"id": "industrial-zone", "name": "Industrial Zone", "status": "normal", "affected": 0, "since": None,
             "estimated_restore": None, "cause": None},
            {"id": "riverside", "name": "Riverside", "status": "normal", "affected": 0, "since": None,
             "estimated_restore": None, "cause": None},
            {"id": "old-town", "name": "Old Town", "status": "warning", "affected": 500, "since": "09:00 AM",
             "estimated_restore": "11:00 AM", "cause": "Voltage fluctuation"},
            {"id": "university", "name": "University Area", "status": "normal", "affected": 0, "since": None,
             "estimated_restore": None, "cause": None},
            {"id": "market-square", "name": "Market Square", "status": "normal", "affected": 0, "since": None,
             "estimated_restore": None, "cause": None},
            {"id": "lakeside", "name": "Lakeside", "status": "normal", "affected": 0, "since": None,
             "estimated_restore": None, "cause": None},
            {"id": "heights", "name": "The Heights", "status": "normal", "affected": 0, "since": None,
             "estimated_restore": None, "cause": None},
            {"id": "gardens", "name": "Gardens", "status": "normal", "affected": 0, "since": None,
             "estimated_restore": None, "cause": None},
            {"id": "harbor", "name": "Harbor District", "status": "normal", "affected": 0, "since": None,
             "estimated_restore": None, "cause": None},
            {"id": "west-end", "name": "West End", "status": "warning", "affected": 320, "since": "08:45 AM",
             "estimated_restore": "10:30 AM", "cause": "Overloaded feeder"},
            {"id": "north-hills", "name": "North Hills", "status": "normal", "affected": 0, "since": None,
             "estimated_restore": None, "cause": None},
        ],
        "load_shedding": [
            {"id": "ls-001", "area": "Sector 15", "date": "2026-03-10", "time": "14:00-16:00",
             "reason": "Grid maintenance", "impact": "Partial", "affected_consumers": 1200},
            {"id": "ls-002", "area": "Old Town", "date": "2026-03-11", "time": "09:00-11:00",
             "reason": "Equipment upgrade", "impact": "Full", "affected_consumers": 3400},
            {"id": "ls-003", "area": "Riverside", "date": "2026-03-11", "time": "22:00-02:00",
             "reason": "Cable replacement", "impact": "Partial", "affected_consumers": 890},
            {"id": "ls-004", "area": "Downtown", "date": "2026-03-12", "time": "01:00-05:00",
             "reason": "Transformer maintenance", "impact": "Full", "affected_consumers": 5200},
            {"id": "ls-005", "area": "Industrial Zone", "date": "2026-03-13", "time": "06:00-08:00",
             "reason": "Load balancing", "impact": "Partial", "affected_consumers": 450},
            {"id": "ls-006", "area": "West End", "date": "2026-03-14", "time": "10:00-12:00",
             "reason": "Feeder upgrade", "impact": "Full", "affected_consumers": 2100},
            {"id": "ls-007", "area": "Gardens", "date": "2026-03-15", "time": "03:00-06:00",
             "reason": "Preventive maintenance", "impact": "Partial", "affected_consumers": 670},
        ],
        "stats": {
            "today": {"uptime": 98.5, "outages": 2, "avg_duration": "45 min", "affected": 4700},
            "week": {"uptime": 97.8, "outages": 6, "avg_duration": "1.2 hrs", "affected": 12400},
            "month": {"uptime": 96.9, "outages": 15, "avg_duration": "1.8 hrs", "affected": 34500},
        },
        "outage_updates": [
            {"id": "ou-001", "area": "Sector 15", "time": "10:30 AM", "type": "outage_start",
             "message": "Power outage detected. Crews dispatched.", "severity": "high"},
            {"id": "ou-002", "area": "Downtown", "time": "11:15 AM", "type": "outage_start",
             "message": "Underground cable fault identified. Repair in progress.", "severity": "high"},
            {"id": "ou-003", "area": "Old Town", "time": "09:00 AM", "type": "warning",
             "message": "Voltage fluctuations detected. Monitoring closely.", "severity": "medium"},
            {"id": "ou-004", "area": "Sector 15", "time": "11:45 AM", "type": "update",
             "message": "Repair crew on site. Estimated restore by 2:00 PM.", "severity": "medium"},
            {"id": "ou-005", "area": "Tech District", "time": "08:00 AM", "type": "resolved",
             "message": "Earlier voltage issue resolved. All systems normal.", "severity": "low"},
        ],
        "notification_settings": [
            {"id": "ns-001", "type": "outage_alerts", "label": "Outage Alerts", "enabled": True,
             "description": "Get notified when outages occur in your area"},
            {"id": "ns-002", "type": "load_shedding", "label": "Load Shedding Schedule", "enabled": True,
             "description": "Advance notification of planned load shedding"},
            {"id": "ns-003", "type": "restoration", "label": "Restoration Updates", "enabled": True,
             "description": "Updates on power restoration progress"},
            {"id": "ns-004", "type": "maintenance", "label": "Maintenance Alerts", "enabled": False,
             "description": "Notifications for scheduled maintenance work"},
        ],
        "created_at": now,
    }


def build_usage_analytics(user_id: str) -> dict:
    """Usage & bill analytics for a consumer user."""
    return {
        "user_id": user_id,
        "bill_breakdown": [
            {"label": "Slab 1 (0-100)", "amount": 350.00, "percent": 28, "color": "#22c55e"},
            {"label": "Slab 2 (101-200)", "amount": 302.50, "percent": 24, "color": "#eab308"},
            {"label": "Fixed Charges", "amount": 150.00, "percent": 12, "color": "#6366f1"},
            {"label": "Electricity Duty", "amount": 65.25, "percent": 5, "color": "#8b5cf6"},
            {"label": "Fuel Surcharge", "amount": 98.50, "percent": 8, "color": "#f97316"},
            {"label": "Sales Tax 18%", "amount": 284.50, "percent": 23, "color": "#ef4444"},
        ],
        "daily_usage": [
            {"hour": h,
             "kwh": round(1.2 + (2.8 if 9 <= h <= 11 or 18 <= h <= 21 else 0.5) + (h % 3) * 0.3, 2),
             "cost": round((1.2 + (2.8 if 9 <= h <= 11 or 18 <= h <= 21 else 0.5) + (h % 3) * 0.3) * 5.50, 2)}
            for h in range(24)
        ],
        "weekly_usage": [
            {"day": d, "kwh": kwh, "cost": round(kwh * 5.50, 2)}
            for d, kwh in [("Mon", 22.5), ("Tue", 24.1), ("Wed", 19.8), ("Thu", 23.4),
                           ("Fri", 26.2), ("Sat", 18.5), ("Sun", 16.9)]
        ],
        "monthly_usage": [
            {"month": m, "kwh": kwh, "cost": round(kwh * 5.50, 2)}
            for m, kwh in [("Jan", 142), ("Feb", 138), ("Mar", 155), ("Apr", 161), ("May", 175),
                           ("Jun", 189), ("Jul", 195), ("Aug", 188), ("Sep", 172), ("Oct", 158),
                           ("Nov", 147), ("Dec", 151)]
        ],
        "comparison": {
            "neighbors": {"avg": 167, "your": 155, "difference": -12, "percentile": 68},
            "city": {"avg": 142, "your": 155, "difference": 13, "percentile": 34},
            "similar_homes": {"avg": 159, "your": 155, "difference": -4, "percentile": 55},
        },
        "quick_insights": {
            "cost_per_unit": 8.05,
            "kwh_per_day": 5.2,
            "units_this_month": 155,
            "current_tariff": "Slab 2",
            "total_bill": 1250.75,
            "projected_bill": 1380.00,
            "savings_tip": "Shift heavy appliance use to off-peak hours (11PM-6AM) to save up to 15%",
        },
        "created_at": now,
    }


def build_community_challenges() -> list:
    """Global community challenges."""
    return [
        {
            "id": "ch-001", "name": "Peak Hour Power Saver",
            "description": "Reduce usage by 20% during 6-9 PM for 7 consecutive days",
            "status": "active", "difficulty": "urgent", "reward_points": 500,
            "participants": 1247, "end_time": "2026-03-10T21:00:00Z",
            "created_at": now,
        },
        {
            "id": "ch-002", "name": "Weekend Energy Saver",
            "description": "Keep weekend usage below 15 kWh/day for 4 weekends",
            "status": "upcoming", "difficulty": "easy", "reward_points": 200,
            "participants": 856, "end_time": "2026-03-16T23:59:00Z",
            "created_at": now,
        },
        {
            "id": "ch-003", "name": "Solar Hour Champion",
            "description": "Shift 50% of usage to solar peak hours (10AM-2PM) for 2 weeks",
            "status": "active", "difficulty": "hard", "reward_points": 750,
            "participants": 432, "end_time": "2026-03-14T14:00:00Z",
            "created_at": now,
        },
        {
            "id": "ch-004", "name": "Appliance Efficiency Challenge",
            "description": "Replace or optimize 3 appliances for better energy ratings",
            "status": "active", "difficulty": "medium", "reward_points": 350,
            "participants": 678, "end_time": "2026-03-20T23:59:00Z",
            "created_at": now,
        },
        {
            "id": "ch-005", "name": "Community Grid Support",
            "description": "Participate in demand response events 5 times this month",
            "status": "upcoming", "difficulty": "hard", "reward_points": 600,
            "participants": 312, "end_time": "2026-03-31T23:59:00Z",
            "created_at": now,
        },
    ]


def build_community_badges() -> list:
    """Global badge definitions."""
    return [
        {"id": "b-001", "name": "Peak Saver", "description": "Reduced peak usage by 20% for 30 days",
         "icon": "zap", "rarity": "common", "category": "savings", "created_at": now},
        {"id": "b-002", "name": "Grid Guardian", "description": "Participated in 10 demand response events",
         "icon": "shield", "rarity": "rare", "category": "community", "created_at": now},
        {"id": "b-003", "name": "Community Champion", "description": "Helped 5 neighbors optimize energy use",
         "icon": "users", "rarity": "rare", "category": "community", "created_at": now},
        {"id": "b-004", "name": "Energy Saver Master", "description": "Saved 500+ kWh in a single month",
         "icon": "battery", "rarity": "epic", "category": "savings", "created_at": now},
        {"id": "b-005", "name": "Grid Stability Hero", "description": "Maintained perfect grid support for 60 days",
         "icon": "award", "rarity": "legendary", "category": "reliability", "created_at": now},
        {"id": "b-006", "name": "Solar Pioneer", "description": "Shifted 80% usage to solar hours for a month",
         "icon": "sun", "rarity": "epic", "category": "renewable", "created_at": now},
        {"id": "b-007", "name": "Streak Master", "description": "Maintained energy savings streak for 90 days",
         "icon": "flame", "rarity": "legendary", "category": "consistency", "created_at": now},
        {"id": "b-008", "name": "Green Warrior", "description": "Reduced carbon footprint by 100kg in a month",
         "icon": "leaf", "rarity": "rare", "category": "environment", "created_at": now},
    ]


def build_community_leaderboard() -> list:
    """Neighborhood leaderboard entries."""
    return [
        {"rank": 1, "neighborhood": "Green Valley", "participants": 342, "score": 9850,
         "energy_saved": 4520.5, "carbon_reduced": 2712.3, "created_at": now},
        {"rank": 2, "neighborhood": "Tech District", "participants": 289, "score": 9420,
         "energy_saved": 4180.2, "carbon_reduced": 2508.1, "created_at": now},
        {"rank": 3, "neighborhood": "Riverside", "participants": 256, "score": 8790,
         "energy_saved": 3890.7, "carbon_reduced": 2334.4, "created_at": now},
        {"rank": 4, "neighborhood": "Lakeside", "participants": 198, "score": 8150,
         "energy_saved": 3410.1, "carbon_reduced": 2046.1, "created_at": now},
        {"rank": 5, "neighborhood": "The Heights", "participants": 176, "score": 7680,
         "energy_saved": 3120.8, "carbon_reduced": 1872.5, "created_at": now},
        {"rank": 6, "neighborhood": "Gardens", "participants": 154, "score": 7230,
         "energy_saved": 2850.3, "carbon_reduced": 1710.2, "created_at": now},
        {"rank": 7, "neighborhood": "Old Town", "participants": 143, "score": 6890,
         "energy_saved": 2670.9, "carbon_reduced": 1602.5, "created_at": now},
        {"rank": 8, "neighborhood": "University Area", "participants": 210, "score": 6540,
         "energy_saved": 2490.4, "carbon_reduced": 1494.2, "created_at": now},
        {"rank": 9, "neighborhood": "Market Square", "participants": 132, "score": 6120,
         "energy_saved": 2280.6, "carbon_reduced": 1368.4, "created_at": now},
        {"rank": 10, "neighborhood": "Harbor District", "participants": 118, "score": 5780,
         "energy_saved": 2050.1, "carbon_reduced": 1230.1, "created_at": now},
    ]


def build_tariff_slabs() -> list:
    """Electricity tariff slab definitions."""
    return [
        {"slab": 1, "min_units": 0, "max_units": 100, "rate_per_unit": 3.50,
         "color": "green", "label": "Slab 1 (0-100 units)", "created_at": now},
        {"slab": 2, "min_units": 101, "max_units": 200, "rate_per_unit": 5.50,
         "color": "yellow", "label": "Slab 2 (101-200 units)", "created_at": now},
        {"slab": 3, "min_units": 201, "max_units": 300, "rate_per_unit": 7.50,
         "color": "orange", "label": "Slab 3 (201-300 units)", "created_at": now},
        {"slab": 4, "min_units": 301, "max_units": None, "rate_per_unit": 9.50,
         "color": "red", "label": "Slab 4 (301+ units)", "created_at": now},
    ]


# ════════════════════════════════════════════════════════════════════
#  MAIN — Apply schemas then seed data
# ════════════════════════════════════════════════════════════════════
async def seed():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]

    # ── Step 1: Drop existing for clean slate ──
    existing = await db.list_collection_names()
    for col in existing:
        await db.drop_collection(col)
    print(f"Dropped {len(existing)} existing collections.\n")

    # ── Step 2: Create collections WITH JSON Schema validation ──
    print("-- Creating collections with schema validation --")
    for col_name, validator in SCHEMAS.items():
        await db.create_collection(col_name, validator=validator)
        print(f"  + {col_name}")
    print()

    # ── Step 3: Create indexes ──
    await db["users"].create_index("email", unique=True)
    for col_name in ["demand_predictions", "renewable_forecasts", "grid_optimizations", "failure_predictions", "load_balancing"]:
        await db[col_name].create_index([("created_at", -1), ("user_id", 1)])
    await db["alerts"].create_index([("user_id", 1), ("status", 1)])
    await db["storage_units"].create_index("user_id")
    print("-- Indexes created --\n")

    # ── Step 4: Insert users ──
    result = await db["users"].insert_many(USERS)
    user_ids = [str(uid) for uid in result.inserted_ids]
    operator_id, consumer_id = user_ids[0], user_ids[1]
    print("-- Users --")
    print(f"  Grid Operator:  admin@ecogridx.com    / admin123    (id: {operator_id})")
    print(f"  Consumer:       consumer@ecogridx.com / consumer123 (id: {consumer_id})\n")

    # ── Step 5: Seed global reference data ──
    print("-- Seeding global reference data --")
    await db["grid_status"].insert_one(build_grid_status())
    await db["reliability_data"].insert_one(build_reliability_data())
    await db["tariff_slabs"].insert_many(build_tariff_slabs())
    await db["community_challenges"].insert_many(build_community_challenges())
    await db["community_badges"].insert_many(build_community_badges())
    await db["community_leaderboard"].insert_many(build_community_leaderboard())
    print("  Grid status: 1  |  Reliability: 1  |  Tariff slabs: 4")
    print("  Challenges: 5  |  Badges: 8  |  Leaderboard: 10\n")

    # ── Step 6: Seed operator data ──
    print("-- Seeding operator data --")
    await db["alerts"].insert_many(build_alerts(operator_id))
    await db["storage_units"].insert_many(build_storage(operator_id))
    await db["grid_settings"].insert_one(build_grid_settings(operator_id))
    await db["demand_predictions"].insert_many(build_demand_predictions(operator_id))
    await db["renewable_forecasts"].insert_many(build_renewable_forecasts(operator_id))
    await db["grid_optimizations"].insert_many(build_grid_optimizations(operator_id))
    await db["failure_predictions"].insert_many(build_failure_predictions(operator_id))
    await db["load_balancing"].insert_many(build_load_balancing(operator_id))
    await db["usage_analytics"].insert_one(build_usage_analytics(operator_id))
    print("  Alerts: 10  |  Storage: 5  |  Settings: 1  |  Usage analytics: 1")
    print("  AI Predictions: 15 demand, 12 renewable, 10 optimization, 8 failure, 8 load-balance\n")

    # ── Step 7: Seed consumer data ──
    print("-- Seeding consumer data --")
    await db["consumer_data"].insert_one(build_consumer_data(consumer_id))
    await db["community_stats"].insert_one(build_community_stats(consumer_id))
    await db["challenge_participations"].insert_many(build_challenge_participations(consumer_id))
    await db["consumer_settings"].insert_one(build_consumer_settings(consumer_id))
    await db["alerts"].insert_many(build_alerts(consumer_id))
    await db["storage_units"].insert_many(build_storage(consumer_id))
    await db["grid_settings"].insert_one(build_grid_settings(consumer_id))
    await db["usage_analytics"].insert_one(build_usage_analytics(consumer_id))
    await db["consumer_data"].insert_one(build_consumer_data(operator_id))
    await db["community_stats"].insert_one(build_community_stats(operator_id))
    await db["consumer_settings"].insert_one(build_consumer_settings(operator_id))
    print("  Consumer billing, community, challenges, settings, usage analytics -- done\n")

    # ── Summary ──
    print("=" * 50)
    print("  SEED COMPLETE -- Collection Summary")
    print("=" * 50)
    total = 0
    for col in sorted(await db.list_collection_names()):
        count = await db[col].count_documents({})
        total += count
        print(f"  {col:<30} {count:>4} docs")
    print(f"  {'-' * 35}")
    print(f"  {'TOTAL':<30} {total:>4} docs")
    print("=" * 50)

    print("\n-- Demo Credentials --")
    print("  Grid Operator:  admin@ecogridx.com    / admin123")
    print("  Consumer:       consumer@ecogridx.com / consumer123")

    client.close()


if __name__ == "__main__":
    asyncio.run(seed())
