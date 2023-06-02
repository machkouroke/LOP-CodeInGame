from typing import Any

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from bson import ObjectId
from passlib.context import CryptContext
from pymongo.database import Database

from api.src.dependencies.db import get_db
from api.src.authentication.jwt_encode import decode_auth_token
from api.src.models.BlackListToken import BlacklistToken

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='auth/login')

password_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def get_current_user(token: str = Depends(oauth2_scheme), db: Database = Depends(get_db)) -> dict[str, Any]:
    if BlacklistToken.check_blacklist(auth_token=token, database=db):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Votre token est expiré veuillez vous reconnecter",
        )
    try:
        user_id = ObjectId(decode_auth_token(token))
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Nous n'avons pas pu vous authentifier",
            )
    except jwt.PyJWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nous n'avons pas pu vous authentifier",
        ) from e
    user = db.Users.find_one({'_id': user_id})
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Aucun utilisateur n'a été trouvé avec ce token",
        )

    return user


def get_hashed_password(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hashed_pass: str) -> bool:
    return password_context.verify(password, hashed_pass)
