import json

keyword_list = [ ]

f = open('key_words_es.json', encoding='latin-1', mode='r')
keywords = json.load(f)
f.close()
f = open('newsfeed.json', encoding='latin-1', mode='r')
newsfeed = json.load(f)
f.close()

for item in keywords:
    article_list = [ ]
    keyword = item['Environmental Keywords in Spanish']
    print(keyword)
    for news in newsfeed:
        org = news['Organization']
        f = open(org + '.json', encoding='latin-1', mode='r')
        articles = json.load(f)
        f.close()
        for article in articles:
            words = article['keywords']
            if keyword.lower() in words:
                article['ej_keyword'] = keyword
                article_list.append(article)
                print('got one!')
    f = open(keyword + '.json', encoding='latin-1', mode='w')
    json.dump(article_list, f)
