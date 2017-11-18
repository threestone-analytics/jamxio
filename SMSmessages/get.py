import gspread
from oauth2client.service_account import ServiceAccountCredentials
import json

scope = ['https://spreadsheets.google.com/feeds']
credentials = ServiceAccountCredentials.from_json_keyfile_name('keys.json', scope)
gc = gspread.authorize(credentials)
wks = gc.open("Data").sheet1
values = wks.get_all_values()
print(values)
#data = dict(values)
'''
title = { 'Time', 'Sender Address', 'Sender Name', 'Message', 'First Attachment Name', 'First Attachment' }

for item in values:
    for i in range(6):
        data[title[i]] = item[i]
'''
#print(data)
#f = open("data.json", "w")
#f.write(json.dumps(values))
#print(values)

