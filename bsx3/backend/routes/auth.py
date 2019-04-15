# -*- coding: utf-8 -*-
""" Auth module """
from flask import Blueprint, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_restplus import Api
from flask_restplus import Resource

from bsx3.backend.bsxapp import auth
from bsx3.backend.bsxapp.schemas import JSON_SCHEMAS

api = Blueprint("auth_api", __name__)
rp_api = Api(api)

user_login_model = rp_api.schema_model('UserLogin', JSON_SCHEMAS.get("user_login_js"))

@rp_api.route("/login")
class LoginResource(Resource):
    @rp_api.expect(user_login_model, validate=True)
    def post(self):
        """ Example login """
        data = request.json

        if auth.login(data.get("username"), data.get("password")):
            access_token = create_access_token(identity=data.get("username"))
            resp = {"access_token": access_token}, 200

        return resp
    
    @jwt_required
    def get(self):
        """ Example """
        current_user = get_jwt_identity()
        return jsonify(logged_in_as=current_user), 200
