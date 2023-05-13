from flask import request, abort, jsonify
from werkzeug.exceptions import BadRequest, Unauthorized

from api.globals import bcrypt, db
from api.src.authentication.jwt_encode import encode_auth_token
from api.src.models.BlackList import BlacklistToken
from api.src.models.User import User, Student, Teacher


class UserView():

    @staticmethod
    def class_retriever(request):
        params = request.args
        if "type" not in params:
            return User
        return {"student": Student, "teacher": Teacher, "user": User}[params.get("type")]

    @staticmethod
    def add_user():
        try:
            user_class = UserView.class_retriever(request)
            user = user_class(database=db, **request.get_json())
            if user_class.find(database=db, mask={"mail": user.mail}):
                abort(401, f'User with mail {user.mail} already exist')
            user.save(crypt=bcrypt)
            return jsonify({
                "success": True,
                "message": f'User {user.name} is created',
                "data": {"auth_token": encode_auth_token(user.id), "user_id": str(user.id)}
            })
        except Exception as e:
            abort(500, 'Une erreur du serveur est survenue')

    @staticmethod
    def login():
        post_data = request.get_json()
        try:
            if not post_data:
                raise BadRequest('Request body is empty')
            if "mail" not in post_data:
                raise BadRequest('mail is required in the request body')
            if "password" not in post_data:
                raise BadRequest('password is required in the request body')
            if not post_data["mail"] or not post_data["password"]:
                raise BadRequest('mail or password is empty')
            student = User.find_one_or_404(database=db,
                                           mask={"mail": post_data.get("mail")})
            if not bcrypt.check_password_hash(
                    student.get_password(), post_data.get('password')
            ):
                raise Unauthorized('Password is incorrect')
            if auth_token := encode_auth_token(student.id):
                return jsonify({
                    'success': True,
                    'message': 'Successfully logged in.',
                    'auth_token': auth_token
                })
            else:
                raise Unauthorized('Student does not exist')
        except Exception as e:
            abort(500, 'Une erreur est survenue')

    @staticmethod
    def logout():
        auth_token = request.headers.get('Authorization').split(" ")[1]

        # mark the token as blacklisted
        blacklist_token = BlacklistToken(token=auth_token, database=db)
        blacklist_token.save()
        try:
            # insert the token
            responseObject = {
                'success': True,
                'message': 'Successfully logged out.'
            }
            return jsonify(responseObject)
        except Exception as e:
            abort(500, 'Une erreur du serveur est survenue')