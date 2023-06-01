from fastapi import APIRouter, Depends, HTTPException, status
from werkzeug.exceptions import BadRequest

from api.src.dependencies.auth import verify_password
from api.src.dependencies.db import get_db
from api.src.dependencies.auth import get_current_user, oauth2_scheme
from api.src.authentication.jwt_encode import encode_auth_token
from api.src.models.BlackListToken import BlacklistToken
from api.src.models.DTO import UserAuth, UserAdd
from api.src.models.User import User, Student, Teacher

router = APIRouter()


def class_retriever(data):
    if not data.Type:
        return User
    return {"student": Student, "teacher": Teacher, "user": User}[data.Type]


@router.post('/register')
async def create_user(to_add: UserAdd, db=Depends(get_db)):
    user_class = class_retriever(to_add)
    data = to_add.to_json()
    data['exos'] = []
    data['experience'] = 0
    if to_add.Type == 'teacher':
        data['exos_owned'] = []
    user = user_class(database=db, **data)

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


@router.post('/login')
async def login(form_data: UserAuth, db=Depends(get_db)):
    if not form_data.mail or not form_data.password:
        raise BadRequest('mail or password is empty')
    user = User.find_one_or_404(database=db, mask={"mail": form_data.mail})
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email incorrect"
        )

    if not verify_password(form_data.password, user.password.get_secret_value()):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password"
        )
    if auth_token := encode_auth_token(user.id):
        return {
            'success': True,
            'message': 'Successfully logged in.',
            'auth_token': auth_token
        }


@router.post('/logout')
async def logout(token: str = Depends(oauth2_scheme), db=Depends(get_db)):
    try:
        blacklist_token = BlacklistToken(token=token, database=db)
        blacklist_token.save()
        return {
            'detail': 'Déconnexion réussie'
        }
    except Exception as e:
        raise HTTPException(500, 'Une erreur du serveur est survenue') from e


@router.get('/status')
async def get_status(user=Depends(get_current_user), db=Depends(get_db)):
    user = User(**user, database=db)
    return user.to_json(to_exclude={"database"})
