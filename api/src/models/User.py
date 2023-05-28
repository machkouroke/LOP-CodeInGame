import inspect
from typing import Optional, Any

from fastapi.encoders import jsonable_encoder
from flask_pymongo.wrappers import Database
from pydantic import BaseModel, Field, SecretStr

from api import get_hashed_password
from api.src.models.Exercise import Exercise
from api.src.models.Model import Model
from api.src.models.objectid import PydanticObjectId
from api.src.utilities.utility_function import get_keys
from api.utilities.utilities_func import field


class UserAuth(BaseModel):
    mail: str
    password: str


class UserAdd(BaseModel):
    name: str
    surname: str
    mail: str
    password: str
    Type: str = 'user'
    filiere: Optional[str]

    def to_json(self, to_exclude: set = None) -> dict:
        properties = [prop_name for prop_name, prop in inspect.getmembers(self.__class__) if isinstance(prop, property)]
        for prop in properties:
            getattr(self, prop)
        return jsonable_encoder(self, exclude=to_exclude)


class User(Model):
    id: Optional[PydanticObjectId] = Field(None, alias="_id")
    name: str
    surname: str
    mail: str
    password: SecretStr
    experience: Optional[float]
    nbr_participation: Optional[int]
    exos: Optional[list[PydanticObjectId]] = []
    Type: str = 'user'
    database: Optional[Any] = None

    @field("fullname")
    def fullname(self):
        return self.name + ' ' + self.surname

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
        answer = database.Users.find_one(mask)
        if answer:
            user = User.return_user_by_type(answer)
            user.database = database
            return user
        else:
            return None

    def get_password(self):
        return self.password

    def save(self):
        data = self.to_bson()
        print(data)
        data["password"] = get_hashed_password(data["password"].get_secret_value())
        result = self.database.Users.insert_one(data)
        self.id = PydanticObjectId(result.inserted_id)

    def delete(self):
        self.database.Users.delete_one({"_id": self.id})

    def update(self, data: dict):
        if "password" in data:
            data["password"] = data["password"] = get_hashed_password(data["password"])

        self.database.Users.update_one({"_id": self.id},
                                       {"$set": data})
        self.__init__(**User.find_one_or_404(self.database, {"_id": self.id}).to_json())

    def addToSet(self, data: dict):
        self.database.Users.update_one(
            {'_id': self.id},
            {'$addToSet': data}
        )
        self.__init__(**User.find_one_or_404(self.database, {"_id": self.id}).to_json())

    def participate(self, exo: Exercise):
        data = {
            'user': self.id,
            'exo': exo.id,
            'score': 0
        }
        self.database.Participations.insert_one(data)
        self.addToSet({'exos': exo.id})
        exo.addToSet({'participators': self.id})

    def get_all_exos(self, database):
        all=[]
        for exo_id in self.exos:
            exo= Exercise.find_one_or_404(database=database, mask={'_id': exo_id})
            all.append(exo)
        return all


class Student(User):
    filiere: Optional[str]
    Type: str = 'student'

    @classmethod
    def all(cls, database):
        users = database.Users.find({"Type": "student"})
        return [Student(**get_keys(user, list(Student.__fields__.keys()))) for user in users]


class Teacher(User):
    exos_owned: Optional[list[PydanticObjectId]] = []
    Type: str = 'teacher'

    def add_exo(self, exo_id: PydanticObjectId):
        self.database.Users.update_one(
            {'_id': self.id},
            {'$addToSet': {'exos_owned': exo_id}}
        )
        self.exos_owned.append(exo_id)

    @classmethod
    def all(cls, database):
        users = database.Users.find({"Type": "teacher"})
        return [Teacher(**get_keys(user, list(Teacher.__fields__.keys()))) for user in users]
