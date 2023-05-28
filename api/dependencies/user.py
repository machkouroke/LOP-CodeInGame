from typing import Union, Any, Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from bson import ObjectId

from api.dependencies.db import get_db
from api.src.authentication.jwt_encode import decode_auth_token
from api.src.models.BlackListToken import BlacklistToken
from api.src.models.User import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/login')


def get_current_user(token: str = Depends(oauth2_scheme), db=Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    if BlacklistToken.check_blacklist(auth_token=token, database=db):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expiré",
        )
    try:
        payload = ObjectId(decode_auth_token(token))
        if payload is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    user = User.find_one_or_404(database=db, mask={'_id': payload})
    if user is None:
        raise credentials_exception

    return user
