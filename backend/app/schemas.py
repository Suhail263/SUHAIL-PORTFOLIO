from pydantic import BaseModel, EmailStr, Field


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=200)
    message: str = Field(..., min_length=10, max_length=5000)


class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str

    class Config:
        from_attributes = True