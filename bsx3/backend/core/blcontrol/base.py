# -*- coding: utf-8 -*-
import abc
import dataclasses
import logging
import importlib


from marshmallow.exceptions import ValidationError


class ProtocolHandler:
    @abc.abstractmethod
    def get_control_object(self):
        pass

    def get_wrapper(self, wrapper_module_path):
        try:
            mpath, _cls_name = wrapper_module_path.rsplit(".", 1)
            package = None

            if mpath[0] == ".":
                package = __package__

            module = importlib.import_module(mpath, package)
            _cls = getattr(module, _cls_name)
        except (ValueError, ModuleNotFoundError, ImportError, AttributeError) as ex:
            logging.exception(str(ex))
            _cls = None

        return _cls


class Wrapper:
    def __init__(self, obj, name, address, attr):
        self.__class__ = type(
            obj.__class__.__name__, (self.__class__, obj.__class__), {}
        )
        self.__dict__ = obj.__dict__

        self._obj = obj
        self.name = name
        self.address = address
        self.id = attr

    def __repr__(self):
        return "<%s Wrapps (%s)>" % (self.__class__.__name__, self._obj.__repr__())

    @abc.abstractmethod
    def data(self):
        pass

    def asdict(self):
        data = self.data()
        ddict = dataclasses.asdict(data)

        try:
            data.Schema(strict=True).validate(ddict)
        except ValidationError as ex:
            raise type(ex)(str(ex) + " data is %s: " % str(ddict))

        return ddict
