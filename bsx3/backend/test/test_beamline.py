# -*- coding: utf-8 -*-
""" Tests for beamline routes """

base_prefix = "/bsxcube/api/v0.1/beamline"

def test_get_shutters(client):
    """ Tests get_shutters """
    resp = client.post(base_prefix + "/shutters")
    assert resp.status_code == 200


def test_get_energy(client):
    """ Tests get_energy """
    resp = client.post(base_prefix + "/energy")
    assert resp.status_code == 200


def test_get_machine_info(client):
    """ Tests get_beamline """
    resp = client.post(base_prefix + "/machine-info")
    assert resp.status_code == 200


def test_get_beamline(client):
    """ Tests get_beamline """
    resp = client.get(base_prefix + "/beamline")
    assert resp.status_code == 200
