import csv
import json
import glob
import os
import sys

def read_csv (csv_feed):
    csv_f = open(csv_feed, 'r')
    reader = csv.DictReader(csv_f)
    file_name = os.path.splitext(csv_feed)[0]
    json_f = file_name + '.json'
    with open(json_f, 'w') as f:
        json.dump(reader.__dict__, f)

if __name__ == "__main__":
    read_csv(sys.argv[1])
