import json
import csv

def check_loc (cities, municipios, states, words_list, article):
    if cities:
        if len(cities) == 1:
            article['city'] = cities[0]['NOM_LOC']
            article['location'] = [cities[0]['lat_dd'], cities[0]['lon_dd']]
            return article
        for item in cities:
            if item['NOM_MUN'] in words_list:
                article['location'] = [item['lat_dd'], item['lon_dd']]
                article['city'] = item['NOM_LOC']
                article['municipio'] = item['NOM_MUN']
                return article
        for item in cities:
            if item['NOM_ENT'] in words_list:
                article['city'] = item['NOM_LOC']
                article['state'] = item['NOM_ENT']
                article['location'] = [item['lat_dd'], item['lon_dd']]
                return article
        article['location'] = [cities[0]['lat_dd'], cities[0]['lon_dd']]
        article['city'] = cities[0]['NOM_LOC']
        return article
    if municipios:
        if len(municipios) == 1:
            article['location'] = [municipios[0]['lat_dd'], municipios[0]['lon_dd']]
            article['municipio'] = municipios[0]['NOM_MUN']
        for item in municipios:
            if item['NOM_ENT'] in words_list:
                article['location'] = [item['lat_dd'], item['lon_dd']]
                article['municipio'] = item['NOM_MUN']
                article['state'] = item['NOM_ENT']
                return article
        article['location'] = [municipios[0]['lat_dd'], municipios[0]['lon_dd']]
        article['municipio'] = municipios[0]['NOM_MUN']
        return article
    if states:
        article['location'] = [states[0]['lat_dd'], states[0]['lon_dd']]
        article['state'] = states[0]['NOM_ENT']
        return article
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
    geojson_list = get_geojson(data_list)
    f = open('data.geojson', encoding='latin-1', mode='w')
    json.dump(geojson_list, f)
    f.close()
    keywords_f.close()
    location_f.close()
