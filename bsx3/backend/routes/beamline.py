# -*- coding: utf-8 -*-
""" Beamline routes """
from flask import Blueprint, jsonify

from flask_apispec import marshal_with

from bsx3.backend.app import beamline
from bsx3.backend.models import ShutterSchema


api = Blueprint("beamline_api", __name__)


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


@api.route("beamline", methods=["GET"])
def _beamline():
    """ Retreives all relevant attributes associated to
        the beamline

        Returns:
            JSON Response

    """
    resp = jsonify(beamline.get_beamline())
    resp.status_code = 200
    return resp


@api.route("toggle-shutter/<name>", methods=["PUT"])
@marshal_with(ShutterSchema)
def _toggle_shutter(name):
    """ Retreives all relevant attributes associated to
        the beamline

        Returns:
            JSON Response

    """
    try:
        resp = beamline.toggle_shutter_state(name)
    except RuntimeWarning as ex:
        resp = jsonify({"msg": str(ex)})
        resp.status_code = 401

    return resp
