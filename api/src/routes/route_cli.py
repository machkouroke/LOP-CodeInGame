import asyncio
import os
from pathlib import Path

from fastapi import APIRouter, File, Depends, HTTPException, status, WebSocket, WebSocketDisconnect
from starlette import status
from websockets.exceptions import ConnectionClosedOK

from api.src.dependencies.utilities import get_current_user_object, get_current_user_object_web_socket
from api.src.enum.enums import ROLE
from api.src.gcloud.gcloud import get_bucket
from api.src.models.Exercise import Exercise
from api.src.models.User import UserModel
from api.src.models.objectid import PydanticObjectId
from api.src.utilities.utility_function import Firebase

router = APIRouter()


@router.websocket("/lopsubmit")
async def lop_submit(websocket: WebSocket,
                     exercise_id: str,
                     kind: str,
                     user: UserModel = Depends(get_current_user_object_web_socket),
                     bucket=Depends(get_bucket)):
    await websocket.accept()
    temp_path = Path("temp/")
    temp_path.mkdir(parents=True, exist_ok=True)
    file_name = f"archive_{user.id}_{exercise_id}.zip"
    file_path = temp_path / file_name
    try:
        with open(file_path, "ab") as f:
            while data := await websocket.receive_bytes():
                f.write(data)
                await websocket.send_text("bytes received")
    except  WebSocketDisconnect:
        dest_path = "LOPInGame/solve/" if kind == "solve" else "LOPInGame/template/"
        asyncio.create_task(Firebase.upload(bucket=bucket, file_path=str(file_path), dest_path=dest_path))


@router.get("/lopgenerate/{exercise_id}")
async def lopgenerate(exercise_id: str, user: UserModel = Depends(get_current_user_object)):
    exercise = Exercise.find_one_or_404(database=user.database, mask={'_id': PydanticObjectId(exercise_id)})
    if user.role == ROLE.STUDENT or exercise.owner != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Vous n'êtes pas autorisé à faire cette operation",
        )
    return exercise


@router.get("/lopdownload")
async def lop_download(competition_id: str,
                       user_id: str,
                       kind: str, bucket=Depends(get_bucket),
                       user: UserModel = Depends(get_current_user_object)):
    file_name = f"archive_{user_id}_{competition_id}.zip"
    dest_path = "LOPInGame/solve/" if kind == "solve" else "LOPInGame/template/"

    return {
        "status": "success",
        "download_link": Firebase.download_link(bucket=bucket, path=f"{dest_path}{file_name}"),
    }
