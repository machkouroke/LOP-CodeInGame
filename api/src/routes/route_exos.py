from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import ValidationError

from api.src.dependencies.db import get_db
from api.src.dependencies.utilities import get_current_user_object
from api.src.enum.enums import ROLE
from api.src.models.DTO import ExoToAdd
from api.src.models.Exercise import Exercise
from api.src.models.User import Teacher, UserModel
from api.src.models.objectid import PydanticObjectId
from api.src.utilities.utility_function import handle_HTTP_Exception

router = APIRouter()


@handle_HTTP_Exception
@router.post('/{exercise_id}/subscribe', summary="Permet de s'inscrire à un exercice")
def subscribe(exercise_id: str, user: UserModel = Depends(get_current_user_object)):
    user.subscribe_to_exercise(
        Exercise.find_one_or_404(database=user.database, mask={'_id': PydanticObjectId(exercise_id)}).id
    )
    return {
        'detail': 'Souscription réussie'
    }


@handle_HTTP_Exception
@router.post('')
def add_exercise(exo_to_add: ExoToAdd, user: UserModel = Depends(get_current_user_object), db=Depends(get_db)):
    if user.role != ROLE.TEACHER:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Vous n'êtes pas autorisé à faire cette operation",
        )
    data = exo_to_add.dict()
    exo = Exercise(database=db, **data)
    exo.save(owner=user.id)
    user.create_exercise(exo.id)
    return {
        'detail': {
            "exercise_id": exo.id
        }
    }

#
#
# @router.patch('/{id_exo}/start')
# def start_competition(id_exo: str, start: ExoStart, user=Depends(get_current_user), db=Depends(get_db)):
#     if user.Type != 'teacher':
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Vous n'êtes pas autorisé à faire cette operation",
#         )
#     exo = Exercise.find_one_or_404(database=db, mask={'_id': PydanticObjectId(id_exo)})
#     if exo is None:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="L'exercice n'existe pas",
#         )
#     exo.update(data={'start': start.start, 'end': start.end})
#     return {
#         'success': True,
#         'details': "Competition bien démarrée"
#     }
#
#
# @router.get('/{id_exo}')
# def get_exercice(id_exo: str, db=Depends(get_db)):
#     exo = Exercise.find_one_or_404(database=db, mask={'_id': PydanticObjectId(id_exo)})
#     return exo.to_json(to_exclude=set('owner_id'))
#
#
# @router.websocket('/participants')
# async def get_participants(websocket: WebSocket, db=Depends(get_db)):
#     await websocket.accept()
#     while True:
#         data = await websocket.receive_json()
#         await websocket.send_json(get_participators(db, data['id_exo']))
#
# def get_participators(database: Database, id_exo: str):
#     url = 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80'
#     data = [
#         User(**database.Users.find_one({"_id": PydanticObjectId(_id)}), database=database)
#         for _id in database.Exercises.find_one({"_id": PydanticObjectId(id_exo)})['subscribers']
#     ]
#     return [
#         {
#             "name": [user.name, url],
#             "experience": user.experience,
#             "rank": user.get_rank,
#         }
#         for user in data
#     ]
#
