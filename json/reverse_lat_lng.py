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

def get_m_en (feed):
    f = open(feed, 'r')
    jf = json.load(f)
    for item in jf:
        lat = item['location'][0]
        lng = item['location'][1]
        address = geolocator.reverse(str(lat) + ', ' + str(lng))
        item['address'] = address.address
    f.close()
    f = open(feed, encoding='latin-1', mode='w')
    json.dump(jf, f)
    f.close()

if __name__ == "__main__":
    get_m_en('Environmental justice Report (Responses) - Sheet1.json')
