from flask import Flask, request, jsonify, abort
from globals import setup_db, setup_log

def create_app():
    app = Flask(__name__)
    db, _= setup_db(app)
    logger= setup_log(app, db, 'logs')

    @app.route('/')
    def hello_world():
        return 'CodeIn Game'

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
