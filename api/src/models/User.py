import inspect
from typing import Optional, Any, Annotated

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
    exos: Optional[list[PydanticObjectId]] = []
    Type: str = 'user'
    database: Optional[Any] = None

    @field("fullname")
    def fullname(self):
        return self.name + ' ' + self.surname

    @field("nbr_participation")
    def get_n_participation(self):
        return len(self.exos)

    @field("participated_exos")
    def participated_exos(self):
        all= []
        exos= self.get_all_exos(database=self.database)
        for exo in exos:
            all.append({
                'name': exo.name,
                'owner_name': exo.owner_name,
                'published_year': exo.created_at.year
            })
        return all

    @field("rank")
    def get_rank(self):
        user_sorted= sorted(User.find(database=self.database), key=lambda x: x.experience, reverse=True)
        for i in range(len(user_sorted)):
            if user_sorted[i].id== self.id:
                return i+1

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
    def find(cls, database: Database) -> list:
        all=[]
        users = database.Users.find()
        for answer in users:
            # answer['experience']= (answer['experience'])
            # print(f"{type(answer['experience'])} {answer['name']}")
            user = User.return_user_by_type(answer)
            user.database = database
            # user['database'] = database
            all.append(user)
        return all

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

    def addToSet(self, data: dict, database):
        database.Users.update_one(
            {'_id': self.id},
            {'$addToSet': data}
        )
        new_data = User.find_one_or_404(database, {"_id": self.id}).to_json()
        self.__init__(**new_data)
        self.id = PydanticObjectId(new_data['id'])
        self.database = database

    def participate(self, exo: Exercise):
        data = {
            'user': self.id,
            'exo': exo.id,
            'score': 0
        }
        self.database.Participations.insert_one(data)
        self.database.Users.update_one({"_id": self.id}, {'$set': {'experience': self.experience + 20}})
        self.addToSet({'exos': exo.id}, database=self.database)
        exo.addToSet({'participators': self.id}, database=self.database)

    def get_all_exos(self, database):
        all = []
        for exo_id in self.exos:
            exo = Exercise.find_one_or_404(database=database, mask={'_id': exo_id})
            all.append(exo)
        return all


class Student(User):
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

    def get_own_exos(self, database):
        all = []
        for exo_id in self.exos_owned:
            exo = Exercise.find_one_or_404(database=database, mask={'_id': exo_id})
            all.append(exo)
        return all

    @classmethod
    def all(cls, database):
        users = database.Users.find({"Type": "teacher"})
        return [Teacher(**get_keys(user, list(Teacher.__fields__.keys()))) for user in users]
