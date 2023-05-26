from flask import Flask
from flask_cors import CORS

from api.config.settings import routes
from api.globals import get_views, environment, setup_db, setup_log


def init_route(app):
    from api.src.views.UserView import UserView
    for route in routes:
        app.add_url_rule(route['endpoint'], view_func=get_views(route['view_func'], locals()),
                         methods=route['methods'])


def create_app(env: str = 'production'):
    app = Flask(__name__)
    app.config.from_object(environment[env])
    db, _ = setup_db(app)
    logger = setup_log(app, db, 'logs')

    CORS(app, resources={r"/*": {"origins": "*"}})

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,true')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE,OPTIONS')
        return response

    init_route(app)

    return app
