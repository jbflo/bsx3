from flask import Blueprint, jsonify
from bsx3.backend.schemas import JSON_SCHEMAS

api = Blueprint("schema_api", __name__)

@api.route("/")
def get_all_schemas():
    status_code = 200
    resp = JSON_SCHEMAS

    return jsonify(resp), status_code

@api.route("/<name>")
def get_schema(name):
    status_code = 200

    try:
        resp = JSON_SCHEMAS.get(name)
    except KeyError:
        resp = {"error": "Schema missing"}
        status_code = 409

    return jsonify(resp), status_code
