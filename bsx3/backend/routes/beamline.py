# -*- coding: utf-8 -*-
""" Beamline routes """
from flask import Blueprint, request, jsonify
from bsx3.backend.bsxapp import beamline

api = Blueprint('beamline_api', __name__)


@api.route("shutters", methods=["POST"])
def shutters():
    """ Retreives all avilable shutters

        Returns:
            JSON Response

    """
    resp = jsonify(beamline.get_shutters())
    resp.status_code = 200
    return resp


@api.route("energy", methods=["POST"])
def energy():
    """ Gets energy

        Returns:
            JSON Response

    """
    resp = jsonify(beamline.get_energy())
    resp.status_code = 200
    return resp


@api.route("machine-info", methods=["POST"])
def machine_info():
    """ Gets machine info

        Returns:
            JSON Response

    """
    resp = jsonify(beamline.get_machine_info())
    resp.status_code = 200
    return resp


@api.route("/get-beamline", methods=["POST"])
def _beamline():
    """ Retreives all relevant attributes associated to
        the beamline

        Returns:
            JSON Response

    """
    resp = jsonify(beamline.get_beamline())
    resp.status_code = 200
    print(request.get_json())
    return resp


@api.route("/toggle-shutter", methods=["POST"])
def toggle_shutter():
    """ Toggles shutter open/closed 

        Returns shutter JSON response
    """
    data = request.get_json()
    name = data.get('name')
    beamline.toggle_shutter_state(name)
    shutter = beamline.get_shutters().get(name)

    resp = jsonify(shutter)
    resp.status_code = 200

    return resp
