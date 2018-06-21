import json

def get_en_m (feed):
    f = open(feed, 'r')
    jf = json.load(f)
    for item in jf:
        addr = item['address']
        addr_split = addr.split(', ')
        if len(addr_split) < 3:
            continue
        try:
            zipcode = int(addr_split[-2])
            estado = addr_split[-3]
            municipio = addr_split[-4]
        except:
            estado = addr_split[-2]
            municipio = addr_split[-3]
        item['estado'] = estado
        item['municipio'] = municipio
        print(item)
    f.close()
    f = open(feed, encoding='latin-1', mode='w')
    json.dump(jf, f)
    f.close()

if __name__ == "__main__":
    get_en_m('test.json')
