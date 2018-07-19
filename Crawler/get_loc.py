import json

def loop (keys, words_list):
    for key in keys:
        if key in words_list:
            reutrn key
    return None

def find_loc (article, states, cities, towns):
    title = article['title'].split()
    summary = article['summary'].split()
    keywords = article['keywords']
    body = article['text'].split()
    words_list = title.append(summary.append(keywords.append(body)))
    town = loop(towns, words_list)
    if town:
        return town
    city = loop(cities, words_list)
    if city:
        return city
    state = loop(states, words_list)
    if state:
        return state
    return None


if __name__ == "__main__":
    f = open('newsfeed.json', 'r')
    newsfeed = json.load(f)
    f.close()
    f = open('states', 'r')
    states = json.load(f)
    f.close()
    f = open('cities', 'r')
    cities = json.load(f)
    f.close()
    f = open('towns', 'r')
    towns = json.load(f)
    f.close()
    for news in newsfeed:
        org = news['Organization']
        f = open(org + '.json', 'r')
        articles = json.load(f)
        f.close()
        for article in articles:
            loc = find_loc(article, states, cities, towns)
            article['location'] = loc
        f = open(org + '.json', 'w')
        json.dump(articles, f)
        f.close()
