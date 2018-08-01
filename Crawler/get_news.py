import newspaper
import json
import os
import csv
from bs4 import BeautifulSoup

MEMOIZE_STATUS = True

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

def add_items (words, add):
    for item in add:
        words.append(item)
    return words

def filter_ej_keywords (data_list):
    for item in KEYWORDS:
        article_list = [ ]
        keyword = item['Environmental Keywords in Spanish']
        print(keyword)
        for article in data_list:
            words = [ ]
            words = add_items(words, article['title'].lower().split())
            words = add_items(words, article['summary'].lower().split())
            words = add_items(words, article['keywords'])
            words = add_items(words, article['text'].lower().split())
            if keyword.lower() in words:
                article['ej_keyword'] = keyword
                article_list.append(article)
            print('got one!')
        return article_list

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
    cities = [ ]
    municipios = [ ]
    states = [ ]
    for row in LOCATIONS:
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
    
def get_location (data_list):
    article_list = [ ]
    for article in data_list:
        article = find_loc(article)
        article_list.append(articl)
    return article_list
    
if __name__ == '__main__':
    data_list = [ ]
    data_list = retrive_articles(data_list)
    data_list = filter_ej_keywords(data_list)
    data_list = get_location(data_list)
    try:
        f = open('data.json', encoding='latin-1', mode='r')
        old_data_list = json.load(f)
        data_list = add_items(data_list, old_data_list)
        f.close()
    except:
        pass
    f = open('data.json', encoding='latin-1', mode='w')
    json.dump(data_list, f)
    f.close()
    geojson = get_geojson(data_list)
    f = open('data.geosjson')
