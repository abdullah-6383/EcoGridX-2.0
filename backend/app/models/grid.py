from datetime import datetime, timezone


def prediction_document(user_id: str, input_data: dict, output_data: dict) -> dict:
    return {
        "user_id": user_id,
        "input": input_data,
        "output": output_data,
        "created_at": datetime.now(timezone.utc),
    }
