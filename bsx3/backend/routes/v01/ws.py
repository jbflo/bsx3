import logging
from bsx3.backend.core import App

sio = App().SIO


@sio.on("connect")
def connect(sid, environ):
    logging.debug("Websocket connected %s", sid)


@sio.on("chat message")
async def message(sid, data):
    print("message ", data)
    await sio.emit("repy", room=sid)


@sio.on("disconnect")
def disconnect(sid):
    print("Websocket disconnected %s" % sid)
