import os
from datetime import datetime, timedelta, timezone
from typing import Optional

import jwt
from dotenv import load_dotenv, find_dotenv
from fastapi import Request
from pymongo.database import Database

from api.src.models.User import User
from api.src.models.objectid import PydanticObjectId

load_dotenv(find_dotenv('.env'))
JWT_SECRET_KEY = os.environ.get("SECRET_KEY")
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # 30 minutes
ALGORITHM = "HS256"


def encode_auth_token(user_id: PydanticObjectId):
    """
    Generates the Auth Token
    :return: string
    """
    try:
        payload = {
            'exp': datetime.now(timezone.utc) + timedelta(days=30, seconds=5),
            'iat': datetime.now(timezone.utc),
            'sub': str(user_id)
        }
        return jwt.encode(
            payload,
            JWT_SECRET_KEY,
            algorithm='HS256'
        )
    except Exception as e:
        return e


def decode_auth_token(auth_token):
    """
    Decodes the auth token
    :param auth_token:
    :return: integer|string
    """
    try:
        payload = jwt.decode(auth_token, JWT_SECRET_KEY, algorithms='HS256')
        print(f'payload: {payload}')
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'


def get_auth_token(request: Request, db: Database) -> dict:
    """
    Get the auth token from the header
    :param request: request
    :param db: database
    :return: dict
    """
    auth_header = request.headers.get('Authorization')
    auth_token = auth_header.split(" ")[1] if auth_header else ''
    if auth_token:
        response = decode_auth_token(auth_token)
        if not isinstance(response, str):
            user = User.find_one_or_404(database=db, mask={"_id": response})
            return {"success": True, "data": user.to_json()}
        return {"success": False, "message": response}
    else:
        return {"success": False, "message": "Provide a valid auth token."}
