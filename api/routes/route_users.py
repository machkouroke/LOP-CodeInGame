from fastapi import APIRouter, Depends, HTTPException, status
from starlette.websockets import WebSocket

from api.dependencies.db import get_db
from api.dependencies.user import get_current_user
from api.src.models.Exercise import Exercise, ExoId
from api.src.models.objectid import PydanticObjectId

router = APIRouter()


@router.post('/participate', summary='Participate to a competition')
def participate(exoId: ExoId, user=Depends(get_current_user), db=Depends(get_db)):
    try:
        exo = Exercise.find_one_or_404(database=db, mask={'_id': PydanticObjectId(exoId.exo_id)})
        if exo is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="L'exercice n'existe pas",
            )
        user.participate(exo)
        return {
            'success': True,
            # 'data': f'{exo_id}',
            # 'user': user
            'data': 'Vous etes ajoutes a la competition'
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Une erreur est survenue: {e}",
        ) from e


@router.get('/exos', summary='Get all exos for the connected user')
def get_all_exos(user=Depends(get_current_user), db=Depends(get_db)):
    return {
        'success': True,
        'all': user.get_all_exos(database=db)
    }


@router.get('/own_exos', summary='Get exos created by current user')
def get_owned_exos(user=Depends(get_current_user), db=Depends(get_db)):
    if user.Type != 'teacher':
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Vous n'êtes pas autorisé à faire cette operation",
        )
    return {
        'success': True,
        'all': user.get_own_exos(database=db)
    }


@router.websocket('/ws')
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_json()
        await websocket.send_json({'message': 'Hello World'})
        print(f"Message received from client: {data}")
