# -*- coding: utf-8 -*-
import yaml
import logging
import time

from bsx3.backend.core.base import Singleton
from bsx3.backend.core.blcontrol.hwr import HWRProtocolHandler


class BLControl(metaclass=Singleton):
    def __init__(self, fpath):
        self._fpath = fpath
        self._config = None
        self._protocol_handlers_map = {"HWR": HWRProtocolHandler}
        self._protocol_handlers = {}
        self._group_map = {}
        self._co_map = {}
        self._load_stats = {}

        with open(fpath, "r") as f:
            try:
                self._config = yaml.safe_load(f)
            except yaml.YAMLError as ex:
                logging.exception(str(ex))

        self._parse_protocols()
        self._parse_control_objects()

        self.get_group("shutters")[0].data()
        self.print_stats()

    def _parse_protocols(self):
        for p in self._config.get("protocols", []):
            try:
                pid = p.get("id")
                pcls = self._protocol_handlers_map.get(p.get("type"))
                params = p.get("params")
            except KeyError as ex:
                msg = (
                    "[BLCONTROL] Config %s, 'protocols' section missing key, error: %s"
                )
                msg = msg % (self._fpath, str(ex))
                logging.error(msg)

            if not pid in self._protocol_handlers and pcls:
                self._protocol_handlers[pid] = pcls(**params)

    def _parse_control_objects(self):
        for co_conf in self._config.get("control_objects", []):
            try:
                pid = co_conf.get("protocol_id")
                attr = co_conf.get("attr")
                group = co_conf.get("group")
                address = co_conf.get("address")
            except KeyError as ex:
                msg = "[BLCONTROL] Config %s, 'control_objects' section missing key, error: %s"
                msg = msg % (self._fpath, str(ex))
                logging.error(msg)

            t0 = time.time()

            if pid in self._protocol_handlers:
                co = self._protocol_handlers[pid].get_control_object(**co_conf)
                if co:
                    self._co_map[attr] = co

                    if group in self._group_map:
                        self._group_map[group].append(attr)
                    else:
                        self._group_map[group] = [attr]

            self._load_stats[address] = {
                "loaded": "True" if co else "False",
                "load_time": time.time() - t0,
            }

            self._load_stats[address].update(co_conf)

    def print_stats(self):
        print("{:<20} {:<15} {:<10}".format("Name", "Loaded", "Load time (s)"))
        acumt = 0

        for _k, v in self._load_stats.items():
            name = v["name"]
            loaded = v["loaded"]
            ltime = round(v["load_time"], 3)
            acumt += ltime

            print("{:<20} {:<15} {:<10}".format(name, loaded, ltime))

        print("Loaded %s objects in %s (s)" % (len(self._load_stats), acumt))

    def get_group(self, key):
        group = self._group_map[key]
        return [self._co_map[co_attr] for co_attr in group]

    def get(self, key):
        return self._co_map[key]
