# -*- coding: utf-8 -*-
""" Helper functions for pytest """
import pytest

from external.utils import init_hwr_paths, get_config_dir
init_hwr_paths()

# pylint: disable=wrong-import-position
from bsx3.backend import server


@pytest.fixture
def client():
    """PyTest fixture for REST API"""
    flask_app, _socketio = server.init_backend(get_config_dir())
    yield flask_app.test_client()
