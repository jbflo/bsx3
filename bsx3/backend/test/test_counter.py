# -*- coding: utf-8 -*-
""" Tests for counter routes """

base_prefix = "/bsxcube/api/v0.1/counter"

def test_increment(client):
    """ Tests increment count """
    resp = client.post(base_prefix + "/get-count")
    assert resp.status_code == 200
    count_before = (resp.get_json()).get("counter")

    resp = client.post(base_prefix + "/increment")
    assert resp.status_code == 200

    resp = client.post(base_prefix + "/get-count")
    assert resp.status_code == 200
    count_after = (resp.get_json()).get("counter")

    assert count_after == (count_before + 1)


def test_decrement(client):
    """ Tests decrement count """
    resp = client.post(base_prefix + "/get-count")
    assert resp.status_code == 200
    count_before = (resp.get_json()).get("counter")

    resp = client.post(base_prefix + "/decrement")
    assert resp.status_code == 200

    resp = client.post(base_prefix + "/get-count")
    assert resp.status_code == 200
    count_after = (resp.get_json()).get("counter")

    assert count_after == (count_before - 1)
