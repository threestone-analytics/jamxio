from pymongo import MongoClient
from pprint import pprint
import json

client = MongoClient('mongodb+srv://gabrielchen:passwordgabrielchen@jamxio-kloz1.mongodb.net/admin')
db = client.Axian

f = open('data.json', encoding='latin-1', mode='r')
news_list = json.load(f)
f.close()

for news in news_list:
    result = db.news.insert_one(news)
    print('Created 1 entry in the Axian database')
#serverStatusResult = db.command('serverStatus')
#pprint(serverStatusResult)
