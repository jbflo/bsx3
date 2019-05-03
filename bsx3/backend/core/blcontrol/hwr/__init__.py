# -*- coding: utf-8 -*-
import os
import logging
import sys

from bsx3.backend.core.blcontrol.base import Wrapper, ProtocolHandler
from bsx3.backend.models import EnergyModel, MachineInfoModel, ShutterModel
from bsx3.backend.core.blcontrol.abstract.abstract_shutter import AbstractShutter

# pylint: disable=import-error
from HardwareRepository import HardwareRepository as hwr


class HWRProtocolHandler(ProtocolHandler):
    def __init__(self, path=None):
        path = path.format(CWD=os.getcwd())
        self._hwr = hwr.getHardwareRepository(path)
        self._hwr.connect()
        hwr_logger = logging.getLogger("HWR")
        hwr_logger.setLevel(logging.DEBUG)

    def get_control_object(
        self, address=None, wrapper=None, name=None, attr=None, **kwargs
    ):
        ho = self._hwr.getHardwareObject(address)

        if not ho:
            logging.error("[BLCONTROL]: No HardwareObject with name %s", name)
        else:
            logging.info("[BLCONTROL]: Found HardwareObject %s", name)

        if wrapper and ho:
            wrapper_cls = self.get_wrapper(wrapper)

            if wrapper_cls:
                ho = wrapper_cls(ho, name, address, attr)
            else:
                ho = None
                logging.info("[BLCONTROL]: Could not load wrapper from %s", wrapper)
                sys.exit(-1)
        else:
            ho = None

        return ho


class HWRShutter(Wrapper, AbstractShutter):
    def __init__(self, *args):
        Wrapper.__init__(self, *args)

    def data(self):
        return ShutterModel(
            **{
                "name": self.name,
                "id": self.id,
                "state": self._obj.state(),
                "open_text": self._obj.open_text(),
                "close_text": self._obj.close_text(),
                "msg": self._obj.msg(),
                "is_valid": self._obj.is_valid(),
            }
        )

    def toggle_shutter_state(self):
        if self._obj.state() == self._obj.STATE.OPEN.name:
            self._obj.close()
        elif self._obj.state() == self._obj.STATE.CLOSED.name:
            self._obj.open()

        return self.asdict()


class HWREnergy(Wrapper):
    def __init__(self, *args):
        Wrapper.__init__(self, *args)

    def data(self):
        return EnergyModel(
            **{
                "value": self._obj.get_current_energy(),
                "energy": self._obj.get_current_energy(),
                "wavelength": self._obj.get_current_wavelength(),
                "state": self._obj.is_ready(),
                "tunable": self._obj.can_move_energy(),
                "energy_limits": self._obj.get_energy_limits(),
                "wavelength_limits": self._obj.get_wavelength_limits(),
            }
        )


class HWRMachineInfo(Wrapper):
    def __init__(self, *args):
        Wrapper.__init__(self, *args)

    def data(self):
        return MachineInfoModel(
            **{"current": self._obj.getCurrent(), "message": self._obj.getMessage()}
        )
