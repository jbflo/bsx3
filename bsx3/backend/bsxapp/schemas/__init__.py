from flask import jsonify

from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

from flask_restplus import Namespace

JSON_SCHEMAS = {
    "beamline": {
        "type" : "object",
            "properties" : {
                "price" : {"type" : "number"},
                "name" : {"type" : "string"},
        },
    },
    "user_login": {
        "type": "object",
        "properties": {
            "username": {
                "type": "string",
                "minLength": 2,
            },
            "password": {
                "type": "string",
                "minLength": 8,
            }
        },
        "required": ["username", "password"],
        "additionalProperties": False
    },
    "shutter": {
        "$id": "bsxcube/shutter.schema.json",
        "title": "Shutter",
        "type": "object",
        "required": ["name", "state", "is_valid"],
        "additionalProperties": False,
        "properties" : {
            "name": { 
                "description": "",
                "type": "string"
            },
            "state": {
                "description": "",
                "type": "string"
            },
            "is_valid": {
                "description": "",
                "type": "boolean"
            }
        }
    }
}

def validate_schema(data, schema):
    try:
        validate(data, schema)
    except ValidationError as e:
        resp = (False, None, e.message)
    except SchemaError as e:
        resp = (False, None, e.message)
    else:
        resp = (True , data, "")

    return resp

def validate_response(data, schema):
    if not isinstance(data, dict):
        resp = jsonify({"message": "Input data not a python dict"})
        resp.status_code = 409

    try:
        validate(data, schema)
    except ValidationError as e:
        resp = jsonify({"message": e})
        resp.status_code = 409
    except SchemaError as e:
        resp = jsonify({"message": e})
        resp.status_code = 409
    else:
        resp = jsonify(data)
        resp.status_code = 200

    return resp

def validate_request(request, schema):
    if not request.is_json:
        valid, data, message = (False, None, "Request not on JSON format")
    else:
        valid, data, message = validate_schema(request.json, schema)

    resp = jsonify(data) if valid else jsonify({ "valid": valid, "message": message })
    resp.status_code = 200 if valid else 409
    
    return valid, data, resp

api = Namespace("global")
