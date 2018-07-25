import json
from bs4 import BeautifulSoup

f = open('newsfeed.json', 'r')
articles = json.load(f)
f.close()
for article in articles:
    html = article['html']
    soup = BeautifulSoup(html, 'lxml')
    author = soup.body.h1.next.next
    while len(author.get_text()) < 3:
        author = author.next
    author = author.get_text()
    article['authors'].append(author)

f = open('articles_informador.json', 'w')
json.dump(articles, f)
