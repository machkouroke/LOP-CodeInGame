from fastapi import APIRouter, Depends, HTTPException, status
from werkzeug.exceptions import BadRequest

from api import verify_password
from api.dependencies.db import get_db
from api.dependencies.user import get_current_user
from api.src.authentication.jwt_encode import encode_auth_token
from api.src.models.User import UserAuth, User

router = APIRouter()


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

    if not verify_password(form_data.password, user.password.get_secret_value()):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect password"
        )
    if auth_token := encode_auth_token(user.id):
        return {
            'success': True,
            'message': 'Successfully logged in.',
            'auth_token': auth_token
        }


@router.get('/status', summary='Get details of currently logged in user')
async def get_status(user=Depends(get_current_user)):
    return user
