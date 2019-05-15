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

from bsx3.backend.core.base import Singleton
from bsx3.backend.core.blcontrol import BLControl


class App(metaclass=Singleton):
    """ Encapsulates all application wide data """

    _JWT = None

    SIO = None
    COUNTER = 1

    def __init__(self, config_fpath=None, name=__name__, base_prefix="v0.1"):
        App.FLASK_APP = Flask(name)

        App.FLASK_APP.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!

        App.FLASK_APP.config.update(
            {
                "APISPEC_SPEC": APISpec(
                    title="BSXCuBE3",
                    version=base_prefix,
                    openapi_version="2.0.0",
                    plugins=[MarshmallowPlugin()],
                ),
                "APISPEC_SWAGGER_URL": "/swagger/",
            }
        )

        App.BASE_PREFIX = base_prefix
        App.SIO = SocketIO(manage_session=False)

        App._JWT = JWTManager(App.FLASK_APP)
        App._FLASK_API_SPEC = FlaskApiSpec(App.FLASK_APP)

        App.SIO.init_app(App.FLASK_APP)
        App.blcontrol = BLControl(config_fpath)

    @staticmethod
    def register_doc(bl):
        for endpoint, fn in App.FLASK_APP.view_functions.items():
            if bl.name in endpoint:
                fn = doc(description=fn.__doc__, tags=[bl.name.title()])(fn)
                App._FLASK_API_SPEC.register(fn, blueprint=bl.name)

    @staticmethod
    def register_blueprint(bl, url_prefix, use_base_prefix=True):
        prefix = App.BASE_PREFIX + url_prefix if use_base_prefix else url_prefix
        App.FLASK_APP.register_blueprint(bl, url_prefix=prefix)
