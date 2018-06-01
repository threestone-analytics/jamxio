from pymongo import MongoClient
import json

client = MongoClient()
db = client.twitter
f = open("data.json", 'r')
data = json.load(f)
result = db.twitterfeeds.insert_one(data)
