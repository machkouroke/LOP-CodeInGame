from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status, Form
from fastapi.security import OAuth2PasswordRequestForm
from werkzeug.exceptions import BadRequest

from api import verify_password
from api.dependencies.db import get_db
from api.dependencies.user import get_current_user
from api.globals import bcrypt
from api.src.authentication.jwt_encode import encode_auth_token
from api.src.models.Exercise import Exercise, ExoId
from api.src.models.User import UserAuth, User, UserAdd, Student, Teacher
from api.src.models.objectid import PydanticObjectId

router = APIRouter()


@router.post('/participate', summary='Participate to a competition')
def participate(exoId: ExoId, user= Depends(get_current_user), db= Depends(get_db)):
    exo= Exercise.find_one_or_404(database=db, mask={'_id': PydanticObjectId(exoId.exo_id)})
    if exo is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"L'exercice n'existe pas"
        )
    user.participate(exo)
    return {
        'success': True,
        # 'data': f'{exo_id}',
        # 'user': user
        'data': 'Vous etes ajoutes a la competition'
    }


