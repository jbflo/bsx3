from typing import ClassVar, Type
from dataclasses import dataclass

from flask import jsonify
from marshmallow import Schema, fields, validate
from marshmallow_jsonschema import JSONSchema

from marshmallow_dataclass import class_schema

@dataclass
class UserModel():
    username: str
    password: str

class UserLoginSchema(Schema):
    username = fields.String(required=True)
    password = fields.String(validate=validate.Length(min=8), required=True)


class AccessTokenResponseSchema(Schema):
    access_token = fields.String()


class ShutterSchema(Schema):
    name = fields.String()
    id = fields.String()
    state = fields.String()
    open_text = fields.String()
    close_text = fields.String()
    msg = fields.String()
    is_valid = fields.Bool()


JSON_SCHEMAS = {"user_login": JSONSchema().dump(UserLoginSchema()).data}
