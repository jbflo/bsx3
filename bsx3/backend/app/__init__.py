# -*- coding: utf-8 -*-
""" Application wide functionality"""
import sys
import logging

from flask import Flask
from flask_socketio import SocketIO

from flask_jwt_extended import JWTManager

from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin

from flask_apispec.extension import FlaskApiSpec
from flask_apispec.annotations import doc

HOMAP = [
    {"attr": "auth", "role": "ldaplogin", "required": True},
    {"attr": "beamline", "role": "beamline", "required": True},
]


class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            try:
                cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
            except TypeError as ex:
                msg = "Could not get App object, call to intial to App "
                msg += "probably missing"
                logging.exception(str(ex))
                logging.error(msg)
                sys.exit(-1)

        return cls._instances[cls]


class App(metaclass=Singleton):
    """ Encapsulates all application wide data """

    _HWR = None
    _JWT = None

    SIO = None
    COUNTER = 1

    def __init__(self, hwr=None, name=__name__, base_prefix="v0.1"):
        App.FLASK_APP = Flask(name)

        App.FLASK_APP.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!

        App.FLASK_APP.config.update(
            {
                "APISPEC_SPEC": APISpec(
                    title="BSXCuBE3",
                    version=base_prefix,
                    openapi_version="3.0.2",
                    plugins=[MarshmallowPlugin()],
                ),
                "APISPEC_SWAGGER_URL": "/swagger/",
            }
        )

        App.BASE_PREFIX = base_prefix
        App.SIO = SocketIO(manage_session=False)

        App._HWR = hwr
        App._JWT = JWTManager(App.FLASK_APP)
        App._FLASK_API_SPEC = FlaskApiSpec(App.FLASK_APP)

        App.SIO.init_app(App.FLASK_APP)

        self.auth = None
        self.beamline = None

        for ho in HOMAP:
            setattr(self, ho["attr"], App.get_ho(ho["role"], ho["required"]))

    @staticmethod
    def get_ho(name, required=True):
        if not App._HWR:
            logging.error("HardwareRepository not initialized")
            sys.exit(-1)

        ho = App._HWR.getHardwareObject(name)

        if not ho and required:
            logging.error("[APP]: No HardwareObject with name %s", name)
            sys.exit(-1)
        elif not ho and not required:
            logging.error("[APP]: No HardwareObject with name %s", name)
        else:
            logging.info("[APP]: Found HardwareObject %s", name)

        return ho

    @staticmethod
    def register_doc(bl):
        for endpoint, fn in App.FLASK_APP.view_functions.items():
            if bl.name in endpoint:
                fn = doc(
                    description=fn.__doc__, tags=[bl.name.title().replace("_", " ")]
                )(fn)
                App._FLASK_API_SPEC.register(fn, blueprint=bl.name)

    @staticmethod
    def register_blueprint(bl, url_prefix, use_base_prefix=True):
        prefix = App.BASE_PREFIX + url_prefix if use_base_prefix else url_prefix
        App.FLASK_APP.register_blueprint(bl, url_prefix=prefix)
