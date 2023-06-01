import inspect
from datetime import datetime

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel

class UserAdd(BaseModel):
    name: str
    surname: str
    mail: str
    password: str
    Type: str = 'user'

    def to_json(self, to_exclude: set = None) -> dict:
        properties = [prop_name for prop_name, prop in inspect.getmembers(self.__class__) if isinstance(prop, property)]
        for prop in properties:
            getattr(self, prop)
        return jsonable_encoder(self, exclude=to_exclude)
class FormModel(BaseModel):

    def to_json(self, to_exclude: set = None) -> dict:
        if to_exclude is None:
            to_exclude = set()
        to_exclude.add("database")
        properties = [prop_name for prop_name, prop in inspect.getmembers(self.__class__) if isinstance(prop, property)]
        for prop in properties:
            getattr(self, prop)
        return jsonable_encoder(self, exclude=to_exclude)


class ExoStart(FormModel):
    start: datetime
    end: datetime

class UserAuth(FormModel):
    mail: str
    password: str