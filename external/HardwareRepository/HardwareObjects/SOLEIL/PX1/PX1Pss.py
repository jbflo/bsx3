# -*- coding: utf-8 -*-
import logging
from HardwareRepository.BaseHardwareObjects import Device


class PX1Pss(Device):

    states = {0: "not ready", 1: "ready"}

    def init(self):
        self.state_chan = self.getChannelObject("state")
        self.state_chan.connectSignal("update", self.value_changed)

    def value_changed(self, value):
        state = self.getState(value)
        logging.getLogger("HWR").debug("state changed. value is %s" % state)
        self.emit("stateChanged", (state,))

    def getState(self, value=None):
        if value is None:
            value = self.state_chan.getValue()

        if value in self.states:
            self.state = self.states[value]
        else:
            self.state = "unknown"

        return self.state


def test_hwo(hwo):
    print hwo.getState()
