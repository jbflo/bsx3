# -*- coding: utf-8 -*-
""" Test for root routes """

base_prefix = "/bsxcube/api/v0.1/"

def test_home(client):
    """Test root route"""
    resp = client.get(base_prefix)
    assert resp.status_code == 200
    assert 'HOME' in resp.data.decode()


