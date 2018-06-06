import csv
import json
import glob
import os

for filename in glob.glob('data/*.csv'):
    try:
        csvfile = os.path.splitext(filename)[0]
        jsonfile = csvfile + '.json'
        with open(csvfile+'.csv') as f:
            reader = csv.DictReader(f)
            rows = list(reader)
        with open(jsonfile, 'w') as f:
            json.dump(rows, f)
    except:
        pass
