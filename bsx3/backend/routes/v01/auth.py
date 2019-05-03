# -*- coding: utf-8 -*-
""" Auth module """
from flask import jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from bsx3.backend.core import auth
from bsx3.backend.models import UserLoginModel, AccessTokenResponseModel
from bsx3.backend.flaskutils import Api

api = Api("Authentication API", __name__)


@api.route(
    "/login",
    request_model=UserLoginModel.Schema(strict=True),
    response_model=AccessTokenResponseModel.Schema(strict=True),
    methods=["post"],
)
def login(user: UserLoginModel):
    """Login route
    
    Args:
        UserModel

    Returns:
        AccessTokenResponseModel
    """
    if auth.login(user.username, user.password):
        access_token = create_access_token(identity=user.username)
    else:
        access_token = {}

    return {"access_token": access_token}


@jwt_required
@api.route("/login", methods=["get"])
def get_current_indentity():
    """ Example """
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
