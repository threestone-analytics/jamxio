import newspaper
import json
import os
import csv
from collections import Counter
from bs4 import BeautifulSoup

MEMOIZE_STATUS = False

f = open('key_words_es.json', encoding='latin-1', mode='r')
KEYWORDS = json.load(f)
f.close()

f = open('newsfeed.json', encoding='latin-1', mode='r')
NEWSFEED = json.load(f)
f.close()

f = open('mex_shape.csv', encoding='latin-1', mode='r')
reader = csv.DictReader(f)
LOCATIONS = [ ] #location_list
for row in reader:
    LOCATIONS.append(row)
f.close()

def retrive_articles (data_list):
    for news in NEWSFEED:
        org = news['Organization']
        url = news['Link']
        org_news = newspaper.build(url, language='es', memoize_articles=MEMOIZE_STATUS)
        data_list = read_articles(org_news, org, data_list)
    return data_list

def read_articles (org_news, org, data_list):
    for article in org_news.articles:
        data = { }
        try:
            article.download()
            article.parse()
            article.nlp()
            data['title'] = article.title
            if article.authors:
                data['authors'] = article.authors
            else:
                data['authors'] = org
            if article.publish_date:
                data['date'] = article.publish_date.strftime('%x')
            else:
                data['date'] = None
            data['summary'] = article.summary
            data['keywords'] = article.keywords
            data['text'] = article.text
            data['url'] = article.url
            data['image'] = article.top_image
            data['movies'] = article.movies
            data_list.append(data)
            print(data['title'], 'successully retrieved!')
        except:
            print('bad data')
    return data_list

def filter_ej_keywords (data_list):
    for article in data_list:
        print(article['title'])
        ej_keywords = [ ]
        words = [ ]
        words = add_items(words, article['title'].lower().split())
        words = add_items(words, article['summary'].lower().split())
        words = add_items(words, article['keywords'])
        words = add_items(words, article['text'].lower().split())
        for item in KEYWORDS:
            keyword = item['Environmental Keywords in Spanish']
            if keyword.lower() in words:
                ej_keywords.append(keyword)
                print(keyword)
        if (ej_keywords):
            counts = Counter(ej_keywords)
            top_two_cate = counts.most_common(2)
            article['ej_keywords'] = top_two_cate
        else:
            article['ej_keywords'] = None
    article_list = [ ]
    for article in data_list:
        if (article['ej_keywords']):
            article_list.append(article)
    return article_list

def check_loc (cities, municipios, states, words_list, article):
    if cities:
        if len(cities) == 1:
            article['address'] = "city: " + cities[0]['NOM_LOC']
            article['location'] = [cities[0]['lat_dd'], cities[0]['lon_dd']]
            return article
        for item in cities:
            if item['NOM_MUN'] in words_list:
                article['location'] = [item['lat_dd'], item['lon_dd']]
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

def add_items (words, add):
    for item in add:
        words.append(item)
    return words

def get_three_words (words_list, index):
    return [words_list[index - 3], words_list[index - 2], words_list[index - 1], words_list[index + 1], words_list[index + 2], words_list[index + 3]]

def check_three_words (row, three_words, origin_loc, cities, municipio, states):
    if 'colonia' in three_words:
        city = row['NOM_LOC']
        cities.append(row)
        cities[-1]['NOM_LOC'] = 'colonia ' + city
    elif 'municip' in three_words:
        municipios.append(row)
    elif 'locadidad' in three_words:
        cities.append(row)
    elif 'estado' in three_words:
        states.append(row)
    else:
        origin_loc.append(row)

def find_loc (article):
    words_list = [ ]
    title = article['title'].lower().split()
    summary = article['summary'].lower().split()
    keywords = article['keywords']
    body = article['text'].lower().split()
    words_list = add_items(words_list, title)
    words_list = add_items(words_list, summary)
    words_list = add_items(words_list, keywords)
    words_list = add_items(words_list, body)
    if not 'méxico' in words_list:
        article['location'] = None
        article['address'] = None
        return article
    cities = [ ]
    municipios = [ ]
    states = [ ]
    for row in LOCATIONS:
        state = row['NOM_ENT'].lower()
        municipio = row['NOM_MUN'].lower()
        city = row['NOM_LOC'].lower()
        if city in words_list:
            index = words_list.index(city)
            three_words = get_three_words(words_list, index)
            check_three_words(row, three_words, cities, cities, municipios, states)
        elif municipio in words_list:
            index = words_list.index(municipio)
            three_words = get_three_words(words_list, index)
            check_three_words(row, three_words, municipios, cities, municipios, states)
        elif state in words_list:
            index = words_list.index(state)
            three_words = get_three_words(words_list, index)
            check_three_words(row, three_words, states, cities, municipios, states)
        else:
            pass
    article = check_loc(cities, municipios, states, words_list, article)
    return article
    
def get_location (data_list):
    article_list = [ ]
    for article in data_list:
        article = find_loc(article)
        if article['location']:
            print('got one!')
        article_list.append(article)
    return article_list
    
def get_geojson (data_list):
    article_list = [ ]
    for article in data_list:
        if (article['location']):
            article_list.append(article)
    geojson = {
        "type" : "FeatureCollection",
        "features" : [
            {
                "type"  :  
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
                    "ej_keywords" : item['ej_keywords'],
                    "address" : item['address'],
                    "location" : item['location']
                    }
                } for item in article_list
            ]
        }
    return geojson

if __name__ == '__main__':
    '''
    try:
        f = open('data.json', encoding='latin-1', mode='r')
        data_list = json.load(f)
        f.close()
    except:
        data_list = [ ]
        '''
    #data_list = [ ]
    #data_list = retrive_articles(data_list)
    #with open('original_data.json', encoding='latin-1', mode='w') as f:
    #    json.dump(data_list, f)
    #f = open('original_data.json', encoding='latin-1', mode='r')
    #data_list = json.load(f)
    #f.close()
    #data_list = filter_ej_keywords(data_list)
    #with open('ej_keywords_data.json', encoding='latin-1', mode='w') as f:
    #    json.dump(data_list, f)
    f = open('ej_keywords_data.json', encoding='latin-1', mode='r')
    data_list = json.load(f)
    f.close()
    data_list = get_location(data_list)
    geojson = get_geojson(data_list)
    with open('data.json', encoding='latin-1', mode='w') as f:
        json.dump(data_list, f)
    with open('data.geojson', encoding='latin-1', mode='w') as f:
        json.dump(geojson, f)
    #data_list = get_location(data_list)
    #geojson = get_geojson(data_list)
    #with open('data.json', encoding='latin-1', mode='w') as f:
    #    json.dump(data_list, f)
    #with open('data.geojson', encoding='latin-1', mode='w') as f:
    #    json.dump(geojson, f)
