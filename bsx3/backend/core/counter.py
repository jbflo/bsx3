# -*- coding: utf-8 -*-
""" Counter example module """

from bsx3.backend.core import App


def increment():
    """ Increment counter """
    app = App()
    app.COUNTER += 1

    return app.COUNTER


def decrement():
    """ Decrement counter """
    app = App()
    app.COUNTER -= 1

    return app.COUNTER


def count():
    """ Get count """
    app = App()
    return app.COUNTER
