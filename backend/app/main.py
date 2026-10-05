from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes.contact import router as contact_router
from app.routes.admin import router as admin_router

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI
app = FastAPI(
    title="Suhail Portfolio API",
    description="Backend API for portfolio contact messages and admin dashboard",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "https://suhail263.github.io",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(contact_router)
app.include_router(admin_router)


# Home endpoint
@app.get("/")
def home():
    return {
        "success": True,
        "message": "Suhail Portfolio API is running!",
    }