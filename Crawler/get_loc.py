import json
import csv

def loop (keys, words_list):
    for key in keys:
        if key in words_list:
            reutrn key
    return None

def check_loc (cities, municipios, states):
    if not states:
        return None
    if len(loc_starts_city) == 1:
        return loc_starts_city[0]
    if len(loc_starts_city) == 0:


def find_loc (article, location_list):
    title = article['title'].split()
    summary = article['summary'].split()
    keywords = article['keywords']
    body = article['text'].split()
    words_list = title.append(summary.append(keywords.append(body)))
    loc_starts_city = [ ]
    loc_starts_municipio = [ ]
    loc_starts_state = [ ]
    for row in location_list:
        state = row['NOM_ENT']
        municipio = row['NOM_MUN']
        city = row['NOM_LOC']
        if city in words_list:
            loc_starts_city.append(row)
        elif municipio in words_list:
            loc_starts_municipio.append(row)
        elif state in words_list:
            loc_starts_state.append(row)
        else:
            pass
    if not loc_starts_state:
        return 
    if len(loc_starts_city) == 1:
        article['location'] = [loc_starts_city[0]['lat_dd'], loc_starts_city[0]['lon_dd']]
        return
    elif len(loc_starts_city) == 0:
        if len(loc_starts_municipio) == 1:
            article['location'] = [loc_starts_municipio[0]['lat_dd'], loc_starts_municipio[0]['lon_dd']]
        elif len(loc_starts_municipio) == 0:
            pass
            loop state
        else:
            check state
            if len(loc_starts_state) == 0
    else:
        for item in loc_starts_city:
            check muni and state
    return article


if __name__ == "__main__":
    f = open('key_word_es.json', 'r')
    keywords = json.load(f)
    f.close()
    f = open('mex_shape.csv', encoding='latin-1', mode='r')
    location_list = csv.DictReader(f)
    f.close()
    for keyword in keywords:
        word = keyword['Environmental Justice Keywords in Spanish']
        with open(word + '.json', encoding='latin-1', mode='r+') as f:
            articles = json.load(f)
            for article in articles:
                loc = find_loc(article, location_list)
                article['location'] = loc
            json.dump(articles, f)
