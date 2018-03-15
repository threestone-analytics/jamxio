"""
    First iteration of the new backend for JAMX.io page
"""
import json
from flask import Flask
from flask import render_template, request
from flask import Response

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('base.html')


@app.route('/data/', methods=['GET'])
def api_hello():
    data = request.args.get('data')
    print (data)

    js = json.dumps(data)

    resp = Response(js, status=200, mimetype='application/json')
    resp.headers['Link'] = 'http://luisrei.com'

    return resp


