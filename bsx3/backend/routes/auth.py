# -*- coding: utf-8 -*-
""" Auth module """

from flask import Blueprint, request, jsonify
from bsx3.backend.bsxapp import auth

api = Blueprint("auth_api", __name__)

@api.route("/login", methods=["POST"])
def login():
    """ Example login """
    auth.login()
    resp = jsonify({"test": "OK"})

    print(request.get_json())
    print("TEST !")
    return resp

@api.route("/test", methods=["GET"])
def get_login():
    """ Example login """
    resp = jsonify({"test": "OK"})
    print("TEST !")
    return resp
