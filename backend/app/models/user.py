from datetime import datetime, timezone
from typing import Optional, List


def user_document(name: str, email: str, hashed_password: str) -> dict:
    return {
        "name": name,
        "email": email,
        "password": hashed_password,
        "refresh_tokens": [],
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
    }


def user_response(user: dict) -> dict:
    return {
        "id": str(user.get("_id", user.get("id", ""))),
        "name": user.get("name", ""),
        "email": user.get("email", ""),
        "created_at": user.get("created_at", ""),
    }
