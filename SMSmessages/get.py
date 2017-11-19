import gspread
from oauth2client.service_account import ServiceAccountCredentials
import json
from time import sleep
import requests

scope = ['https://spreadsheets.google.com/feeds']
credentials = ServiceAccountCredentials.from_json_keyfile_name('keys.json', scope)
gc = gspread.authorize(credentials)

title = ['time', 'name', 'text', 'url']

while (True):
    try:
        wks = gc.open("Data").sheet1
    except:
        break
    values = wks.get_all_values()
    data = dict()
    for item in values:
        if not item[0]:
            continue
        for i in range(4):
            data[title[i]] = item[i]
        print(data)
        requests.post('http://10.142.189.43:8080/twitterfeed', data=data)
        sleep(5)
    sleep(10)
