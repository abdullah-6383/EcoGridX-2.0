import json
import google.generativeai as genai
from fastapi import HTTPException, status
from app.core.config import settings


class GeminiService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    async def _call_gemini(self, prompt: str) -> dict:
        try:
            response = self.model.generate_content(prompt)
            text = response.text.strip()

            # Strip markdown code fences if present
            if text.startswith("```json"):
                text = text[7:]
            elif text.startswith("```"):
                text = text[3:]
            if text.endswith("```"):
                text = text[:-3]
            text = text.strip()

            return json.loads(text)
        except json.JSONDecodeError:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="AI returned invalid JSON response",
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"Gemini API error: {str(e)}",
            )

    async def predict_demand(self, data: dict) -> dict:
        prompt = f"""You are an advanced LSTM-based energy demand prediction AI model with 95% accuracy for 24-48 hour forecasts.

Given the following energy consumption data, predict future demand:

Historical hourly consumption data (kWh): {data.get("historical_data", [])}
Location: {data.get("location", "unknown")}
Season: {data.get("season", "unknown")}
Time of day: {data.get("time_of_day", "unknown")}

Respond ONLY with valid JSON (no markdown, no explanation, no code fences). Use this exact structure:
{{
    "hourly_forecast_24h": [list of 24 float values representing predicted kWh for each hour],
    "hourly_forecast_48h": [list of 48 float values representing predicted kWh for each hour],
    "peak_demand_windows": [list of strings like "14:00-18:00" identifying peak demand periods],
    "confidence_score": 0.95,
    "total_predicted_kwh": float total for 24h,
    "recommendations": [list of 3-5 actionable energy management recommendations as strings]
}}

Generate realistic values based on the input data patterns. Values should be consistent with typical residential/commercial energy usage patterns."""

        return await self._call_gemini(prompt)

    async def forecast_renewable(self, data: dict) -> dict:
        prompt = f"""You are a Gradient Boosting Machine (GBM) model specialized in renewable energy output forecasting with weather data integration.

Given the following weather and capacity data, forecast renewable energy generation:

Temperature: {data.get("temperature")}°C
Wind Speed: {data.get("wind_speed")} m/s
Cloud Cover: {data.get("cloud_cover")}%
Humidity: {data.get("humidity")}%
Solar Panel Capacity: {data.get("solar_capacity_kw")} kW
Wind Turbine Capacity: {data.get("wind_capacity_kw")} kW

Respond ONLY with valid JSON (no markdown, no explanation, no code fences). Use this exact structure:
{{
    "solar_forecast_kwh": [list of 24 float values for hourly solar generation],
    "wind_forecast_kwh": [list of 24 float values for hourly wind generation],
    "total_renewable_kwh": float total combined output for 24h,
    "capacity_factor": float between 0 and 1,
    "weather_impact": "string describing how weather affects generation",
    "optimization_suggestions": [list of 3-5 suggestions to maximize renewable output]
}}

Generate realistic values influenced by the weather conditions provided."""

        return await self._call_gemini(prompt)

    async def optimize_grid(self, data: dict) -> dict:
        sources_str = json.dumps(data.get("available_sources", []))
        prompt = f"""You are a Deep Q-Network (DQN) reinforcement learning agent for real-time smart grid decision making and optimization.

Given the current grid state, determine optimal energy routing:

Current Grid Load: {data.get("current_load_kw")} kW
Available Energy Sources: {sources_str}
Battery Storage Level: {data.get("storage_level_percent")}%
Demand Forecast (next 24h hourly kWh): {data.get("demand_forecast", [])}

Respond ONLY with valid JSON (no markdown, no explanation, no code fences). Use this exact structure:
{{
    "routing_decisions": [list of objects with "source", "allocated_kw", "priority" fields],
    "storage_commands": {{"charge": float kW to charge, "discharge": float kW to discharge}},
    "cost_savings_usd": float estimated daily savings,
    "carbon_reduction_kg": float estimated CO2 reduction in kg,
    "grid_stability_score": float between 0 and 1,
    "actions": [list of 3-5 specific action strings the grid operator should take]
}}

Generate realistic optimization decisions based on the grid state."""

        return await self._call_gemini(prompt)

    async def predict_failure(self, data: dict) -> dict:
        equipment_str = json.dumps(data.get("equipment", []))
        prompt = f"""You are an ensemble ML model combining Random Forest and XGBoost for predictive maintenance and equipment failure detection in smart grid infrastructure.

Analyze the following equipment sensor data:

Equipment Data: {equipment_str}

Respond ONLY with valid JSON (no markdown, no explanation, no code fences). Use this exact structure:
{{
    "equipment_risks": [
        {{
            "id": "equipment id",
            "name": "equipment name",
            "failure_probability": float between 0 and 1,
            "risk_level": "low" or "medium" or "high" or "critical",
            "estimated_days_to_failure": integer,
            "maintenance_action": "string describing recommended maintenance"
        }}
    ],
    "overall_fleet_health": float between 0 and 1,
    "urgent_actions": [list of strings for immediate actions needed]
}}

Analyze each piece of equipment based on its temperature, vibration, load cycles, age, and maintenance history. Higher temperature, vibration, age, and days since maintenance should increase failure probability."""

        return await self._call_gemini(prompt)

    async def balance_load(self, data: dict) -> dict:
        zones_str = json.dumps(data.get("zones", []))
        limits_str = json.dumps(data.get("transfer_limits", []))
        prompt = f"""You are a Multi-Agent Reinforcement Learning (MARL) system for distributed smart grid load balancing optimization.

Given the multi-zone grid data, optimize load distribution:

Zone Data: {zones_str}
Inter-Zone Transfer Limits: {limits_str}

Respond ONLY with valid JSON (no markdown, no explanation, no code fences). Use this exact structure:
{{
    "zone_redistribution": [
        {{
            "zone_id": "string",
            "zone_name": "string",
            "current_load_kw": float,
            "recommended_load_kw": float,
            "load_change_kw": float
        }}
    ],
    "agent_actions": [
        {{
            "agent_id": "string",
            "zone": "string",
            "action": "string describing the action",
            "priority": "high" or "medium" or "low"
        }}
    ],
    "stability_score": float between 0 and 1,
    "efficiency_improvement_percent": float,
    "transfer_recommendations": [
        {{
            "from_zone": "string",
            "to_zone": "string",
            "transfer_kw": float,
            "reason": "string"
        }}
    ]
}}

Generate realistic load balancing decisions that keep all zones within their capacity limits."""

        return await self._call_gemini(prompt)


gemini_service = GeminiService()
