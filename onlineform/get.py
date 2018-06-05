import gspread
from oauth2client.service_account import ServiceAccountCredentials
import json
from time import sleep
import sqlite3
import googlemaps
from keys import *

# google sheet credential
scope = ['https://spreadsheets.google.com/feeds']
credentials = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scope)
gc = gspread.authorize(credentials)

# db setup
conn = sqlite3.connect('../db.sqlite')
c = conn.cursor()

# google map credential
gmaps = googlemaps.Client(key=google_map_key)

if __name__ == "__main__":
    wks = gc.open("Environmental justice Report (Responses)").sheet1
    records = wks.get_all_records()
    for r in records:
        try:
            location = gmaps.geocode(r["Where is the issue? Provide street, municipality, and state (don't include your personal information)"])
            lat = location[0]['geometry']['location']['lat']
            lng = location[0]['geometry']['location']['lng']
            geojson = {
                "type" : "Feature",
                "properties" : { "id" : 0 },
                "geometry" : {
                    "type" : "Point",
                    "coordinates" : [lat, lng],
                    }
                }
            c.execute("insert into onlineform (data, geojson) values (?, ?)", [json.dumps(r), json.dumps(geojson)])
        except:
            c.execute("insert into onlineform (data) values (?)", [json.dumps(r)])
        print(r)
        conn.commit()
