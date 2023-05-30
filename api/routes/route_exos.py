from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status

from api.dependencies.db import get_db
from api.dependencies.user import get_current_user
from api.src.models.DTO import ExoStart
from api.src.models.Exercise import Exercise, ExoToAdd
from api.src.models.User import Teacher
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
