from typing import Annotated, List

import uvicorn
from anyio.streams import file
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from api.routes import route_users, route_exos, route_login

app = FastAPI()


@app.get('/')
def home():
    return {"Hello": "World"}

@app.post('/lopsubmit')
async def lopsubmit(files: UploadFile):

    print(files)
    return {

         'hello':1
    }



app.include_router(route_users.router, prefix='/users')
app.include_router(route_exos.router, prefix='/exos')
app.include_router(route_login.router, prefix='/auth')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, port=8000)
