from datetime import datetime, timedelta, timezone

import jwt

from api.config.settings import get_settings, Settings
from api.src.models.objectid import PydanticObjectId

settings: Settings = get_settings()


def encode_auth_token(user_id: PydanticObjectId):
    """
    Generates the Auth Token
    :return: string
    """
    payload = {
        'exp': datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        'iat': datetime.now(timezone.utc),
        'sub': str(user_id)
    }
    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )


def decode_auth_token(auth_token: str):
    """
    Decodes the auth token
    :param auth_token:
    :return: integer|string
    """
    try:
        payload = jwt.decode(auth_token, settings.SECRET_KEY, algorithms=settings.ALGORITHM)
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'
