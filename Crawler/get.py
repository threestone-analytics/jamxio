from crawler import Crawler, CrawlerCache
import re
import json

#crawler = Crawler()
crawler = Crawler(CrawlerCache('crawler.db')) #, depth=3)
root_re = re.compile('^/$').match
#crawler.crawl('https://en.wikipedia.org/wiki/Pollution', no_cache=root_re)
crawler.crawl('https://www.nytimes.com/', no_cache=root_re)
# displays the urls
content = crawler.content
f = open('result.json', 'w')
json.dump(content, f)
#['techcrunch.com'].keys()
