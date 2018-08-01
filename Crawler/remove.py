import json

f = open('data.json', encoding='latin-1', mode='r')
jf = json.load(f)
data_list = [ ]

for item in jf:
    data = { }
    for key in item.keys():
        if key == 'html':
            continue
        data[key] = item[key]
    data_list.append(data)

f.close()
f = open('data_after.json', encoding='latin-1', mode='w')
json.dump(data_list, f)
