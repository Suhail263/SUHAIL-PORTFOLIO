import os

from fastapi import (
    APIRouter,
    Depends,
    Header,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ContactMessage
from app.schemas import ContactCreate


router = APIRouter(tags=["Contact"])


# ==========================================
# ADMIN AUTHENTICATION
# ==========================================

def verify_admin_key(
    x_admin_key: str = Header(...),
):
    expected_key = os.getenv("ADMIN_API_KEY")

    if not expected_key or x_admin_key != expected_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin key.",
        )

    return True


# ==========================================
# CREATE CONTACT MESSAGE
# POST /api/contact/
# ==========================================

@router.post("/api/contact/")
def create_contact(
    contact: ContactCreate,
    db: Session = Depends(get_db),
):
    try:
        new_message = ContactMessage(
            name=contact.name,
            email=contact.email,
            subject=contact.subject,
            message=contact.message,
        )

        db.add(new_message)
        db.commit()
        db.refresh(new_message)

        return {
            "success": True,
            "message": "Your message has been submitted successfully!",
            "id": new_message.id,
        }

    except Exception:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to save your message. Please try again.",
        )


# ==========================================
# GET ALL CONTACT MESSAGES
# GET /api/admin/messages
# ==========================================

@router.get("/api/admin/messages")
def get_messages(
    authorized: bool = Depends(verify_admin_key),
    db: Session = Depends(get_db),
):
    messages = (
        db.query(ContactMessage)
        .order_by(ContactMessage.created_at.desc())
        .all()
    )

    return [
        {
            "id": msg.id,
            "name": msg.name,
            "email": msg.email,
            "subject": msg.subject,
            "message": msg.message,
            "created_at": msg.created_at,
        }
        for msg in messages
    ]


# ==========================================
# DELETE A CONTACT MESSAGE
# DELETE /api/admin/messages/{message_id}
# ==========================================

@router.delete("/api/admin/messages/{message_id}")
def delete_message(
    message_id: int,
    authorized: bool = Depends(verify_admin_key),
    db: Session = Depends(get_db),
):
    message = (
        db.query(ContactMessage)
        .filter(ContactMessage.id == message_id)
        .first()
    )

    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found.",
        )

    db.delete(message)
    db.commit()

    return {
        "success": True,
        "message": f"Message {message_id} deleted successfully.",
    }