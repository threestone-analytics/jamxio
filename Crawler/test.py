import csv

f = open('mex_shape.csv', encoding='latin-1', mode='r')
reader = csv.DictReader(f)
locs = [ ]
for r in reader:
    locs.append(r)

for loc in locs:
    if 'méxico' in loc['NOM_LOC'].lower():
        print(loc)

first = locs[0]
print(first['NOM_LOC'].lower())
