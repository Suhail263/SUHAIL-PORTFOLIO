import os
import secrets

from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ContactMessage

router = APIRouter(
    prefix="/api/admin",
    tags=["Admin"],
)


def verify_admin(x_admin_key: str = Header(...)):
    admin_key = os.getenv("ADMIN_API_KEY")

    if not admin_key:
        raise HTTPException(
            status_code=500,
            detail="Admin API key is not configured.",
        )

    if not secrets.compare_digest(x_admin_key, admin_key):
        raise HTTPException(
            status_code=401,
            detail="Invalid admin key.",
        )


@router.get("/messages")
def get_messages(
    db: Session = Depends(get_db),
    _: None = Depends(verify_admin),
):
    messages = (
        db.query(ContactMessage)
        .order_by(ContactMessage.created_at.desc())
        .all()
    )

    return {
        "success": True,
        "total": len(messages),
        "messages": [
            {
                "id": item.id,
                "name": item.name,
                "email": item.email,
                "subject": item.subject,
                "message": item.message,
                "created_at": (
                    item.created_at.isoformat()
                    if item.created_at
                    else None
                ),
            }
            for item in messages
        ],
    }


@router.delete("/messages/{message_id}")
def delete_message(
    message_id: int,
    db: Session = Depends(get_db),
    _: None = Depends(verify_admin),
):
    message = (
        db.query(ContactMessage)
        .filter(ContactMessage.id == message_id)
        .first()
    )

    if not message:
        raise HTTPException(
            status_code=404,
            detail="Message not found.",
        )

    db.delete(message)
    db.commit()

    return {
        "success": True,
        "message": "Contact message deleted successfully.",
    }