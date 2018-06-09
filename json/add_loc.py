import json
import os
import sys
import googlemaps
from keys import google_map_key

# google map credential
gmaps = googlemaps.Client(key=google_map_key)

def convert (feed):
    feed = feed + '.json'
    json_f = open(feed, 'r')
    reader = json.load(json_f)
    not_founded = [ ]
    for item in reader:
        place = item['EMPRESA']
        try:
            location = gmaps.geocode(place)
            lat = location[0]['geometry']['location']['lat']
            lng = location[0]['geometry']['location']['lng']
            item['location'] = [lat, lng]
            print('success converted!')
        except:
            not_founded.append(place)
            print('no location found...')
    json_f.close()
    out_f = open(feed, encoding='latin-1', mode='w')
    json.dump(reader, out_f)
    out_f.close()
    not_founded_f = open(feed + '_no_location_return.txt', 'w')
    not_founded_f.write(str(not_founded))
    not_founded_f.close()

if __name__ == "__main__":
    convert('Rubro15_Remediacion_de_suelos_contaminados')
