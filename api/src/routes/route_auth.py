import traceback

from fastapi import APIRouter, Depends, HTTPException, status

from api.src.authentication.jwt_encode import encode_auth_token
from api.src.dependencies.auth import oauth2_scheme
from api.src.dependencies.auth import verify_password
from api.src.dependencies.db import get_db
from api.src.dependencies.utilities import get_current_user_object
from api.src.models.BlackListToken import BlacklistToken
from api.src.models.DTO import UserAuth, UserAdd
from api.src.models.User import User, Student, Teacher, UserModel
from api.src.utilities.utility_function import handle_HTTP_Exception

router = APIRouter()


def class_retriever(data: UserAdd) -> UserModel:
    if not data.role:
        return User
    return {"student": Student, "teacher": Teacher, "user": User}[data.role.value]


@router.post('/register')
async def create_user(to_add: UserAdd, db=Depends(get_db)):
    user_class = class_retriever(to_add)
    user = user_class(database=db, **to_add.dict())
    if user_class.find_one(database=db, mask={"mail": user.mail}):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"L'email {user.mail} est déja utilisé")
    user.save()
    return {
        "detail": {"auth_token": encode_auth_token(user.id)}
    }




@handle_HTTP_Exception
@router.post('/login')
async def login(form_data: UserAuth, db=Depends(get_db)):
    user = User.find_one_or_404(database=db, mask={"mail": form_data.mail})

    if not verify_password(form_data.password, user.password.get_secret_value()):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Mot de passe incorrect"
        )
    if auth_token := encode_auth_token(user.id):
        return {
            'detail': {
                "auth_token": auth_token
            }
        }
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Une erreur du serveur est survenue lors de la génération du token"
        )


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
async def get_status(user: UserModel = Depends(get_current_user_object)):
    try:
        return user.dict(to_exclude={"database"})
    except Exception as e:
        # print(e)
        raise e
