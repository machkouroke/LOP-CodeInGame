from datetime import datetime

from fastapi import HTTPException
from pymongo.database import Database
from api.src.enum.enums import ExerciseKind, ProgramingLanguage
from api.src.models.Model import Model
from api.src.models.objectid import PydanticObjectId
from api.src.utilities.utility_function import field
from api.src.utilities.utility_function import get_keys


class Exercise(Model):
    name: str
    language: ProgramingLanguage
    kind: ExerciseKind
    owner: PydanticObjectId = None
    subscribers: list[PydanticObjectId] = []
    created_at: datetime = datetime.now()
    start: datetime = None
    end: datetime = None

    def dict(self, *args, **kwargs):
        return super().dict( exclude={"database"}) | {"language": self.language.value, "kind": self.kind.value}
    def to_bson(self, to_exclude=None):
        return super().to_bson(to_exclude=to_exclude) | {"language": self.language.value, "kind": self.kind.value}

    @classmethod
    def find_one_or_404(cls, database: Database, mask: dict) -> "Exercise":
        if answer := database.Exercises.find_one(mask):
            exercise = Exercise(**get_keys(answer, list(Exercise.__fields__.keys())))
            exercise.database = database
            return exercise
        else:
            raise HTTPException(status_code=404, detail="Exercise non trouvé")

    def save(self, owner: PydanticObjectId) -> None:
        self.owner = owner
        data = self.to_bson()
        result = self.database.Exercises.insert_one(data)
        self.id = PydanticObjectId(result.inserted_id)

    def delete(self):
        self.database.Users.update_many({}, {"$pull": {"exercises": {"exercise_id": self.id}}})
        self.database.Exercises.delete_one({"_id": self.id})

    def update(self, data: dict):
        self.database.Exercises.update_one({"_id": self.id},
                                           {"$set": data})
        self.__init__(**Exercise.find_one_or_404(self.database, {"_id": self.id}).dict())

    @field("status")
    def get_status(self) -> str:
        if self.start is None:
            return "Not Scheduled"
        elif datetime.now() < self.start:
            return "Not Started"
        elif self.start < datetime.now() < self.end:
            return "In Progress"

        return "Finished"
    @field("owner_name")
    def get_owner_name(self) -> str:
        user = self.database.Users.find_one({"_id": self.owner})
        return f"{user['name']} {user['surname']}"