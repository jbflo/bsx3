#!/usr/bin/env python
from gevent import monkey
monkey.patch_all(thread=False)

import os
import logging

from external.utils import init_hwr_paths

root_logger = logging.getLogger()
root_logger.setLevel(logging.DEBUG)


if __name__ == '__main__':
    init_hwr_paths()

    from bsx3.backend import server

    hwr_config_dir = os.path.abspath(os.path.join(
        os.path.dirname(__file__), "external/config"))

    flask_app, socketio = server.init_backend(hwr_config_dir)
    socketio.run(flask_app, host='0.0.0.0', port=8080, debug=True, use_reloader=False)
