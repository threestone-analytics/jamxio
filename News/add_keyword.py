import csv
import json

f = open('match.csv', encoding='latin-1', mode='r')
reader = csv.DictReader(f)
matches = [ ]
for r in reader:
    matches.append(r)
f.close()

f = open('data.json', encoding='latin-1', mode='r')
data = json.load(f)
f.close()

for item in data:
    key = item['What is the issue?']
    for match in matches:
        if match['What is the issue?'] == key:
            item['ej_keyword'] = match['Keyword']

with open('data.json', encoding='latin-1', mode='w') as f:
    json.dump(data, f)
