from pymongo import MongoClient
from pprint import pprint
import json

client = MongoClient('mongodb+srv://gabrielchen:passwordgabrielchen@jamxio-kloz1.mongodb.net/admin')
db = client.Axian

f = open('data.json', encoding='latin-1', mode='r')
sms_list = json.load(f)
f.close()

for sms in sms_list:
    result = db.sms.insert_one(sms)
    print('Created 1 entry in the test database')
#serverStatusResult = db.command('serverStatus')
#pprint(serverStatusResult)
