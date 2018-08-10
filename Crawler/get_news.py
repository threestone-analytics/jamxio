import newspaper
import json
import os
import csv
from collections import Counter
from bs4 import BeautifulSoup
import re

MEMOIZE_STATUS = False

# ej keywords
f = open('key_words_es.json', encoding='latin-1', mode='r')
KEYWORDS = json.load(f)
f.close()

# newsfeed list
f = open('newsfeed.json', encoding='latin-1', mode='r')
NEWSFEED = json.load(f)
f.close()

# mexico location list
f = open('mex_shape.csv', encoding='latin-1', mode='r')
reader = csv.DictReader(f)
LOCATIONS = [ ] #location_list
for row in reader:
    LOCATIONS.append(row)
f.close()

# country list
f = open('countries.csv', encoding='latin-1', mode='r')
reader = csv.DictReader(f)
COUNTRIES = [ ]
for row in reader:
    country = row['Spanish short']
    if country:
        COUNTRIES.append(row['Spanish short'])
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
        #words = [ ]
        #words = add_items(words, article['title'].lower().split())
        #words = add_items(words, article['summary'].lower().split())
        #words = add_items(words, article['keywords'])
        #words = add_items(words, article['text'].lower().split())
        words = article['title'].lower() + ' ' + article['summary'].lower() + ' ' + ' '.join(article['keywords']) + ' ' + article['text']
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

def filter_wrong_loc (loc_list, words_list, colomn):
    true_loc = [ ]
    for loc in loc_list:
        loc_name = loc[colomn].lower()
        three_words = get_three_words(words_list, loc_name)
        find = re.findall(loc_name, words_list)
        counts = len(find)
        #if not loc in COUNTRIES: 
        #    true_loc.append(loc)
        #print(three_words)
        #print(i)
        if (check_three_words(three_words) or loc_name not in COUNTRIES) and counts > 1:
            true_loc.append(loc)
        else:
            pass
    return true_loc

def check_loc_from_high (cities, municipios, states, words_list, article):
    if cities:
        for city in cities:
            municipio = city['NOM_MUN'].lower()
            state = city['NOM_ENT'].lower()
            index = words_list.index(city['NOM_LOC'].lower())
            words_list_without = words_list[:index:] + words_list[index+1::]
            if municipio in words_list_without and state in words_list_without:
                article['address'] = "city: " + city['NOM_LOC'] + ' municipio: ' + city['NOM_MUN'].lower() + ' estado: ' + city['NOM_ENT'].lower()
                article['location'] = [city['lat_dd'], city['lon_dd']]
                return article
        for city in cities:
            municipio = city['NOM_MUN'].lower()
            state = city['NOM_ENT'].lower()
            index = words_list.index(city['NOM_LOC'].lower())
            words_list_without = words_list[:index:] + words_list[index+1::]
            if municipio in words_list_without or state in words_list_without:
                article['address'] = "city: " + city['NOM_LOC'] + ' municipio: ' + city['NOM_MUN'].lower() + ' estado: ' + city['NOM_ENT'].lower()
                article['location'] = [city['lat_dd'], city['lon_dd']]
                return article
    if municipios:
        for municipio in municipios:
            state = municipio['NOM_ENT'].lower()
            index = words_list.index(municipio['NOM_MUN'].lower())
            words_list_without = words_list[:index:] + words_list[index+1::]
            if state in words_list_without:
                article['address'] = 'city: ' + municipio['NOM_LOC'].lower() + ' municipio: ' + municipio['NOM_MUN'] + ' estado: ' + municipio['NOM_ENT'].lower()
                article['location'] = [municipio['lat_dd'], municipio['lon_dd']]
                return article
    if states:
        if 'méxico' in words_list:
            counted = 0
            for state in states:
                find = re.findall(state['NOM_ENT'].lower(), words_list)
                counts = len(find)
                if counts > counted:
                    article['address'] = 'city: ' + state['NOM_LOC'].lower() + ' municipio: ' + state['NOM_MUN'].lower() + ' state: ' + state['NOM_ENT']
                    article['location'] = [state['lat_dd'], state['lon_dd']]
                    counted = counts
            return article
        else:
            article['address'] = 'estado matched but mexico not in text, assign mexico city. '
            article['location'] = [19.432608, -99.133209]
            return article
    if 'méxico' in words_list:
            article['address'] = 'nothing matched but mexico in text, assign mexico city. '
            article['location'] = [19.432608, -99.133209]
            return article
    article['address'] = None
    article['location'] = None
    return article

