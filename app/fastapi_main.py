from fastapi import FastAPI
from .routers import users
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="User Authentication API",
    description="API for user registration and login",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000", "https://-.com"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

# Подключаем роутер
app.include_router(users.router)

@app.get("/")
async def root():
    return {"message": "User Authentication API"}