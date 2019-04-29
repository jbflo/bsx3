# -*- coding: utf-8 -*-
""" Auth module """
from flask import jsonify, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_apispec import use_kwargs, marshal_with

from bsx3.backend.app import auth
from bsx3.backend.schemas import UserModel, UserLoginSchema, AccessTokenResponseSchema

api = Blueprint("auth_api", __name__)


@api.route("/login", methods=["post"])
@use_kwargs(UserLoginSchema)
@marshal_with(AccessTokenResponseSchema)
def login(**kwargs):
    """Login route"""
    user = UserModel(**kwargs)

    if auth.login(user.username, user.password):
        access_token = create_access_token(identity=user.username)

    return {"access_token": access_token}


@jwt_required
@api.route("/login", methods=["get"])
def get_current_indentity():
    """ Example """
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
