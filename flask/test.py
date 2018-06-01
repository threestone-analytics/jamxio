"""
    First iteration of the new backend for JAMX.io page
"""
import json
import os
from flask import Flask
from flask import render_template, request
from flask import Response

app = Flask(__name__, static_url_path='')
APP_ROOT = os.path.dirname(os.path.abspath(__file__))   # refers to application_top

@app.route("/")
def hello():
    return render_template('base.html')


@app.route('/api/', methods=['GET'])
def api_hello():
    data = request.args.get('data')
    if not os.path.exists(os.path.join(APP_ROOT, 'data/{}'.format(data))):
        return ("Bad request")

    with open(os.path.join(APP_ROOT, 'data/{}'.format(data))) as f:
        js = json.load(f)
    resp = Response(json.dumps(js), status=200, mimetype='application/json')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@app.route('/post/', methods=['POST'])
def api_post():
    resp = Response('Pong', status=200, mimetype='application/json')
    #  resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

