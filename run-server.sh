#!/usr/bin/env bash

export HWR_ROOT='./external/'

exec ./bsx3/backend/daiquiri/run-server.py \
     --config=./bsx3/backend/daiquiri/config \
     --static-folder=./bsx3/frontend/public
