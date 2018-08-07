#import gspread
from oauth2client.service_account import ServiceAccountCredentials
import json
from time import sleep
#import sqlite3
import googlemaps
from keys import *
import csv

# google sheet credential
#scope = ['https://spreadsheets.google.com/feeds']
#credentials = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scope)
#gc = gspread.authorize(credentials)

# db setup
#conn = sqlite3.connect('../db.sqlite')
#c = conn.cursor()

# google map credential
gmaps = googlemaps.Client(key=google_map_key)

if __name__ == "__main__":
    #wks = gc.open("Environmental justice Report (Responses)").sheet1
    #records = wks.get_all_records()
    '''
    f = open('reports.csv', encoding='latin-1', mode='r')
    reader = csv.DictReader(f)
    f.close()
    records_list = [ ]
    for r in reader:
        try:
            location = gmaps.geocode(r["Where is the issue? Provide street, municipality, and state (don't include your personal information)"])
            lat = location[0]['geometry']['location']['lat']
            lng = location[0]['geometry']['location']['lng']
            r['location'] = [lat, lng]
            records_list.append(r)
            print('record retrieve!')
        except:
            print('bad record')
        '''
    f = open('data.json', encoding='latin-1', mode='r')
    records = json.load(f)
    f.close()
    records_list = [ ]
    for r in records:
        lat = r['location'][0]
        lng = r['location'][1]
        if lat < 33 and lat > 14 and lng > - 118 and lng < - 87:
            records_list.append(r)
    geojson = {
        "type" : "FeatureCollection",
        "features" : [
            {
                  "type" :
                "Feature",
                "geometry" : {
                    "type" : "Point",
                    "coordinates" : [r['location'][1], r['location'][0]],
                    },
                "properties" : r,
                } for r in records_list
            ]
        }
    #with open('data.json', encoding='latin-1', mode='w') as f:
    #    json.dump(records_list, f)
    with open('data.geojson', encoding='latin-1', mode='w') as f:
        json.dump(geojson, f)
        
