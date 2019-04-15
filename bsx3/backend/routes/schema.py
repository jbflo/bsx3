from flask import Blueprint, request
from flask_restplus import Api
from flask_restplus import Resource

from bsx3.backend.bsxapp.schemas import JSON_SCHEMAS

api = Blueprint("schema_api", __name__)
rp_api = Api(api)

@rp_api.route("/<name>")
class SpecificSchemaResource(Resource):
    def get(self, name):
        status_code = 200

        try:
            resp = JSON_SCHEMAS.get(name)
        except KeyError:
            resp = {"error": "Schema missing"}
            status_code = 409

        return resp, status_code


@rp_api.route("/")
class AllSchemasResource(Resource):
    def get(self):
        status_code = 200
        resp = JSON_SCHEMAS

        return resp, status_code