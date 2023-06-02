import uvicorn
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from api.src.routes import  route_exos, route_auth, route_cli

app = FastAPI()


@app.get('/')
def home():
    return {"Hello": "World"}


@app.post('/lopsubmit')
async def lopsubmit(files: UploadFile):
    print(files)
    return {
        'hello': 1
    }


app.include_router(route_exos.router, prefix='/exercises')
app.include_router(route_auth.router, prefix='/auth')
app.include_router(route_cli.router, prefix='/cli')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run("app:app", port=8000, reload=True)
