import json

def validate_loc (data):
    for item in data:
        try:
            loc = item['location']
        except:
            item['location'] = [0, 0]

def convert (feed):
    f = open(feed + '.json', 'r')
    jf = json.load(f)
    validate_loc(jf)
    geojson = {
        "type": "FeatureCollection",
        "features": [
            {
                 "type": "Feature",
                "geometry" : {
                     "type": "Point",
                    "coordinates": [item['location'][0], item['location'][1]],
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
    convert('datosRETC')
