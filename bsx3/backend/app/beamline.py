# -*- coding: utf-8 -*-
""" Utileties for accessing beamline hardware"""
from bsx3.backend.app import App


def get_shutters():
    """
    Retreives dictionary represenation of all shutters

    Returns:
        dict: { name : {
                        name: str
                        state: IntEnum
                        is_valid: bool
                       }
              }
    """
    shutters = {}

    for role, shutter in App().beamline.get_shutters().items():
        shutters[role] = {
            "name": role.title().replace("_", " "),
            "id": role,
            "state": shutter.state(),
            "open_text": shutter.open_text(),
            "close_text": shutter.close_text(),
            "msg": shutter.msg(),
            "is_valid": shutter.is_valid(),
        }

    return shutters


def close_shutter(name):
    """Closes shutter with name <name>

    Args:
        name (str): shutter name

    Returns:
        None
    """
    shutter = App().beamline.get_shutters().get(name, None)

    if shutter:
        shutter.set_state(shutter.STATE.CLOSED)


def open_shutter(name):
    """Opens shutter with name <name>

    Args:
        name (str): shutter name

    Returns:
        None
    """
    shutter = App().beamline.get_shutters().get(name, None)

    if shutter:
        shutter.set_state(shutter.STATE.OPEN)


def toggle_shutter_state(name):
    """Toggle open/close shutter with name <name>

    Args:
        name (str): shutter name

    Returns:
        None
    """
    shutter = App().beamline.get_shutters().get(name, None)

    if shutter.state() == shutter.STATE.OPEN.name:
        close_shutter(name)
    elif shutter.state() == shutter.STATE.CLOSED.name:
        open_shutter(name)
    else:
        raise RuntimeWarning("Shutter %s is in %s state" % (name, shutter.state()))

    return get_shutters().get(name, None)


def get_energy():
    """ Returns a dictionary representation of the energy HardwareObject

    Returns:
        dict: {
            value: (float) KeV
            wavelength: (float) m
            state: (bool) the current state
            tunable (bool) True if the energy can be changes false otherwise
            energy_limits: ([(int), (int)]) uper and lower energy limits if tunable
            wavelength_limits: ([(int), (int)]) uper and lower energy limits if tunable
        }
    """
    energy = App().beamline.energy

    return {
        "value": energy.get_current_energy(),
        "energy": energy.get_current_energy(),
        "wavelength": energy.get_current_wavelength(),
        "state": energy.is_ready(),
        "tunable": energy.can_move_energy(),
        "energy_limits": energy.get_energy_limits(),
        "wavelength_limits": energy.get_wavelength_limits(),
    }


def set_energy(energy):
    """ Set energy to <energy>

    Args:
        energy (float): Energy in KeV to change to

    Returns:
        None
    """
    energy = App().beamline.energy
    energy.set_energy(energy)


def set_wavelength(wl):
    """ Set wavelength to <wl>

    Args:
        energy (float): Wavelength in m to change to

    Returns:
        None
    """
    energy = App().beamline.energy
    energy.move_wavelength(wl)


def get_machine_info():
    """ Returns dictionary representation of MachineInfo hardware object

        Returns:
            dict: {
                current: (str) the ring current
                message: (str) operator message
            }
    """
    machine_info = App().beamline.machine_info

    return {"current": machine_info.getCurrent(), "message": machine_info.getMessage()}


def get_beamline():
    """ Returns dictiornary represenation of all beamline attributes

    Returns:
        dict: {
            shutters: (dict) see get_shutters
            energy: (dict) see get_energy
            machine_info: (dict) see get_machine_info
        }
    """

    return {
        "shutters": get_shutters(),
        "energy": get_energy(),
        "machine_info": get_machine_info(),
    }
