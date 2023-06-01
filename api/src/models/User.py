from typing import Optional, Any

from fastapi import HTTPException
from pydantic import Field, SecretStr
from pymongo.database import Database
from starlette import status

from api.src.dependencies.auth import get_hashed_password
from api.src.enum.enums import ExerciseRelationKind, ROLE
from api.src.models.DTO import ExerciseRelation
from api.src.models.Model import Model
from api.src.models.objectid import PydanticObjectId
from api.src.utilities.pipelines import pipelines
from api.src.utilities.utility_function import get_keys, addToSet
from api.src.utilities.utility_function import field


class User(Model):
    id: Optional[PydanticObjectId] = Field(None, alias="_id")
    name: str
    surname: str
    mail: str
    password: SecretStr
    experience: float = 0
    exercises: Optional[list[ExerciseRelation]] = []
    role: ROLE = ROLE.USER
    database: Optional[Any] = None

    @field("fullname")
    def fullname(self):
        return f'{self.name} {self.surname}'

    @field("nbr_participation")
    def get_number_of_subscription(self):
        return len([exercise for exercise in self.exercises if exercise.kind == ExerciseRelationKind.SUBSCRIBER])

    def get_exercises(self, kind: ExerciseRelationKind = None) -> list[dict]:
        if kind:
            return [
                self.database.Exercises.find_one({'_id': PydanticObjectId(exercise.exercise_id)})
                for exercise in self.exercises if exercise.kind == kind
            ]
        else:
            return [
                self.database.Exercises.find_one({'_id': PydanticObjectId(exercise.exercise_id)})
                for exercise in self.exercises
            ]

    @field("rank")
    def get_rank(self):
        return list(self.database.Users.aggregate(pipelines['get_rank']))[0]['items']['rank'] + 1

    def __eq__(self, other):
        return self.mail == other.mail and self.id == other.id

    def __hash__(self):
        return hash(self.mail)

    @staticmethod
    def return_user_by_role(database: Database, user: dict):
        user['database'] = database
        match user["role"]:
            case ROLE.USER.value:
                return User(**get_keys(user, list(User.__fields__.keys())))
            case ROLE.STUDENT.value:
                return Student(**get_keys(user, list(Student.__fields__.keys())))
            case ROLE.TEACHER.value:
                return Teacher(**get_keys(user, list(Teacher.__fields__.keys())))

    @classmethod
    def all(cls, database: Database):
        return [User(**get_keys(user, list(User.__fields__.keys()))) for user in database.Users.find()]

    @classmethod
    def find_one_or_404(cls, database: Database, mask: dict):
        if answer := database.Users.find_one(mask):
            return User.return_user_by_role(user=answer, database=database)
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Utilisateur non trouvé",
            )
    @classmethod
    def find_one(cls, database: Database, mask: dict):
        if result := database.Users.find_one(mask):
            return User.return_user_by_role(user=result, database=database)
        else:
            return None


    def save(self):
        data = self.to_bson()
        data["password"] = get_hashed_password(data["password"].get_secret_value())
        data['role'] = data['role'].value
        result = self.database.Users.insert_one(data)
        self.id = PydanticObjectId(result.inserted_id)

    def delete(self):
        self.database.Users.delete_one({"_id": self.id})

    def update(self, data: dict):
        if "password" in data:
            data["password"] = get_hashed_password(data["password"])

        self.database.Users.update_one({"_id": self.id},
                                       {"$set": data})
        self.__init__(**User.find_one_or_404(self.database, {"_id": self.id}).dict())

    def addToSet(self, data: dict, database):
        database.Users.update_one(
            {'_id': self.id},
            {'$addToSet': data}
        )
        new_data = User.find_one_or_404(database, {"_id": self.id}).dict()
        self.__init__(**new_data)
        self.id = PydanticObjectId(new_data['id'])
        self.database = database

    def subscribe_to_exercise(self, exercise_id: PydanticObjectId):
        data = ExerciseRelation(kind=ExerciseRelationKind.SUBSCRIBER, exercise_id=exercise_id)
        addToSet(database=self.database,
                 collection_name='Users',
                 query={"_id": self.id},
                 field='exercises',
                 value={'exercises': data.dict()})
        self.exercises += [data]


class Student(User):
    role: ROLE = ROLE.STUDENT

    @classmethod
    def all(cls, database):
        users = database.Users.find({"role": ROLE.STUDENT.value})
        return [Student(**get_keys(user, list(Student.__fields__.keys()))) for user in users]


class Teacher(User):
    role: ROLE = ROLE.TEACHER

    def create_exercise(self, exercise_id: PydanticObjectId):
        data = ExerciseRelation(kind=ExerciseRelationKind.CREATOR, exercise_id=exercise_id)

        addToSet(database=self.database,
                 collection_name='Users',
                 query={"_id": self.id},
                 field='exercises',
                 value={'exercises': data.dict()})
        self.exercises += [data]

    @classmethod
    def all(cls, database):
        users = database.Users.find({"role": ROLE.TEACHER.value})
        return [Teacher(**get_keys(user, list(Teacher.__fields__.keys()))) for user in users]
