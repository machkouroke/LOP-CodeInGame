from flask_pymongo.wrappers import Database

from api.src.models.Model import Model
from api.src.models.objectid import PydanticObjectId
from api.src.utilities.utility_function import get_keys


class Exercise(Model):
    name: str
    langage: str
    nbr_minutes: int
    Type: str

    @classmethod
    def find_one_or_404(cls, database: Database, mask: dict):
        answer = database.Exercises.find_one_or_404(mask)
        exercise = Exercise(**get_keys(answer, list(Exercise.__fields__.keys())))
        exercise.database = database
        return exercise

    def save(self):
        data= self.to_bson()
        result = self.database.Exercises.insert_one(data)
        self.id = PydanticObjectId(result.inserted_id)

    def delete(self):
        self.database.Exercises.delete_one({"_id": self.id})

    def update(self, data: dict):
        self.database.Exercises.update_one({"_id": self.id},
                                           {"$set": data})
        self.__init__(**Exercise.find_one_or_404(self.database, {"_id": self.id}).to_json())