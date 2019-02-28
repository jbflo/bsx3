# -*- coding: utf-8 -*-
""" Application wide functionality"""
import sys
import logging

# Application instance
APP = None


class Application():
    """ Encapsulates all application wide data """
    COUNTER = 1
    _HWR = None

    def __init__(self, hwr):
        Application._HWR = hwr

    @staticmethod
    def get_ho(name):
        if not Application._HWR:
            logging.error("HardwareRepository not initialized")
            sys.exit(-1)

        ho = Application._HWR.getHardwareObject(name)

        if not ho:
            logging.error("No HardwareObject with name %s", name)
            sys.exit(-1)

        return ho


def init_app(hwr):
    """ Initializes the application instance """
    global APP

    if not APP:
        APP = Application(hwr)

    return APP


def get_app():
    """ Returns the application instance """

    if not APP:
        msg = "Could not get Application object, call to init_app probably missing"
        logging.error(msg)
        sys.exit(-1)

    return APP
