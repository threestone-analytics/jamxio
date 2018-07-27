import json
import csv

def check_loc (cities, municipios, states, words_list):
    if cities:
        if len(cities) == 1:    
            return [cities[0]['lat_dd'], cities[0]['lon_dd']]
        for item in cities:
            if item['NOM_ENT'] in words_list:
                return [item['lat_dd'], item['lon_dd']]
        for item in cities:
            if item['NOM_MUN'] in words_list:
                return [item['lat_dd'], item['lon_dd']]
        return [cities[0]['lat_dd'], cities[0]['lon_dd']]
    if municipios:
        if len(municipios) == 1:
            return [municipios[0]['lat_dd'], municipios[0]['lon_dd']]
        for item in municipios:
            if item['NOM_ENT'] in words_list:
                return [item['lat_dd'], item['lon_dd']]
        return [municipios[0]['lat_dd'], municipios[0]['lon_dd']]
    if states:
        return [states[0]['lat_dd'], states[0]['lon_dd']]
    return None

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
    words_list = add_keywords(add_keywords(add_keywords(add_keywords(words_list, title), summary), keywords), body)
    #words_list.append(title.append(summary.append(keywords.append(body))))
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
    article['location'] = check_loc(cities, municipios, states, words_list)
    return article

def get_geojson (data_list):
    geojson = {
        "type" : "FeatureCollection",
        "features" : [
            {
                "type" : 
                "Feature",
                "geometry" : {
                    "type" :  "Point",
                    "coordinates" : [item['location'][1], item['location'][0]],
                    },
                "properties" : item,
                } for item in data_list
            ]
        }
    return geojson

if __name__ == "__main__":
    keywords_f = open('key_words_es.json', encoding='latin-1', mode='r')
    keywords = json.load(keywords_f)
    location_f = open('mex_shape.csv', encoding='latin-1', mode='r')
    location_list = csv.DictReader(location_f)
    data_list = [ ]
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
            #f = open(word + '.json', encoding='latin-1', mode='w')
            #json.dump(articles, f)
        f.close()
    print(data_list)
    geojson_list = get_geojson(data_list)
    f = open('data.geojson', encoding='latin-1', mode='w')
    json.dump(geojson_list, f)
    f.close()
    keywords_f.close()
    location_f.close()
