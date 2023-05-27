from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from werkzeug.exceptions import BadRequest

from api import verify_password
from api.dependencies.db import get_db
from api.globals import bcrypt
from api.src.authentication.jwt_encode import encode_auth_token
from api.src.models.User import UserAuth, User, UserAdd, Student, Teacher

router = APIRouter()


def class_retriever(data):
    if not data.Type:
        return User
    return {"student": Student, "teacher": Teacher, "user": User}[data.Type]


@router.post('/register')
async def create_user(to_add: UserAdd, db=Depends(get_db)):
    user_class= class_retriever(to_add)
    data= to_add.to_json()
    if to_add.Type == 'teacher': data['exos']=[]
    user = user_class(database=db, **data)

    # return user.to_json()

    if user_class.find_one_or_404(database=db, mask={"mail": user.mail}) is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"L'email {user.mail} est déja utilisé")
    user.save()
    return {
        'success': True,
        "message": f'{user.Type} {user.name} is created',
        "data": {"auth_token": encode_auth_token(user.id), "user_id": str(user.id)}
    }


