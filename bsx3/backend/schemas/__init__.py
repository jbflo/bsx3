from flask import jsonify
from pydantic import BaseModel, Schema


class UserLoginModel(BaseModel):
    username: str = Schema(..., title="Username", min_length=5)

    password: str = Schema(..., title="Password", min_length=8)


class AccessTokenResponseModel(BaseModel):
    access_token: str


JSON_SCHEMAS = {"user_login": UserLoginModel.schema()}
