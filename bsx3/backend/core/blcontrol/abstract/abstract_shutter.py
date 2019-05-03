import abc

from enum import IntEnum, unique


@unique
class ShutterState(IntEnum):
    """
    Defines the valid Shutter states
    """

    UNKOWN = 0
    CLOSED = 1
    OPEN = 2
    MOVING = 3
    AUTOMATIC = 4
    DISABLED = 5
    FAULT = -1
    ERROR = -2


class AbstractShutter:
    """
    Defines the common interface for shutters
    """

    STATE = ShutterState
    OPEN_TEXT = "OPEN"
    CLOSE_TEXT = "CLOSE"

    @abc.abstractmethod
    def value_changed(self, value):
        """ Emitted on value change

        Args:
            value: (int)

        Emitts:
            shutterStateChanged: (str) state name
        """
        return

    @abc.abstractmethod
    def open(self, wait=False, timeout=None):
        """Opens shutter"""
        return

    @abc.abstractmethod
    def close(self, wait=False, timeout=None):
        """Closes shutter"""
        return

    @abc.abstractmethod
    def message(self, wait=False, timeout=None):
        """Closes shutter"""
        return

    @staticmethod
    def open_text():
        """Open shutter action text"""
        return AbstractShutter.OPEN_TEXT

    @staticmethod
    def close_text():
        """Close shutter action text"""
        return AbstractShutter.CLOSE_TEXT

    @abc.abstractmethod
    def msg(self):
        """Short description of current state"""

    @abc.abstractmethod
    def state(self):
        """
        Returns:
           str: The current state name
        """
        return

    @abc.abstractmethod
    def is_valid(self):
        """ Checks if the shutter is in one of its predefined states """
        return

    @abc.abstractmethod
    def set_state(self, state, wait=False, timeout=None):
        """
        Args:
            state: (enum) The state to transition to
            wait: (bool) Wait for state transition to complete before returning
            timeout: (float) Raises TimeoutException if transition takes longer
                     than timeout seconds
        """
        return
