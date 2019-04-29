# -*- coding: utf-8 -*-
""" Auth module """
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from bsx3.backend.app import auth
from bsx3.backend.models import UserModel, AccessTokenResponseModel
from bsx3.backend.flaskutils import Api

api = Api("auth_api", __name__)


@api.route(
    "/login",
    request_model=UserModel,
    response_model=AccessTokenResponseModel,
    methods=["post"],
)
def login(args):
    """Login route
    
    Args:
        UserModel

    Returns:
        AccessTokenResponseModel

    """
    user = UserModel(**args)

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
