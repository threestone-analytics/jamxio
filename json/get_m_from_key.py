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

def validate_as_str (data):
    return str(data).lstrip('0')

def convert (feed):
    feed_in = feed + '.json'
    key_f = open('state_municipality_key.json', 'r')
    json_f = open(feed_in, 'r')
    reader = json.load(json_f)
    keys = json.load(key_f)
    for item in reader:
        en_id = validate_as_str(item['ID_ENTIDAD'])
        m_id = validate_as_str(item['ID_MUNICIPIO'])
        if en_id == '' or en_id == '99' or en_id == '999' or m_id == '' or m_id == '99' or m_id == '999':
            continue
        for key in keys:
            en_key = validate_as_str(key['CLAVE DE ENTIDAD FEDERATIVA'])
            m_key = validate_as_str(key['CLAVE DE MUNICIPIO /DEMARCACIAN TERRITORIAL'])
            if en_key == en_id and m_key == m_id:
                item['ID_ENTIDAD'] = key['NOMBRE ENTIDAD FEDERATIVA']
                item['ID_MUNICIPIO'] = key['NOMBRE DE MUNICIPIO / DEMARCACIAN TERRITORIAL']
                break
    json_f.close()
    key_f.close()
    out_f = open(feed_in, encoding='latin-1', mode='w')
    json.dump(reader, out_f)
    out_f.close()

if __name__ == "__main__":
    convert('test')
