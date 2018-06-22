import re
import json

def convert(loc):
    if type(loc) != str:
        loc = str(loc)
    if re.match('.*deg.*', loc):
        loc_list = re.split('[-deg\''']+', loc)
        if loc_list[0] == '':
            loc = float(loc_list[1]) + float(loc_list[2]) / 60 + float(loc_list[3]) / 3600
            return '-' + str(loc)
        return str(float(loc_list[0]) + float(loc_list[1]) / 60 + float(loc_list[2]) / 3600)
    return loc

if __name__ == '__main__':
    f = open('test.json', 'r')
    jf = json.load(f)
    not_convert_f = open('not.txt', 'w')
    not_convert = [ ]
    for item in jf:
        lat = item['Latitud Norte']
        lng = item['Longitud Oeste']
        try:
            lat = convert(lat)
            item['location'] = [lat]
        except:
            not_convert.append(lat)
        try:
            lng = convert(lng)
            item['location'].append(lng)
        except:
            not_convert.append(lng)
    f.close()
    f = open('test.json', 'w')
    json.dump(jf, f)
    not_convert_f.write(str(not_convert))
    f.close()
    not_convert_f.close()
