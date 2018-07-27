import newspaper
import json
import re
from bs4 import BeautifulSoup

def read_articles (org, data_list):
    for article in org.articles:
        data = { }
        try:
            article.download()
            article.parse()
            article.nlp()
            data['title'] = article.title
            if article.authors:
                data['authors'] = article.authors
            #else:
                #find_author_hard(data, article.html)
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
            data['html'] = article.html
            #if re.match('.*Thai.*', data['title']):
            data_list.append(data)
            print(data['title'], 'successully retrieved!')
        except:
            print('bad data')
    return data_list

def feed_links (newsfeed):
    for news in newsfeed:
        org = news['Organization']
        try:
            f = open(org + '.json', 'r')
            data_list = json.load(f)
            f.close()
        except:
            data_list = [ ]
        f = open(org + '.json', 'w')
        url = news['Link']
        org_news = newspaper.build(url, language='es', memoize_articles=False)
        data_list = read_articles(org_news, data_list)
        #validate_author(data_list)
        json.dump(data_list, f)
        f.close()

def find_author_class (parent):
    #try:
    for child in parent.children:
        try:
            cl = child['class']
        except:
            return find_author_class(child)
        if re.match("|".join(['author', 'by', '[p,P]or']), cl):
                return child
        else:
            return find_author_class(child)
    #except:
     #   return

def find_author_hard (data, html):
    soup = BeautifulSoup(html, 'lxml')
    find_author_class(soup)
    #for child in soup.children:

if __name__ == '__main__':
    newsfeed_f = open('newsfeed.json', 'r')
    newsfeed = json.load(newsfeed_f)
    feed_links(newsfeed)
