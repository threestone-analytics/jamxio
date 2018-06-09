import json

jf = open('test.json', 'r')
f = json.load(jf)

l = [ ]
for item in f:
    try:
        loc = item['location']
    except:
        l.append(item['Empresa'])

out = open('test_no_found.txt', 'w')
out.write(str(l))
