from passlib.context import CryptContext

# Настройка хеширования паролей
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Проверяет соответствие пароля и его хеша"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Генерирует хеш пароля"""
    return pwd_context.hash(password)