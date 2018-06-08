import json
import os
import sys
import googlemaps
from keys import google_map_key

# google map credential
gmaps = googlemaps.Client(key=google_map_key)

def convert (feed):
    json_f = open(feed, 'r')
    reader = json.load(json_f)
    for item in reader:
        try:
            place = item['DirecciÃ³n']
            location = gmaps.geocode(place)
            lat = location[0]['geometry']['location']['lat']
            lng = location[0]['geometry']['location']['lng']
            item['location'] = [lat, lng]
            print('success converted!')
        except:
            print('no location found...')
    json_f.close()
    out_f = open(feed, encoding='latin-1', mode='w')
    json.dump(reader, out_f)

if __name__ == "__main__":
    convert('test.json')
