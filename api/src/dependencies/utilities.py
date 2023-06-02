from fastapi import Depends
from pymongo.database import Database

from api.src.dependencies.auth import get_current_user
from api.src.dependencies.db import get_db
from api.src.models.User import User, Teacher, Student


def get_current_user_object(user=Depends(get_current_user), db: Database = Depends(get_db)) -> User | Teacher | Student:
    return User.return_user_by_role(database=db, user=user)
