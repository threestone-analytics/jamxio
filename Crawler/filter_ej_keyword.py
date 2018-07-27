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
        try:
            articles = json.load(f)
        except:
            break
        f.close()
        for article in articles:
            '''
            words = [ ]
            if article['title']:
                words.append(article['title'].lower().split())
            if article['summary']:
                words.append(article['summary'].lower().split())
            if article['keywords']:
                words.append(article['keywords'])
            if article['text']:
                words.append(article['text'].lower().split())
                '''
            words = article['keywords']
            if keyword.lower() in words:
                article['ej_keyword'] = keyword
                article_list.append(article)
                print('got one!')
    f = open(keyword + '.json', encoding='latin-1', mode='w')
    json.dump(article_list, f)
