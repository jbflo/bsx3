from typing import ClassVar, Type

# from dataclasses import dataclass
from dataclasses import field

from flask import jsonify
from marshmallow import Schema, fields, validate
from marshmallow_jsonschema import JSONSchema

from marshmallow_dataclass import class_schema, dataclass


@dataclass
class UserModel:
    username: str = field(metadata={"marshmallow_field": fields.String(required=True)})

    password: str = field(
        metadata={
            "marshmallow_field": fields.String(
                validate=validate.Length(min=8), required=True
            )  # Custom marshmallow field
        }
    )

    Schema: ClassVar[Type[Schema]] = Schema


@dataclass
class AccessTokenResponseModel:
    token: str

    Schema: ClassVar[Type[Schema]] = Schema
    access_token = fields.String()


class ShutterSchema(Schema):
    name = fields.String()
    id = fields.String()
    state = fields.String()
    open_text = fields.String()
    close_text = fields.String()
    msg = fields.String()
    is_valid = fields.Bool()


JSON_SCHEMAS = {"user_login": JSONSchema().dump(UserModel.Schema()).data}
