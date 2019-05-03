# -*- coding: utf-8 -*-
from typing import ClassVar, Type, List, Dict

# from dataclasses import dataclass
from dataclasses import field

from flask import jsonify
from marshmallow import Schema, fields, validate
from marshmallow_jsonschema import JSONSchema

from marshmallow_dataclass import class_schema, dataclass


@dataclass
class UserLoginModel:
    username: str = field(metadata={"marshmallow_field": fields.String(required=True)})
    password: str = field(
        metadata={
            "marshmallow_field": fields.String(
                validate=validate.Length(min=8), required=True
            )
        }
    )

    Schema: ClassVar[Type[Schema]] = Schema


@dataclass
class AccessTokenResponseModel:
    access_token: str
    Schema: ClassVar[Type[Schema]] = Schema


@dataclass
class ShutterModel:
    name: str
    id: str
    state: str
    open_text: str
    close_text: str
    msg: str
    is_valid: bool

    Schema: ClassVar[Type[Schema]] = Schema


@dataclass
class EnergyModel:
    value: float
    energy: float
    wavelength: float
    state: bool
    tunable: bool
    energy_limits: List[float]
    wavelength_limits: List[float]

    Schema: ClassVar[Type[Schema]] = Schema


@dataclass
class MachineInfoModel:
    current: str
    message: str
    Schema: ClassVar[Type[Schema]] = Schema


@dataclass
class BeamlineModel:
    shutters = fields.Dict(
        keys=fields.Str(), values=fields.Nested(ShutterModel.Schema(strict=True))
    )
    energy = fields.Nested(EnergyModel.Schema(strict=True))
    machine_info = fields.Nested(MachineInfoModel.Schema(strict=True))
    Schema: ClassVar[Type[Schema]] = Schema


@dataclass
class HTTPErrorModel:
    msg: str
    Schema: ClassVar[Type[Schema]] = Schema


JSON_SCHEMAS = {"user_login": JSONSchema().dump(UserLoginModel.Schema()).data}
