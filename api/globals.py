import flask.app
import flask_pymongo
from flask_bcrypt import Bcrypt
from flask_pymongo import PyMongo
from dotenv import load_dotenv, find_dotenv

from api.logger.MongoLogger import MongoLogger


def setup_db(app: flask.app.Flask) -> tuple[flask_pymongo.wrappers.Database, flask_pymongo.wrappers.MongoClient]:
    # function to connect to MongoDB
    global db, client
    client = PyMongo(app)
    db = client.db
    client = client.cx
    return db, client


def setup_log(app: flask.app.Flask, db: flask_pymongo.wrappers.Database, collection_name: str) -> MongoLogger:
    global logger
    logger = MongoLogger('Logger', db, collection_name)
    return logger


def bcrypt_password(app):
    global bcrypt
    bcrypt = Bcrypt(app)
    return bcrypt


def get_views(views_path: str, scope_variables: dict[str, any]):
    class_name, view_name = views_path.split('.')
    return scope_variables[class_name].__dict__[view_name]


environment = {
    'production': 'api.config.settings.ConfigFlask',
    'testing': 'api.config.settings.TestConfigFlask'
}

# load environment variables
load_dotenv(find_dotenv('.env'))
db, client = None, PyMongo()
bcrypt = Bcrypt()
