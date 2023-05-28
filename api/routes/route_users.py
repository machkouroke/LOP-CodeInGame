from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from werkzeug.exceptions import BadRequest

from api import verify_password
from api.dependencies.db import get_db
from api.globals import bcrypt
from api.src.authentication.jwt_encode import encode_auth_token
from api.src.models.User import UserAuth, User, UserAdd, Student, Teacher

router = APIRouter()





