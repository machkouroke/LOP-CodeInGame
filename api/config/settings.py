from functools import lru_cache

from pydantic import BaseSettings


class Settings(BaseSettings):
    MONGO_USERNAME: str
    MONGO_PASSWORD: str
    MONGO_URL: str
    DB_NAME: str
    GCLOUD_BUCKET: str
    GCLOUD_SERVICE_KEY_JSON: str
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 60 minutes * 24 hours * 7 days = 1 week
    ALGORITHM: str = "HS256"
    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
