# -*- coding: utf-8 -*-
""" Tests for beamline routes """


def test_get_shutters(client):
    """ Tests get_shutters """
    resp = client.post("/beamline/shutters")
    assert resp.status_code == 200


def test_get_energy(client):
    """ Tests get_energy """
    resp = client.post("/beamline/energy")
    assert resp.status_code == 200


def test_get_machine_info(client):
    """ Tests get_beamline """
    resp = client.post("/beamline/machine-info")
    assert resp.status_code == 200


def test_get_beamline(client):
    """ Tests get_beamline """
    resp = client.post("/beamline/beamline")
    assert resp.status_code == 200
