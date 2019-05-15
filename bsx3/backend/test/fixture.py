# -*- coding: utf-8 -*-
""" Helper functions for pytest """
import os
import pytest

from external.utils import init_hwr_paths

init_hwr_paths()

config_fpath = os.path.abspath(os.path.join(
    os.path.dirname(__file__), "../../../",
    "config/conf.yaml"))

# pylint: disable=wrong-import-position
from bsx3.backend import server


@pytest.fixture
def client():
    """PyTest fixture for REST API"""
    flask_app, _socketio = server.init_backend(config_fpath=config_fpath)
    yield flask_app.test_client()
