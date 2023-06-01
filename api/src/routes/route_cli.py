import os

from fastapi import APIRouter, File, Depends

from api.src.gcloud.gcloud import get_bucket
from api.src.utilities.utility_function  import Firebase

router = APIRouter()


@router.post("/lopsubmit")
async def lop_submit(user_id: str, competition_id: str, kind: str, file: bytes = File(...), bucket=Depends(get_bucket)):
    file_name = f"archive_{user_id}_{competition_id}.zip"
    dest_path = "LOPInGame/solve/" if kind == "solve" else "LOPInGame/template/"
    with open(file_name, "wb") as f:
        f.write(file)
        Firebase.upload(bucket=bucket, file_path=file_name, dest_path=dest_path)
    os.remove(file_name)
    return {"status": "success"}


@router.get("/lopdownload")
async def lop_download(competition_id: str, user_id: str, kind: str, bucket=Depends(get_bucket)):
    file_name = f"archive_{user_id}_{competition_id}.zip"
    dest_path = "LOPInGame/solve/" if kind == "solve" else "LOPInGame/template/"

    return {"status": "success",
            "download_link": Firebase.download_link(bucket=bucket, path=f"{dest_path}{file_name}"),
            }
