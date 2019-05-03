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

    config_fpath = os.path.abspath(os.path.join(
        os.path.dirname(__file__), "config/conf.yaml"))

    flask_app, socketio = server.init_backend(config_fpath)
    socketio.run(flask_app, host='0.0.0.0', port=8080, debug=True, use_reloader=False)
