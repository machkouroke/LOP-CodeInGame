from fastapi import APIRouter, Depends, HTTPException, status

from api.src.dependencies.db import get_db
from api.src.dependencies.auth import get_current_user
from api.src.models.Exercise import Exercise
from api.src.models.objectid import PydanticObjectId

router = APIRouter()




#
# @router.get('/exos', summary='Get all exercises for the connected user')
# def get_subscribed_exos(user=Depends(get_current_user), db=Depends(get_db)):
#     return user.get_all_exos(database=db)
#
#
# @router.get('/own_exos', summary='Get exercises created by current user')
# def get_owned_exos(user=Depends(get_current_user), db=Depends(get_db)):
#     if user.Type != 'teacher':
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Vous n'êtes pas autorisé à faire cette operation",
#         )
#     return user.get_own_exos(database=db)
#
#
#
