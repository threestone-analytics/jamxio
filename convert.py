import json
import os
import sys
import googlemaps
from keys import google_map_key

# google map credential
gmaps = googlemaps.Client(key=google_map_key)

def convert (feed):
    json_f = open(feed, 'r+')
    reader = json.load(json_f)
    for item in reader:
        place = item['Entidad']
        location = gmaps.geocode(place)
        lat = location[0]['geometry']['location']['lat']
        lng = location[0]['geometry']['location']['lng']
        item['location'] = [lat, lng]
    json.dump(reader, json_f)

if __name__ == "__main__":
    convert('test.json')
