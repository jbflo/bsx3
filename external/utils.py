# -*- coding: utf-8 -*-
import os
import sys
import logging


def init_hwr_paths():
    # To make it possible to import HardwareRepository if not
    # installed globally
    HWR_ROOT = os.environ.get("HWR_ROOT", None)

    if HWR_ROOT:
        logging.info("Using HardwareRepository from %s", HWR_ROOT)
        sys.path.insert(0, HWR_ROOT)
    else:
        try:
            from HardwareRepository import HardwareRepository as hwr
            logging.info("Using system HardwareRepository from %s", hwr.__file__)
        except ImportError:
            HWR_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__)))
            sys.path.insert(0, HWR_ROOT)
            logging.info("Using HardwareRepository from %s", HWR_ROOT)

    dpath = os.path.abspath(os.path.join(os.path.dirname(__file__)))
    os.environ["CUSTOM_HARDWARE_OBJECTS_PATH"] = os.path.join(dpath, "HardwareObjects")


def get_config_dir():
    return os.path.abspath(os.path.join(os.path.dirname(__file__), "/config"))
