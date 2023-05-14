from abc import abstractmethod
from typing import Optional, Any

from flask_pymongo.wrappers import Database
from pydantic import BaseModel, Field, SecretStr

from api.src.models.Model import Model
from api.src.models.objectid import PydanticObjectId
from api.src.utilities.utility_function import get_keys


class User(Model):
    id: Optional[PydanticObjectId] = Field(None, alias="_id")
    name: str
    surname: str
    mail: str
    password: SecretStr
    Type: str = 'user'
    database: Optional[Any] = None

    def __eq__(self, other):
        return self.mail == other.mail

    def __hash__(self):
        return hash(self.mail)

    @staticmethod
    def return_user_by_type(user: dict):
        match user["Type"]:
            case "user":
                return User(**get_keys(user, list(User.__fields__.keys())))
            case "student":
                return Student(**get_keys(user, list(Student.__fields__.keys())))
            case "teacher":
                return Teacher(**get_keys(user, list(Teacher.__fields__.keys())))

    @classmethod
    def all(cls, database: Database):
        return [User(**get_keys(user, list(User.__fields__.keys()))) for user in database.Users.find()]

    @classmethod
    def find(cls, database: Database, mask: dict) -> list:
        users = database.Users.find(mask)
        for user in users:
            user.database = database
        return users

    @classmethod
    def find_one_or_404(cls, database: Database, mask: dict):
        answer = database.Users.find_one_or_404(mask)
        user = User.return_user_by_type(answer)
        user.database = database
        return user

    def get_password(self):
        return self.password.get_secret_value()

    def save(self, crypt):
        data = self.to_bson()
        data["password"] = crypt.generate_password_hash(
            data["password"].get_secret_value()
        ).decode()
        result = self.database.Users.insert_one(data)
        self.id = PydanticObjectId(result.inserted_id)

    def delete(self):
        self.database.Users.delete_one({"_id": self.id})

    def update(self, data: dict, crypt=None):
        if "password" in data:
            data["password"] = crypt.generate_password_hash(
                data["password"]
            ).decode()

        self.database.Users.update_one({"_id": self.id},
                                       {"$set": data})
        self.__init__(**User.find_one_or_404(self.database, {"_id": self.id}).to_json())


class Student(User):
    level: int
    Type: str = 'student'

    @classmethod
    def all(cls, database):
        users = database.Users.find({"Type": "student"})
        return [Student(**get_keys(user, list(Student.__fields__.keys()))) for user in users]


class Teacher(User):
    module: str
    Type: str = 'teacher'

    @classmethod
    def all(cls, database):
        users = database.Users.find({"Type": "teacher"})
        return [Teacher(**get_keys(user, list(Teacher.__fields__.keys()))) for user in users]
