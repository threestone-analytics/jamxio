import requests
import json

url = 'http://10.142.37.156:3000'
f = open("data.json", 'r')
d = json.load(f)
requests.post(url, data=d)
