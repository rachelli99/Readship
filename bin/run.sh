#!/bin/bash

export FLASK_APP=read_ship
export FLASK_ENV=development
export GOOGLE_APPLICATION_CREDENTIALS="service.json"

flask run --host 0.0.0.0 --port 8000
