import inspect
from datetime import datetime
from typing import Optional

from fastapi.encoders import jsonable_encoder
from flask_pymongo.wrappers import Database
from pydantic import BaseModel

from api.src.models.FormModel import FormModel
from api.src.models.Model import Model
from api.src.models.objectid import PydanticObjectId
from api.src.utilities.utility_function import get_keys


class ExoId(BaseModel):
    exo_id: str


class ExoToAdd(BaseModel):
    name: str
    langage: str
    Type: str

    def to_json(self, to_exclude: set = None) -> dict:
        if to_exclude is None:
            to_exclude = set()
        to_exclude.add("database")
        properties = [prop_name for prop_name, prop in inspect.getmembers(self.__class__) if isinstance(prop, property)]
        for prop in properties:
            getattr(self, prop)
        return jsonable_encoder(self, exclude=to_exclude)


class ExoStart(FormModel):
    id: str
    start: Optional[datetime]
    end: Optional[datetime]


class Exercise(Model):
    name: str
    langage: str
    Type: str
    owner_name: Optional[str]
    participators: Optional[list[PydanticObjectId]] = []
    start: Optional[datetime]
    end: Optional[datetime]

    @classmethod
    def find_one_or_404(cls, database: Database, mask: dict):
        answer = database.Exercises.find_one(mask)
        if answer:
            exercise = Exercise(**get_keys(answer, list(Exercise.__fields__.keys())))
            exercise.database = database
            return exercise
        else:
            return None

    def save(self, owner_name):
        self.owner_name = owner_name
        data = self.to_bson()
        result = self.database.Exercises.insert_one(data)
        self.id = PydanticObjectId(result.inserted_id)

    def delete(self):
        self.database.Exercises.delete_one({"_id": self.id})

    def update(self, data: dict):
        self.database.Exercises.update_one({"_id": self.id},
                                           {"$set": data})
        self.__init__(**Exercise.find_one_or_404(self.database, {"_id": self.id}).to_json())

    def addToSet(self, data: dict, database):
        self.database.Exercises.update_one(
            {'_id': self.id},
            {'$addToSet': data}
        )
        new_data = Exercise.find_one_or_404(self.database, {"_id": self.id}).to_json()
        self.__init__(**new_data)
        self.id = PydanticObjectId(new_data['id'])
        self.database = database
