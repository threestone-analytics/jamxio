from pymongo import MongoClient
from pprint import pprint
import json

client = MongoClient('mongodb+srv://gabrielchen:passwordgabrielchen@jamxio-kloz1.mongodb.net/admin')
db = client.Axian

f = open('data_loc_es_me.json', encoding='latin-1', mode='r')
tweets = json.load(f)
f.close()

for tweet in tweets:
    result = db.tweets.insert_one(tweet)
    print('Created 1 entry in the Axian database')
#serverStatusResult = db.command('serverStatus')
#pprint(serverStatusResult)
