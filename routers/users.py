from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ..models import *
from ..database import connection_to_db
from ..hash import get_password_hash, verify_password
import mysql.connector

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.post("/register", response_model=UserInDB)
async def register_user(User: UserCreate):
    # Регистрация нового пользователя
    connect = connection_to_db()
    if connect is None:
        raise HTTPException(status_code=500, detail='Databasse connection failed')

    cursor = connect.cursor(dictionary=True)
    try:
        cursor.execute(
            "SELECT id FROM users WHERE login = %s OR email = %s",
            (User.login, User.email)
        )
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Username or email already registered")

        hashed_password = get_password_hash(User.password)

        cursor.execute(
            "INSERT INTO users (login, email, password, exp, level, stat_might,"
            " stat_might_per_day, stat_depxsity, stat_depxsity_per_day, stat_versatality,"
            " stat_veratality_per_day, stat_intellect, stat_intellect_per_day, stat_wisdom,"
            " stat_wisdom_per_day, stat_craft, stat_craft_per_day, task_per_day,"
            " exp_per_day, time_per_day, time_all) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,)",
            (User.login, User.email, User.password, User.exp, User.level, User.stat_might,
             User.stat_might_per_day, User.stat_depxsity, User.stat_depxsity_per_day, User.stat_versatality,
             User.stat_versatality_per_day, User.stat_intellect, User.stat_intellect_per_day, User.stat_wisdom,
             User.stat_wisdom_per_day, User.stat_craft, User.stat_craft_per_day, User.task_per_day,
             User.exp_per_day, User. time_per_day, User.time_all)
        )
        connect.commit()
        User_id = cursor.lastrowid

        # возвращаем пользователя
        return {
            "id" : User_id,
            "login": User.login,
            "email": User.email,
            "exp": User.exp,
            "level": User.level,
            "stat_might": User.stat_might,
            "stat_might_per_day": User.stat_might_per_day,
            "stat_depxsity": User.stat_depxsity,
            "stat_depxsity_per_day": User.stat_depxsity_per_day,
            "stat_versatality": User.versatality,
            "stat_versatality_per_day": User.versatality_per_day,
            "stat_intellect": User.stat_intellect,
            "stat_intellect_per_day": User.stat_intellect_per_day,
            "stat_wisdom": User.stat_wisdom,
            "stat_wisdom_per_day": User.stat_wisdom_per_day,
            "stat_craft": User.stat_craft,
            "stat_craft_per_day": User.stat_craft_per_day,
            "task_per_day": User.task_per_day,
            "exp_per_day": User.exp_per_day,
            "time_per_day": User.time_per_day,
            "time_all": User.time_all
        }
    except mysql.connector.Error as e:
        connect.rollback()
        raise  HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        connect.close()

@router.post("/login")
async def login_user(user: UserLogin):
    #Аутентификация пользователя
    connect = connection_to_db()
    if connect is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    cursor = connect.cursor(dictionary=True)
    try:
        cursor.execute(
            "SELECT id, login, email, password, exp, level, stat_might,"
            " stat_might_per_day, stat_depxsity, stat_depxsity_per_day, stat_versatality,"
            " stat_veratality_per_day, stat_intellect, stat_intellect_per_day, stat_wisdom,"
            " stat_wisdom_per_day, stat_craft, stat_craft_per_day, task_per_day,"
            " exp_per_day, time_per_day, time_all FROM users WHERE login = %s",
            (user.login)
        )
        db_user = cursor.fetchone()

        if not db_user:
            raise HTTPException(status_code=401, detail="Incorrect username or password")

        # Проверяем пароль
        if not verify_password(user.password, db_user["hashed_password"]):
            raise HTTPException(status_code=401, detail="Incorrect username or password")

        return {
            "id": db_user["user_id"],
            "login": db_user["lodgin"],
            "email": db_user["email"],
            "exp": db_user["exp"],
            "level": db_user["level"],
            "stat_might": db_user["stat_might"],
            "stat_might_per_day": db_user["stat_might_per_day"],
            "stat_depxsity": db_user["stat_depxsity"],
            "stat_depxsity_per_day": db_user["stat_depxsity_per_day"],
            "stat_versatality": db_user["stat_versatality"],
            "stat_versatality_per_day": db_user["stat_versatality_per_day"],
            "stat_intellect": db_user["stat_intellect"],
            "stat_intellect_per_day": db_user["stat_intellect_per_day"],
            "stat_wisdom": db_user["stat_wisdom"],
            "stat_wisdom_per_day": db_user["stat_wisdom_per_day"],
            "stat_craft": db_user["stat_craft"],
            "stat_craft_per_day": db_user["stat_craft_per_day"],
            "task_per_day": db_user["task_per_day"],
            "exp_per_day": db_user["exp_per_day"],
            "time_per_day": db_user["time_per_day"],
            "time_all": db_user["time_all"]
        }
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        connect.close()
