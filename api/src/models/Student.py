from flask_pymongo.wrappers import Database

from api.src.models.User import User
from api.src.models.objectid import PydanticObjectId
from api.src.utilities.utility_function import get_keys


class Student(User):
    level: str

    @classmethod
    def all(cls, database= Database):
        return [Student(**get_keys(student, list(Student.__fields__.keys()))) for student in database.Students.find()]

    @classmethod
    def find(cls, database: Database, mask: dict) -> list:
        students = database.Students.find(mask)
        for student in students:
            student.database = database
        return students

    @classmethod
    def find_one_or_404(cls, database: Database, mask: dict):
        Student = database.Students.find_one_or_404(mask)
        Student.database = database
        return Student

    def save(self, crypt):
        data = self.to_bson()
        data["password"] = crypt.generate_password_hash(
            data["password"].get_secret_value()
        ).decode()
        result = self.database.Students.insert_one(data)
        self.id = PydanticObjectId(result.inserted_id)

    def delete(self):
        self.database.Students.delete_one({"_id": self.id})

    def update(self, data: dict, crypt=None):
        if "password" in data:
            data["password"] = crypt.generate_password_hash(
                data["password"]
            ).decode()
        self.database.Students.update_one({"_id": self.id},
                                       {"$set": data})
        self.__init__(**Student.find_one_or_404(self.database, {"_id": self.id}).to_json())