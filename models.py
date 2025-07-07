from pydantic import BaseModel

class UserBase(BaseModel):
    login: str
    email: str
    exp: int
    level: int
    stat_might: int
    stat_might_per_day: int
    stat_depxsity: int
    stat_depxsity_per_day: int
    stat_versatality: int
    stat_veratality_per_day: int
    stat_intellect: int
    stat_intellect_per_day: int
    stat_wisdom: int
    stat_wisdom_per_day: int
    stat_craft: int
    stat_craft_per_day: int
    task_per_day: int
    exp_per_day: int
    time_per_day: int
    time_all: int

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    user_id: int
    hash_password: str

    class Config:
        ord_mode = True

class UserLogin(BaseModel):
    login: str
    password: str
class Achivement(BaseModel):
    ach_id: int
    ach_status: str
    ach_progress: int

class Task(BaseModel):
    task_id: int
    task_status: str
    task_complition_time: int