# -*- coding: utf-8 -*-
import functools

from pydantic import ValidationError
from flask import Blueprint, request, jsonify

class Api(Blueprint):
    def __init__(self, *args, **kwargs):
        Blueprint.__init__(self, *args, **kwargs)

    def route(self, rule, request_model=None, response_model=None, **options):
        def decorator(f):
            f = with_parse_request(request_model, response_model)(f)
            endpoint = options.pop("endpoint", f.__name__)
            self.add_url_rule(rule, endpoint, f, **options)

            return f

        return decorator      

def with_parse_request(request_model, response_model=None):
    def decorator_with_request_model(func):
        @functools.wraps(func)
        def wrapper_with_request_model(*args, **kwargs):
            if request_model and response_model:
                valid, data, resp = parse_request(request, request_model)

                if not valid:
                    return resp
                else:
                    return create_response(func(data), response_model)

            elif request_model:
                valid, data, resp = parse_request(request, request_model)

                if not valid:
                    return resp
                else:
                    func(data)

            elif response_model:
                return create_response(func(), response_model)

        return wrapper_with_request_model
    return decorator_with_request_model


def _parse_model(data, model):
    try:
        valid, data, message = True, model.parse_obj(data), "OK"
    except ValidationError as e:
        valid, data, message = False, None, e.errors()

    return valid, data, message


def parse_request(request, model):
    if not request.is_json:
        valid, data, message = (False, None, "Request not on JSON format")
    else:
        valid, data, message = _parse_model(request.json, model)

    resp = jsonify({ "valid": valid, "message": message })
    resp.status_code = 200 if valid else 422
    
    return valid, data, resp


def create_response(data, model):
    valid, _d, message = _parse_model(data, model)

    if valid:
        resp = jsonify(data)
        resp.status_code = 200
    else:
        resp = jsonify(message)
        resp.status_code = 422

    return resp