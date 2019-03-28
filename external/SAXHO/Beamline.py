import logging
import sys

from HardwareRepository.BaseHardwareObjects import HardwareObject

class Beamline(HardwareObject):
    def __init__(self, name):
        HardwareObject.__init__(self, name)
        self._shutters = {}
        self.energy = None
        self.machine_info = None


    def init(self):
        try:
            for role in self["shutters"].getRoles():
                self._shutters[role] = self["shutters"].getObjectByRole(role)
        except KeyError:
            pass

        roles = ["energy", "machine_info"]

        self.energy = self.getObjectByRole("energy")
        self.machine_info = self.getObjectByRole("machine_info")

        optional = self.getProperty("optional").strip().split(",")

        for role in roles:
            ho = self.getObjectByRole(role)

            if not ho and role not in optional:
                logging.error("No HardwareObject with role %s", role)
                sys.exit(-1)
            elif not ho and role in optional:
                logging.error("No HardwareObject with role %s", role)
            else:
                logging.info("Nound HardwareObject %s", role)

            setattr(self, role, ho)


    def get_shutters(self):
        return self._shutters
