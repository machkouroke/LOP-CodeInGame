import os

from dotenv import load_dotenv, find_dotenv

from api.config.routes import USER_ROUTE
from api.config.views import USER_VIEW

load_dotenv(find_dotenv('.env'))
DB_NAME = os.environ.get("DB_NAME")
DB_USER = os.environ.get("MONGO_USERNAME")
DB_PASSWORD = os.environ.get("MONGO_PASSWORD")
DB_HOST = os.environ.get("MONGO_URL")
SECRET = os.environ.get("SECRET_KEY")
INTELLIJ = "true"


class ConfigFlask(object):
    DEBUG = True
    DEVELOPMENT = True
    MONGODB_SETTINGS = {
        'db': DB_NAME,
        'host': DB_HOST,
        'username': DB_USER,
        'password': DB_PASSWORD
    }
    MONGO_URI = f"mongodb+srv://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}?retryWrites=true&w=majority"
    SECRET_KEY = SECRET


USER = [
    {"endpoint": USER_ROUTE, "view_func": f"{USER_VIEW}.add_user", "methods": ['POST']}
]

routes = [
    {"endpoint": "/", "view_func": "UserView.render", "methods": ["GET"]},
    *USER
]
