import inspect
from datetime import datetime

from pydantic import BaseModel

from api.src.enum.enums import ExerciseRelationKind, ROLE, ProgramingLanguage, ExerciseKind
from api.src.models.objectid import PydanticObjectId


class DTOModel(BaseModel):
    def dict(self, *args, **kwargs):
        properties = [prop_name for prop_name, prop in inspect.getmembers(self.__class__) if isinstance(prop, property)]
        for prop in properties:
            getattr(self, prop)
        return super().dict( exclude={"database"})



class UserAdd(BaseModel):
    name: str
    surname: str
    mail: str
    password: str
    role: ROLE



class ExoToAdd(BaseModel):
    name: str
    language: ProgramingLanguage
    kind: ExerciseKind




class ExoStart(DTOModel):
    start: datetime
    end: datetime


class UserAuth(DTOModel):
    mail: str
    password: str


class ExerciseRelation(DTOModel):
    kind: ExerciseRelationKind
    exercise_id: PydanticObjectId
    def dict(self, *args, **kwargs):
        return super().dict( exclude={"database"}) | {'kind': self.kind.value}


