from flask_pymongo.wrappers import Database
from pydantic import SecretStr

from api.src.models.User import User
from api.src.models.objectid import PydanticObjectId


class Teacher(User):
    module: str

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

