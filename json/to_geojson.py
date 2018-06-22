import json
import certifi
from geopy.geocoders import Nominatim
import urllib
import re

# certificate set up
def uo(args, **kwargs):
    return urllib.request.urlopen(args, cafile=certifi.where(), **kwargs)
geolocator = Nominatim()
geolocator.urlopen = uo 

def validate_loc (data):
    after = [ ]
    for item in data:
        try:
            loc = item['location']
            address = geolocator.reverse(str(loc[0]) + ', ' + str(loc[1]))
            if re.match('.*México.*', address.address):
                after.append(item)
                print('item added into the list')
            else:
                print(address.address)
                print('not mexico loc, item passed...')
        except:
            print('no loc, item passed...')
            pass
    return after

def convert (feed):
    f = open(feed + '.json', 'r')
    jf = json.load(f)
    jf = validate_loc(jf)
    geojson = {
        "type": "FeatureCollection",
        "features": [
            {
                 "type": "Feature",
                "geometry" : {
                     "type": "Point",
                    "coordinates": [item['location'][1], item['location'][0]],
                    },
                "properties" : item,
            } for item in jf
        ]
    }
    f.close()
    f = open(feed + '.geojson', encoding='latin-1', mode='w')
    json.dump(geojson, f)
    f.close()

if __name__ == "__main__":
    convert('SANCIONES')
