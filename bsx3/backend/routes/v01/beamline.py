# -*- coding: utf-8 -*-
""" Beamline routes """
from flask import Blueprint, jsonify

from flask_apispec import marshal_with

from bsx3.backend.models import (
    ShutterModel,
    EnergyModel,
    MachineInfoModel,
    BeamlineModel,
    HTTPErrorModel,
)
from bsx3.backend.flaskutils import Api
from bsx3.backend.core import App


api = Api("Beamline API", __name__)


@api.route(
    "shutters",
    methods=["GET"],
    response_model=ShutterModel.Schema(strict=True, many=True),
)
def shutters():
    """ Retreives all avilable shutters

        Returns:
            ShutterModel

    """
    return App().blcontrol.get_group("shutters")


@api.route("energy", methods=["GET"], response_model=EnergyModel.Schema(strict=True))
def energy():
    """ Gets energy

        Returns:
            EnergyModel

    """
    return App().blcontrol.get("energy").asdict()


@api.route(
    "machine-info", methods=["GET"], response_model=MachineInfoModel.Schema(strict=True)
)
def machine_info():
    """ Gets machine info

        Returns:
            MachineInfoModel

    """
    return App().blcontrol.get("machine_info").get_machine_info()


@api.route(
    "beamline", methods=["GET"], response_model=BeamlineModel.Schema(strict=True)
)
def _beamline():
    """ Retreives all relevant attributes associated to
        the beamline

        Returns:
            BeamlineModel

    """
    shutters = {s.id: s.asdict() for s in App().blcontrol.get_group("shutters")}

    return {
        "shutters": shutters,
        "energy": App().blcontrol.get("energy").asdict(),
        "machine_info": App().blcontrol.get("machine_info").asdict(),
    }


@api.route(
    "toggle-shutter/<name>",
    response_model=ShutterModel.Schema(strict=True),
    methods=["PUT"],
    errors={401: HTTPErrorModel.Schema(strict=True)},
)
def _toggle_shutter(name):
    """ Retreives all relevant attributes associated to
        the beamline

        Returns:
            ShutterModel
    """
    try:
        resp = App().blcontrol.get(name).toggle_shutter_state()
    except RuntimeWarning as ex:
        resp = str(ex), 401

    return resp
