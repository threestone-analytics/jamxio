#!/bin/bash
export FLASK_APP=./flask/test.py
export FLASK_DEBUG=1
source $(pipenv --venv)/bin/activate
flask run
