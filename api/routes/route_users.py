from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from werkzeug.exceptions import BadRequest

from api import verify_password
from api.dependencies.db import get_db
from api.globals import bcrypt
from api.src.authentication.jwt_encode import encode_auth_token
from api.src.models.User import UserAuth, User, UserAdd

router = APIRouter()


@router.post('/register')
async def create_user(to_add: UserAdd, db=Depends(get_db)):
    user = User(database=db, **to_add.to_json())
    if User.find_one_or_404(database=db, mask={"mail": user.mail}) is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"L'email {user.mail} est déja utilisé")
    user.save()
    return {
        'success': True,
        "message": f'User {user.name} is created',
        "data": {"auth_token": encode_auth_token(user.id), "user_id": str(user.id)}
    }


@router.post('/login')
async def login(form_data: UserAuth, db=Depends(get_db)):
    if not form_data.mail or not form_data.password:
        raise BadRequest('mail or password is empty')
    user = User.find_one_or_404(database=db, mask={"mail": form_data.mail})
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email incorrect"
        )
    if not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
    if auth_token := encode_auth_token(user.id):
        return {
            'success': True,
            'message': 'Successfully logged in.',
            'auth_token': auth_token
        }
