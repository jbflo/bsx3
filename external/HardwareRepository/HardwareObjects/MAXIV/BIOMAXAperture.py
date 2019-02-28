import logging
from HardwareRepository import HardwareRepository
from MicrodiffAperture import MicrodiffAperture


class BIOMAXAperture(MicrodiffAperture):

    POSITIONS = ("BEAM", "OFF", "PARK")

    def __init__(self, *args):
        MicrodiffAperture.__init__(self, *args)
        self.aperture_position = None

    def init(self):
        MicrodiffAperture.init(self)
        self.aperture_position = self.addChannel(
            {"type": "exporter", "name": "AperturePosition"}, "AperturePosition"
        )
        if self.aperture_position is not None:
            self.connect(self.aperture_position, "update", self.position_changed)

        self.get_diameter_list = self.getPredefinedPositionsList
        self.set_position = self.moveToPosition

    def moveToPosition(self, positionName):
        logging.getLogger().debug(
            "%s: trying to move %s to %s:%f",
            self.name(),
            self.motor_name,
            positionName,
            self.predefinedPositions[positionName],
        )
        if positionName == "Outbeam":
            self.aperture_position.setValue("OFF")
        else:
            try:
                self.move(self.predefinedPositions[positionName], wait=True, timeout=10)
            except BaseException:
                logging.getLogger("HWR").exception(
                    "Cannot move motor %s: invalid position name.", str(self.userName())
                )
            if self.aperture_position.getValue() != "BEAM":
                self.aperture_position.setValue("BEAM")

    def get_position_list(self):
        return BIOMAXAperture.POSITIONS

    def position_changed(self, position):
        self.emit("positionChanged", position)  # self.aperture_position.getValue())
