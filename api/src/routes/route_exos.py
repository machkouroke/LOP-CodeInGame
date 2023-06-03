from fastapi import APIRouter, Depends, HTTPException, status, WebSocket
from pymongo.database import Database

from api.src.dependencies.db import get_db
from api.src.dependencies.utilities import get_current_user_object
from api.src.enum.enums import ROLE, ExerciseRelationKind
from api.src.models.DTO import ExoToAdd, ExoStart
from api.src.models.Exercise import Exercise
from api.src.models.User import UserModel, User
from api.src.models.objectid import PydanticObjectId

router = APIRouter()


@router.patch('/{exercise_id}/subscribe', summary="Permet de s'inscrire à un exercice")
def subscribe(exercise_id: str, user: UserModel = Depends(get_current_user_object)):
    user.subscribe_to_exercise(
        Exercise.find_one_or_404(database=user.database, mask={'_id': PydanticObjectId(exercise_id)}).id
    )
    return {
        'detail': {
            "exercise_id": exercise_id
        }
    }


@router.post('', summary="Permet d'ajouter un exercice")
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


@router.patch('/{id_exo}/start')
def start_exercise(id_exo: str, start: ExoStart, user: UserModel = Depends(get_current_user_object),
                   db=Depends(get_db)):
    exo: Exercise = Exercise.find_one_or_404(database=db, mask={'_id': PydanticObjectId(id_exo)})
    if user.role != ROLE.TEACHER:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Vous n'êtes pas autorisé à faire cette operation",
        )
    if exo.owner != user.id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Vous n'êtes pas le propriétaire de cet exercice",
        )
    exo.update(data={'start': start.start, 'end': start.end})
    return {
        'detail': {
            "exercise_id": id_exo
        }
    }

@router.delete('/{id_exo}')
def delete_exercise(id_exo: str, user: UserModel = Depends(get_current_user_object), db=Depends(get_db)):
    exo: Exercise = Exercise.find_one_or_404(database=db, mask={'_id': PydanticObjectId(id_exo)})
    if exo.owner != user.id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Vous n'êtes pas le propriétaire de cet exercice",
        )
    exo.delete()
    return {
        'detail': {
            "exercise_id": id_exo
        }
    }

@router.get('/{id_exo}')
def get_exercice(id_exo: str, db=Depends(get_db)):
    return Exercise.find_one_or_404(database=db, mask={'_id': PydanticObjectId(id_exo)})



@router.websocket('/subscribers')
async def get_participants(websocket: WebSocket, db=Depends(get_db)):
    await websocket.accept()
    while True:
        data: dict = await websocket.receive_json()
        await websocket.send_json(get_subscriber(db, data['exercise_id']))


def get_subscriber(database: Database, id_exo: str):
    url = 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80'
    data = [
        User(**database.Users.find_one({"_id": PydanticObjectId(_id)}), database=database)
        for _id in database.Exercises.find_one({"_id": PydanticObjectId(id_exo)})['subscribers']
    ]
    return [
        {
            "name": [user.name, url],
            "experience": user.experience,
            "rank": user.get_rank,
        }
        for user in data
    ]

@router.get('/{user_id}/users', summary='Permet de récupérer les exercices d\'un utilisateur')
def get_user_exercises(user_id: str,
                       kind: ExerciseRelationKind,
                       db=Depends(get_db)):
    user = User.find_one_or_404(database=db, mask={'_id': PydanticObjectId(user_id)})
    return [
        Exercise.find_one_or_404(database=db, mask={'_id': PydanticObjectId(exo_id.exercise_id)}).dict(
            exclude={'owner_id'})
        for exo_id in user.exercises if exo_id.kind == kind
    ]
