import json
import csv

def check_loc (cities, municipios, states, words_list, article):
    if cities:
        if len(cities) == 1:
            article['address'] = "city: " + cities[0]['NOM_LOC']
            article['location'] = [cities[0]['lat_dd'], cities[0]['lon_dd']]
            return article
        for item in cities:
            if item['NOM_MUN'] in words_list:
                articl e['location'] = [item['lat_dd'], item['lon_dd']]
                article['address'] = 'city: ' + item['NOM_LOC'] + '; monicipio: ' + item['NOM_MUN']
                return article
        for item in cities:
            if item['NOM_ENT'] in words_list:
                 article['address'] = 'city: ' + item['NOM_LOC'] + '; state: ' +  item['NOM_ENT']
                article['location'] = [item['lat_dd'], item['lon_dd']]
                return article
        article['location'] = [cities[0]['lat_dd'], cities[0]['lon_dd']]
        article['address'] = 'city: ' + cities[0]['NOM_LOC']
        return article
    if municipios:
        if len(municipios) == 1:
            article['location'] = [municipios[0]['lat_dd'], municipios[0]['lon_dd']]
            article['address'] = 'municipio: ' + municipios[0]['NOM_MUN']
        for item in municipios:
            if item['NOM_ENT'] in words_list:
                article['location'] = [item['lat_dd'], item['lon_dd']]
                article['address'] = 'municipio: ' + item['NOM_MUN'] + '; state: ' + item['NOM_ENT']
                return article
        article['location'] = [municipios[0]['lat_dd'], municipios[0]['lon_dd']]
        article['address'] = 'municipio: ' + municipios[0]['NOM_MUN']
        return article
    if states:
        article['location'] = [states[0]['lat_dd'], states[0]['lon_dd']]
        article['address'] = 'state: ' + states[0]['NOM_ENT']
        return article
    article['location'] = None
    article['address'] = None
    return article

def add_keywords (words_list, add):
    for item in add:
        words_list.append(item)
    return words_list

def find_loc (article, location_list):
    words_list = [ ]
    title = article['title'].lower().split()
    summary = article['summary'].lower().split()
    keywords = article['keywords']
    body = article['text'].lower().split()
    words_list = add_keywords(words_list, title)
    words_list = add_keywords(words_list, summary)
    words_list = add_keywords(words_list, keywords)
    words_list = add_keywords(words_list, body)
    #words_list = add_keywords(add_keywords(add_keywords(add_keywords(words_list, title), summary), keywords), body)
    cities = [ ]
    municipios = [ ]
    states = [ ]
    for row in location_list:
        state = row['NOM_ENT'].lower()
        municipio = row['NOM_MUN'].lower()
        city = row['NOM_LOC'].lower()
        if city in words_list:
            cities.append(row)
        elif municipio in words_list:
            municipios.append(row)
        elif state in words_list:
            states.append(row)
        else:
            pass
    article = check_loc(cities, municipios, states, words_list, article)
    return article

def get_geojson (data_list):
    geojson = {
        "type" : "FeatureCollection",
        "features" : [
            {
                "type" : 
                "Feature",
                "geometry" : {
                    "type" :   "Point",
                    "coordinates" : [float(item['location'][1]), float(item['location'][0])],
                    },
                "properties" : {
                    "title" : item['title'],
                    "date" : item['date'],
                    "authors" : item['authors'],
                    "image" : item['image'],
                    "movies" : item['movies'],
                    "url" : item['url'],
                    "summary" : item['summary'],
                    "text" : item['text'],
                    "ej_keyword" : item['ej_keyword'],
                    "address" : item['address'],
                    "location" : item['location']
                    }
                } for item in data_list
            ]
        }
    return geojson

if __name__ == "__main__":
    keywords_f = open('key_words_es.json', encoding='latin-1', mode='r')
    keywords = json.load(keywords_f)
    location_f = open('mex_shape.csv', encoding='latin-1', mode='r')
    reader = csv.DictReader(location_f)
    location_list = [ ]
    data_list = [ ]
    for row in reader:
        location_list.append(row)
    location_f.close()
    for keyword in keywords:
        word = keyword['Environmental Keywords in Spanish']
        print(word)
        f = open(word + '.json', encoding='latin-1', mode='r')
        articles = json.load(f)
        if not articles:
            print('no articles')
            continue
        for article in articles:
            article = find_loc(article, location_list)
            if article['location']:
                 data_list.append(article) 
                print('got one!')
            else:
                print('no location found')
        f.close()
    f = open('data.json', encoding='latin-1', mode='w')
    json.dump(data_list, f)
    f.close()
    #geojson_list = get_geojson(data_list)
    #f = open('data.geojson', encoding='latin-1', mode='w')
    #json.dump(geojson_list, f)
    #f.close()
    keywords_f.close()
