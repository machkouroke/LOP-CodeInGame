from typing import Annotated

import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from api.dependencies.user import get_current_user
from api.routes import route_users, route_exos
from api.src.models.User import User
from fastapi import FastAPI
from routes.loging_router import login_route as login_router

app = FastAPI()


@app.get('/')
def home():
    return {"Hello": "World"}


@app.get('/me', summary='Get details of currently logged in user')
async def get_me(user=Depends(get_current_user)):
    return user.to_json()


app.include_router(route_users.router, )
app.include_router(route_exos.router, prefix='/exos')
app.include_router(login_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, port=8000)