def check_loc_from_low (cities, municipios, states, words_list, article):
    if states:
        for state in states:
            municipio = state['NOM_MUN'].lower()
            city = state['NOM_LOC'].lower()
            index = words_list.index(state['NOM_ENT'].lower())
            words_list_without = words_list[:index:] + words_list[index+1::]
            if municipio in words_list_without and city in words_list_without:
                article['address'] = "city: " + state['NOM_LOC'].lower() + ' municipio: ' + state['NOM_MUN'].lower() + ' estado: ' + state['NOM_ENT']
                article['location'] = [state['lat_dd'], state['lon_dd']]
                return article
        for state in states:
            municipio = state['NOM_MUN'].lower()
            city = state['NOM_LOC'].lower()
            index = words_list.index(state['NOM_ENT'].lower())
            words_list_without = words_list[:index:] + words_list[index+1::]
            if municipio in words_list_without or city in words_list_without:
                article['address'] = "city: " + state['NOM_LOC'].lower() + ' municipio: ' + state['NOM_MUN'].lower() + ' estado: ' + state['NOM_ENT']
                article['location'] = [state['lat_dd'], state['lon_dd']]
                return article
    if municipios:
        for municipio in municipios:
            city = municipio['NOM_LOC'].lower()
            index = words_list.index(municipio['NOM_MUN'].lower())
            words_list_without = words_list[:index:] + words_list[index+1::]
            if city in words_list_without:
                article['address'] = 'city: ' + municipio['NOM_LOC'].lower() + 'municipio: ' + municipio['NOM_MUN'] + ' estado: ' + municipio['NOM_ENT'].lower()
                article['location'] = [municipio['lat_dd'], municipio['lon_dd']]
                return article
    if cities:
        if 'méxico' in words_list:
            counted = 0
            for city in cities:
                find = re.findall(city['NOM_LOC'].lower(), words_list)
                counts = len(find)
                if counts > counted:
                    article['address'] = 'city: ' + city['NOM_LOC'] + ' municipio: ' + city['NOM_MUN'].lower() + ' state: ' + city['NOM_ENT'].lower()
                    article['location'] = [city['lat_dd'], city['lon_dd']]
                    counted = counts
            #article['address'] = 'city: ' + cities[0]['NOM_LOC'] + ' municipio: ' + cities[0]['NOM_MUN'].lower() + 'state: ' + cities[0]['NOM_ENT'].lower()
            #article['location'] = [cities[0]['lat_dd'], cities[0]['lon_dd']]
            return article
        else:
            article['address'] = 'city matched but mexico not in text, assign mexico city. '
            article['location'] = [19.432608, -99.133209]
            return article
    if 'méxico' in words_list:
            article['address'] = 'nothing matched but mexico in text, assign mexico city. '
            article['location'] = [19.432608, -99.133209]
            return article
    article['address'] = None
    article['location'] = None
    return article

def add_items (words, add):
    for item in add:
        words.append(item)
    return words

def get_three_words (words_list, word):
    three_words =  ' '
    start = 0
    while True:
        if start > len(words_list) - 1:
            break
        try:
            index = words_list[start::].index(word)
        except:
            break
        three_words += words_list[index - 6:index + 7:]
        start += index + 1
        '''
    for i in range(0, len(words_list)):
        if words_list[i] == word:
            three_words += words_list[i - 6:i + 7:]
            
            try:
                three_words += words_list[i - 6:i + 7:]
            except:
                try:
                    three_words += words_list[i - 6::]
                except:
                    three_words += words_list[:i + 7:]
                    '''
    return three_words
    #return [words_list[index - 3], words_list[index - 2], words_list[index - 1], words_list[index + 1], words_list[index + 2], words_list[index + 3]]https://github.com/threestone-analytics/jamxio/blob/master/News/data.geojson

def check_three_words (three_words):
    if 'municip' in three_words or 'localidad' in three_words or 'estado' in three_words or 'ciudad ' in three_words or 'zona' in three_words or 'lugar' in three_words:
        return True
    return False

def find_loc (article):
    title = article['title'].lower()
    summary = article['summary'].lower()
    keywords = ' '.join(article['keywords'])
    body = article['text'].lower()
    words_list = title + ' ' + summary + ' ' + keywords + ' ' + body
    cities = [ ]
    municipios = [ ]
    states = [ ]
    for row in LOCATIONS:
        state = row['NOM_ENT'].lower()
        municipio = row['NOM_MUN'].lower()
        city = row['NOM_LOC'].lower()
        if (city) in words_list:
            cities.append(row)
        elif (municipio) in words_list:
            municipios.append(row)
        elif (state) in words_list:
            states.append(row)
        #else:
        #    pass
    cities = filter_wrong_loc(cities, words_list, 'NOM_LOC')
    print(len(cities))
    municipios = filter_wrong_loc(municipios, words_list, 'NOM_MUN')
    print(len(municipios))
    states = filter_wrong_loc(states, words_list, 'NOM_ENT')
    print(len(states))
    article = check_loc_from_high(cities, municipios, states, words_list, article)
    #article = check_loc_from_low(cities, municipios, states, words_list, article)
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
