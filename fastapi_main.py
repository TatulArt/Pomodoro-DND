from fastapi import FastAPI
from .routers import users

app = FastAPI(
    title="User Authentication API",
    description="API for user registration and login",
    version="1.0.0",
)

# Подключаем роутер
app.include_router(users.router)

@app.get("/")
async def root():
    return {"message": "User Authentication API"}