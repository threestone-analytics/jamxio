import json
import os
import sys
import googlemaps
from keys import google_map_key

# google map credential
gmaps = googlemaps.Client(key=google_map_key)

def convert (feed):
    feed_in = feed + '.json'
    json_f = open(feed_in, 'r')
    reader = json.load(json_f)
    not_founded = [ ]
    for item in reader:
        place = item['ZONAS_METROPOLITANAS_O_POBLACIONES']
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
    out_f = open(feed_in, encoding='latin-1', mode='w')
    json.dump(reader, out_f)
    out_f.close()
    not_founded_f = open(feed + '_no_location_return.txt', 'w')
    not_founded_f.write(str(not_founded))
    not_founded_f.close()

if __name__ == "__main__":
    convert('ciudades_ monitoreode calidad de aire')
