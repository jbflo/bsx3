# -*- coding: utf-8 -*-
""" Auth module """
import functools

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from bsx3.backend.bsxapp import auth
from bsx3.backend.schemas import UserLoginModel, AccessTokenResponseModel
from bsx3.backend.flaskutils import Api

api = Api("auth_api", __name__)

@api.route("/login", request_model=UserLoginModel, response_model=AccessTokenResponseModel, methods=["post"])
def login(data: UserLoginModel):
    """ Example login """

    if auth.login(data.username, data.password):
        access_token = create_access_token(identity=data.username)

    return {"access_token": access_token}
    
@jwt_required
@api.route("/login", methods=["get"])
def get_current_indentity():
    """ Example """
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
