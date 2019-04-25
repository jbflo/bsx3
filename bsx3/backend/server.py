# -*- coding: utf-8 -*-
import logging

from flask import Flask
from flask_socketio import SocketIO

from flask_jwt_extended import JWTManager

from bsx3.backend.routes import home, auth, counter, beamline, schema
from bsx3.backend.bsxapp import init_app

# pylint: disable=import-error
from HardwareRepository import HardwareRepository as hwr


def init_backend(hwr_config_dir):
    flask_app = Flask(__name__)
    base_prefix = "/bsxcube/api/v0.1"

    flask_app.register_blueprint(home.api, url_prefix=base_prefix + "")
    flask_app.register_blueprint(auth.api, url_prefix=base_prefix + "/auth")
    flask_app.register_blueprint(counter.api, url_prefix=base_prefix + "/counter")
    flask_app.register_blueprint(beamline.api, url_prefix=base_prefix + "/beamline")
    flask_app.register_blueprint(schema.api, url_prefix=base_prefix + "/schemas")

    _hwr = hwr.getHardwareRepository(hwr_config_dir)
    _hwr.connect()
    hwr_logger = logging.getLogger("HWR")
    hwr_logger.setLevel(logging.DEBUG)

    flask_app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
    jwt = JWTManager(flask_app)

    socketio = SocketIO(manage_session=False)
    socketio.init_app(flask_app)

    init_app(_hwr, socketio, jwt)

    return flask_app, socketio
