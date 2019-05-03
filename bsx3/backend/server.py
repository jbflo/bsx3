# -*- coding: utf-8 -*-
import logging

from bsx3.backend.routes.v01 import home, auth, counter, beamline, schema
from bsx3.backend.core import App

# pylint: disable=import-error
from HardwareRepository import HardwareRepository as hwr


def init_backend(config_fpath):
    app = App(config_fpath, name="BSXCuBE3", base_prefix="/bsxcube/api/v0.1")

    app.register_blueprint(home.api, url_prefix="")
    app.register_blueprint(auth.api, url_prefix="/auth")
    app.register_blueprint(counter.api, url_prefix="/counter")
    app.register_blueprint(beamline.api, url_prefix="/beamline")
    app.register_blueprint(schema.api, url_prefix="/schemas")

    app.register_doc(beamline.api)
    app.register_doc(auth.api)

    return app.FLASK_APP, app.SIO
