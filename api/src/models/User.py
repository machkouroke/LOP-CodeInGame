from typing import Optional, Any

from pydantic import BaseModel, Field, SecretStr

from api.src.models.Model import Model
from objectid import PydanticObjectId


class User(Model):
    id: Optional[PydanticObjectId] = Field(None, alias="_id")
    name: str
    surname: str
    mail: str
    password:SecretStr
    database: Optional[Any] = None

    def __eq__(self, other):
        return self.mail == other.mail

    def __hash__(self):
        return hash(self.mail)

    def get_password(self):
        return self.password.get_secret_value()