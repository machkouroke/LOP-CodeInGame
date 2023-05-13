from typing import Optional, Any
from objectid import PydanticObjectId
from pydantic import BaseModel, Field, SecretStr
import inspect
from fastapi.encoders import jsonable_encoder

class User(BaseModel):
    id: Optional[PydanticObjectId] = Field(None, alias="_id")
    name: str
    surname: str
    mail: str
    password:SecretStr
    database: Optional[Any] = None

    def set_db(self, database):
        self.database= database

    def to_json(self, to_exclude: set = None) -> dict:
        if to_exclude is None:
            to_exclude = set()
        to_exclude.add("database")
        properties = [prop_name for prop_name, prop in inspect.getmembers(self.__class__) if isinstance(prop, property)]
        for prop in properties:
            getattr(self, prop)
        return jsonable_encoder(self, exclude=to_exclude)

    def to_bson(self, to_exclude=None):
        if to_exclude is None:
            to_exclude = set()
        to_exclude.add("database")
        data = self.dict(by_alias=True, exclude=to_exclude)
        if "_id" in data and data["_id"] is None:
            data.pop("_id")
        return data

    def __eq__(self, other):
        return self.mail == other.mail

    def __hash__(self):
        return hash(self.mail)

    def get_password(self):
        return self.password.get_secret_value()