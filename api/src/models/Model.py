import inspect
from typing import Optional, Any

from pydantic import BaseModel, Field

from api.src.models.objectid import PydanticObjectId


class Model(BaseModel):
    id: Optional[PydanticObjectId] = Field(None, alias="_id")
    database: Optional[Any] = None

    def dict(self, *args, **kwargs):
        properties = [prop_name for prop_name, prop in inspect.getmembers(self.__class__) if isinstance(prop, property)]
        print(properties)
        for prop in properties:
            getattr(self, prop)
        return super().dict( exclude={"database"})

    def set_db(self, database):
        self.database= database


    def to_bson(self, to_exclude=None):
        if to_exclude is None:
            to_exclude = set()
        to_exclude.add("database")
        to_exclude.add("fullname")
        data= super().dict(by_alias=True, exclude=to_exclude)
        if "_id" in data and data["_id"] is None:
            data.pop("_id")
        return data
