# -*- coding: utf-8 -*-
import functools

from pydantic import ValidationError
from flask import Blueprint, request, jsonify

from flask_apispec import use_kwargs, marshal_with


class Api(Blueprint):
    def __init__(self, *args, **kwargs):
        Blueprint.__init__(self, *args, **kwargs)

    # pylint: disable=arguments-differ
    def route(self, rule, request_model=None, response_model=None, **options):
        def decorator(f):
            if request_model:
                f = use_kwargs(request_model.Schema(strict=True).fields)(f)

            if response_model:
                f = marshal_with(response_model.Schema(strict=True))(f)
                # f = decorator_apply_response_model(response_model)(f)

            endpoint = options.pop("endpoint", f.__name__)
            self.add_url_rule(rule, endpoint, f, **options)

            return f

        return decorator


def decorator_apply_response_model(response_model=None):
    def decorator_apply_response_model(func):
        @functools.wraps(func)
        def wrapper_apply_response_model(*args):
            return func(response_model(args))

        return wrapper_apply_response_model

    return decorator_apply_response_model


def with_parse_request(request_model=None, response_model=None):
    def decorator_with_request_model(func):
        @functools.wraps(func)
        def wrapper_with_request_model(*args, **kwargs):
            resp = None

            if request_model and response_model:
                valid, data, resp = parse_request(request, request_model)

                if valid:
                    resp = create_response(func(data))

            elif request_model:
                valid, data, resp = parse_request(request, request_model)

                if valid:
                    resp = func(data)

            elif response_model:
                resp = create_response(func(*args, **kwargs))

            return resp

        return wrapper_with_request_model

    return decorator_with_request_model


def _parse_model(data, model):
    try:
        valid, data, message = True, model.parse_obj(data), "OK"
    except ValidationError as e:
        valid, data, message = False, None, e.errors()

    return valid, data, message


def parse_request(r, model):
    if not r.is_json:
        valid, data, message = (False, None, "Request not on JSON format")
    else:
        valid, data, message = _parse_model(r.json, model)

    resp = jsonify({"valid": valid, "message": message})
    resp.status_code = 200 if valid else 422

    return valid, data, resp


def create_response(data):
    resp = jsonify(data.dict())
    resp.status_code = 200
    return resp
