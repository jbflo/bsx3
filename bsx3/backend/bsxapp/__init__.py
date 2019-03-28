# -*- coding: utf-8 -*-
""" Application wide functionality"""
import sys
import logging

# Application instance
APP = None

HOMAP = [
    {"attr": "auth", "role": "ldaplogin", "required": True},
    {"attr": "beamline", "role": "beamline", "required": True},
]

class Application():
    """ Encapsulates all application wide data """
    COUNTER = 1
    _HWR = None

    def __init__(self, hwr):
        Application._HWR = hwr
        self.auth = None
        self.beamline = None

        for ho in HOMAP:
            setattr(self, ho["attr"], Application.get_ho(ho["role"], ho["required"]))

    @staticmethod
    def get_ho(name, required=True):
        if not Application._HWR:
            logging.error("HardwareRepository not initialized")
            sys.exit(-1)

        ho = Application._HWR.getHardwareObject(name)

        if not ho and required:
            logging.error("[APP]: No HardwareObject with name %s", name)
            sys.exit(-1)
        elif not ho and not required:
            logging.error("[APP]: No HardwareObject with name %s", name)
        else:
            logging.info("[APP]: Found HardwareObject %s", name)

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
