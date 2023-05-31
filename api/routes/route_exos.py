from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status, WebSocket
from pymongo.database import Database

from api.dependencies.db import get_db
from api.dependencies.user import get_current_user
from api.src.models.DTO import ExoStart
from api.src.models.Exercise import Exercise, ExoToAdd
from api.src.models.User import Teacher, User
from api.src.models.objectid import PydanticObjectId

from datetime import timezone

router = APIRouter()


@router.post('/add')
def add_exercise(exo_to_add: ExoToAdd, user=Depends(get_current_user), db=Depends(get_db)):
    if user.Type != 'teacher':
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Vous n'êtes pas autorisé à faire cette operation",
        )
    data = exo_to_add.to_json()
    data['created_at'] = datetime.now(timezone.utc)
    data['participators'] = []
    exo = Exercise(database=db, **data)
    exo.save(owner_name=f'{user.name} {user.surname}')
    teacher = Teacher(database=db, **user.to_json())
    teacher.id = user.id
    teacher.add_exo(exo.id)

    return {
        'success': True,
        "message": 'Exercice bien ajouté',
        'id_exercice': exo.id,
    }


@router.patch('/{id_exo}/start')
def start_competition(id_exo: str, start: ExoStart, user=Depends(get_current_user), db=Depends(get_db)):
    if user.Type != 'teacher':
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Vous n'êtes pas autorisé à faire cette operation",
        )
    exo = Exercise.find_one_or_404(database=db, mask={'_id': PydanticObjectId(id_exo)})
    if exo is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="L'exercice n'existe pas",
        )
    exo.update(data={'start': start.start, 'end': start.end})
    return {
        'success': True,
        'details': "Competition bien démarrée"
    }


@router.get('/{id_exo}')
def get_exercice(id_exo: str, db=Depends(get_db)):
    exo = Exercise.find_one_or_404(database=db, mask={'_id': PydanticObjectId(id_exo)})
    return exo.to_json(to_exclude=set('owner_id'))


@router.websocket('/participants')
async def get_participants(websocket: WebSocket, db=Depends(get_db)):
    await websocket.accept()
    while True:
        data = await websocket.receive_json()
        await websocket.send_json(get_participators(db, data['id_exo']))

def get_participators(database: Database, id_exo: str):
    url = 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80'
    data = [
        User(**database.Users.find_one({"_id": PydanticObjectId(_id)}), database=database)
        for _id in database.Exercises.find_one({"_id": PydanticObjectId(id_exo)})['participators']
    ]
    return [
        {
            "name": [user.name, url],
            "experience": user.experience,
            "rank": user.get_rank,
        }
        for user in data
    ]

