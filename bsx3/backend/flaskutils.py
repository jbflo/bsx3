# -*- coding: utf-8 -*-
from flask import Blueprint
from flask_apispec import use_kwargs, marshal_with


class Api(Blueprint):
    def __init__(self, *args, **kwargs):
        Blueprint.__init__(self, *args, **kwargs)

    # pylint: disable=arguments-differ, dangerous-default-value
    def route(self, rule, request_model=None, response_model=None, errors={}, **options):
        def decorator(f):
            if request_model:
                f = use_kwargs(request_model)(f)

            if response_model:
                f = marshal_with(response_model)(f)

            endpoint = options.pop("endpoint", f.__name__)
            self.add_url_rule(rule, endpoint, f, **options)

            for code, schema in errors.items():
                f = marshal_with(schema, code=code)(f)

            return f

        return decorator
