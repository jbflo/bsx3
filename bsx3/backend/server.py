# -*- coding: utf-8 -*-
import logging

from flask import Flask
from flask_socketio import SocketIO

from bsx3.backend.routes import home, auth, counter
from bsx3.backend.bsxapp import init_app

# pylint: disable=import-error
from HardwareRepository import HardwareRepository as hwr


def init_backend(hwr_config_dir):
    flask_app = Flask(__name__)
    flask_app.register_blueprint(home.api, url_prefix='')
    flask_app.register_blueprint(auth.api, url_prefix='/auth')
    flask_app.register_blueprint(counter.api, url_prefix='/counter')

    _hwr = hwr.getHardwareRepository(hwr_config_dir)
    _hwr.connect()
    hwr_logger = logging.getLogger("HWR")
    hwr_logger.setLevel(logging.DEBUG)

    init_app(_hwr)

    socketio = SocketIO(manage_session=False)
    socketio.init_app(flask_app)

    return flask_app, socketio
