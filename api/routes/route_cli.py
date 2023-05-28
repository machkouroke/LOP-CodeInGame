from fastapi import APIRouter, File

router = APIRouter()

@router.post("/lopsubmit")
async def lop_submit(file: bytes = File(...)):
    with open("archive.zip", "wb") as f:
        f.write(file)

    return {"status": "success"}
