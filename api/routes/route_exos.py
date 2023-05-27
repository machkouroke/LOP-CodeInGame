from fastapi import APIRouter, Depends, HTTPException, status

from api.dependencies.db import get_db
from api.dependencies.user import get_current_user
from api.src.models.Exercise import Exercise, ExoToAdd
from api.src.models.User import Teacher
from api.src.models.objectid import PydanticObjectId

router = APIRouter()


@router.post('/add')
def add_exercise(exo_to_add: ExoToAdd, user=Depends(get_current_user), db=Depends(get_db)):
    if user.Type != 'teacher':
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Vous n'êtes pas autorisé à faire cette operation")
    exo = Exercise(database=db, **exo_to_add.to_json())
    exo.save(owner_name=user.name + ' ' + user.surname)
    teacher = Teacher(database=db, **user.to_json())
    teacher.id = user.id
    teacher.add_exo(exo.id)

    return {
        'success': True,
        "message": f'Exercice bien ajouté',
        'id_exercice': exo.id
    }


@router.get('/{id}')
def get_exercice(id: str, db=Depends(get_db)):
    # id = PydanticObjectId(id)
    # return {"id": id}
    exo = Exercise.find_one_or_404(database=db, mask={'_id': PydanticObjectId(id)})
    data = exo.to_json(to_exclude=set('owner_id'))
    return data
