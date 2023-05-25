from functools import wraps
from flask import abort, request

from api.src.authentication.jwt_encode import get_auth_token


def role_required(database, role=''):
    """
    Decorator to check if user has a specific role or is login if role is empty
    :param database: database
    :param role: role to check
    :return: decorator
    """

    def role_required_decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):

            valid_token = get_auth_token(request, database)
            if valid_token["success"]:

                decorated.user = valid_token["data"]
                if role:
                    if decorated.user["Type"] == role:
                        return f(*args, **kwargs)
                    else:
                        abort(401, "You are not authorized to access this resource.")
                else:
                    return f(*args, **kwargs)
            else:
                abort(401, valid_token["message"])

        return decorated

    return role_required_decorator
