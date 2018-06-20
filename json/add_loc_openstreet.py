import json
import os
import sys
from keys import google_map_key
import certifi
from geopy.geocoders import Nominatim
import urllib

# certificate set up
def uo(args, **kwargs):
    return urllib.request.urlopen(args, cafile=certifi.where(), **kwargs)
geolocator = Nominatim()
geolocator.urlopen = uo 

def convert (feed):
    feed_in = feed + '.json'
    json_f = open(feed_in, 'r')
    reader = json.load(json_f)
    not_founded = [ ]
    for item in reader:
        place = item['SITIO']
        try:
            location = geolocator.geocode(place)
            lat = location.latitude
            lng = location.longitude
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
    convert('Calidad_del_Agua_Superficial-2012_2015')
