"""
[Name] BeamInfo

[Description]
BeamInfo hardware object is used to define final beam size and shape.
It can include aperture, slits and/or other beam definer (lenses or other eq.)

[Emited signals]
beamInfoChanged
beamPosChanged

[Included Hardware Objects]
-----------------------------------------------------------------------
| name            | signals          | functions
-----------------------------------------------------------------------
 aperture_hwobj	    apertureChanged
 slits_hwobj
 beam_definer_hwobj
-----------------------------------------------------------------------
"""

import logging
from HardwareRepository.BaseHardwareObjects import Equipment


class ALBABeamInfo(Equipment):
    """
    Description:
    """

    def __init__(self, *args):
        """
        Descrip. :
        """
        Equipment.__init__(self, *args)

        self.aperture_hwobj = None
        self.slits_hwobj = None
        self.beam_definer_hwobj = None

        self.beam_size_slits = None
        self.beam_size_aperture = None
        self.beam_size_definer = None
        self.beam_position = None
        self.beam_info_dict = None
        self.default_beam_divergence = None

    def init(self):
        """
        Descript. :
        """
        self.beam_size_slits = [9999, 9999]
        self.beam_size_aperture = [9999, 9999]
        self.beam_size_definer = [9999, 9999]

        self.beam_position = [0, 0]
        self.beam_info_dict = {}

        self.beam_width_chan = self.getChannelObject("BeamWidth")
        self.beam_height_chan = self.getChannelObject("BeamHeight")
        self.beam_posx_chan = self.getChannelObject("BeamPositionHorizontal")
        self.beam_posy_chan = self.getChannelObject("BeamPositionVertical")

        self.beam_height_chan.connectSignal("update", self.beam_height_changed)
        self.beam_width_chan.connectSignal("update", self.beam_width_changed)
        self.beam_posx_chan.connectSignal("update", self.beam_posx_changed)
        self.beam_posy_chan.connectSignal("update", self.beam_posy_changed)

        # divergence can be added as fixed properties in xml
        default_beam_divergence_vertical = None
        default_beam_divergence_horizontal = None

        try:
            default_beam_divergence_vertical = int(
                self.getProperty("beam_divergence_vertical")
            )
            default_beam_divergence_horizontal = int(
                self.getProperty("beam_divergence_horizontal")
            )
        except BaseException:
            pass

        self.default_beam_divergence = [
            default_beam_divergence_horizontal,
            default_beam_divergence_vertical,
        ]

    def connectNotify(self, *args):
        self.evaluate_beam_info()
        self.emit_beam_info_change()

    def get_beam_divergence_hor(self):
        """
        Descript. :
        """
        return self.default_beam_divergence[0]

    def get_beam_divergence_ver(self):
        """
        Descript. :
        """
        return self.default_beam_divergence[1]

    def get_beam_position(self):
        """
        Descript. :
        Arguments :
        Return    :
        """
        self.beam_position = (
            self.beam_posx_chan.getValue(),
            self.beam_posy_chan.getValue(),
        )
        return self.beam_position

    def get_slits_gap(self):
        return None, None

    def set_beam_position(self, beam_x, beam_y):
        """
        Descript. :
        Arguments :
        Return    :
        """
        self.beam_position = (beam_x, beam_y)

    def get_beam_info(self):
        """
        Descript. :
        Arguments :
        Return    :
        """
        return self.evaluate_beam_info()

    def get_beam_size(self):
        """
        Descript. : returns beam size in millimeters
        Return   : list with two integers
        """
        self.evaluate_beam_info()
        return self.beam_info_dict["size_x"], self.beam_info_dict["size_y"]

    def get_beam_shape(self):
        """
        Descript. :
        Arguments :
        Return    :
        """
        return self.beam_info_dict["shape"]

    def beam_width_changed(self, value):
        self.beam_info_dict["size_x"] = value
        self.emit_beam_info_changed()

    def beam_height_changed(self, value):
        self.beam_info_dict["size_y"] = value
        self.emit_beam_info_changed()

    def beam_posx_changed(self, value):
        self.beam_position["x"] = value
        self.emit_beam_info_changed()

    def beam_posy_changed(self, value):
        self.beam_position["y"] = value
        self.emit_beam_info_changed()

    def evaluate_beam_info(self):
        """
        Descript. : called if aperture, slits or focusing has been changed
        Return    : dictionary,{size_x:0.1, size_y:0.1, shape:"rectangular"}
        """

        self.beam_info_dict["size_x"] = self.beam_width_chan.getValue() / 1000.0
        self.beam_info_dict["size_y"] = self.beam_height_chan.getValue() / 1000.0
        self.beam_info_dict["shape"] = "rectangular"

        return self.beam_info_dict

    def emit_beam_info_change(self):
        """
        Descript. :
        Arguments :
        Return    :
        """
        logging.getLogger("HWR").debug(" emitting beam info")
        if (
            self.beam_info_dict["size_x"] != 9999
            and self.beam_info_dict["size_y"] != 9999
        ):
            self.emit(
                "beamSizeChanged",
                ((self.beam_info_dict["size_x"], self.beam_info_dict["size_y"]),),
            )
            self.emit("beamInfoChanged", (self.beam_info_dict,))


def test_hwo(hwo):
    print hwo.get_beam_info()
    print hwo.get_beam_position()
