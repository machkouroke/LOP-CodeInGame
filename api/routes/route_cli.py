import os

from fastapi import APIRouter, File, Depends

from api.gcloud.gcloud import get_bucket
from api.utilities.utilities_func import Firebase

router = APIRouter()

@router.post("/lopsubmit")
async def lop_submit(file: bytes = File(...),  bucket=Depends(get_bucket)):
    with open("archive.zip", "wb") as f:
        f.write(file)
        Firebase.upload(bucket=bucket, file_path="archive.zip", dest_path="LOPInGame/")
        # delete file from disk
    os.remove("archive.zip")
    return {"status": "success"}
