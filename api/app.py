from traceback import print_exception
from urllib.request import Request

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import Response

from api.src.routes import route_exos, route_auth, route_cli

app = FastAPI()

async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as e:
        # you probably want some kind of logging here
        print_exception(e)
        return Response("Internal server error", status_code=500)




app.middleware('http')(catch_exceptions_middleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get('/')
def home():
    return {"Hello": "World"}
app.include_router(route_exos.router, prefix='/exercises')
app.include_router(route_auth.router, prefix='/auth')
app.include_router(route_cli.router, prefix='/cli')


if __name__ == "__main__":
    uvicorn.run("app:app", port=8000, reload=True)
