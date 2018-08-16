from apiclient import discovery
from apiclient import errors
from httplib2 import Http
from oauth2client import file, client, tools
import base64
from bs4 import BeautifulSoup
import re
import time
import dateutil.parser as parser
from datetime import datetime
import datetime
import csv
from keys import *
import googlemaps
import sqlite3
import json
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from collections import Counter
from pymongo import MongoClient
from pprint import pprint
import json

# google map credential
gmaps = googlemaps.Client(key=google_map_key)

# db setup
#conn = sqlite3.connect('../db.sqlite')
#c = conn.cursor()

# gmail credential
SCOPES = 'https://www.googleapis.com/auth/gmail.modify'
store = file.Storage('storage.json') 
creds = store.get()
if not creds or creds.invalid:
    flow = client.flow_from_clientsecrets('client_secret.json', SCOPES)
    creds = tools.run_flow(flow, store)
GMAIL = discovery.build('gmail', 'v1', http=creds.authorize(Http()))

def get_unread (user_id, label_id_one, label_id_two):
    unread_msgs = GMAIL.users().messages().list(userId='me',labelIds=[label_id_one, label_id_two]).execute()
    mssg_list = unread_msgs['messages']
    print ("Total unread messages in inbox: ", str(len(mssg_list)))
    return mssg_list

def get_messages (user_id, label_id_one, label_id_two):
    final_list = [ ]
    mssg_list = get_unread(user_id, label_id_one, label_id_two)
    for mssg in mssg_list:
        temp_dict = { }
        m_id = mssg['id'] # get id of individual message
        message = GMAIL.users().messages().get(userId=user_id, id=m_id).execute() # fetch the message using API
        payld = message['payload'] # get payload of the message 
        headr = payld['headers'] # get header of the payload
        for item in headr: # getting the Subject
            if item['name'] == 'Subject':
                temp_dict['Subject'] = item['value']
            elif item['name'] == 'Date':
                msg_date = item['value']
                date_parse = (parser.parse(msg_date))
                m_date = (date_parse.date())
                temp_dict['Date'] = str(m_date)
            elif item['name'] == 'From':
                temp_dict['Sender'] = item['value']
            else:
                pass
            temp_dict['Snippet'] = message['snippet'] # fetching message snippet
        for part in message['payload']['parts']:
            if part['filename']:
                if 'data' in part['body']:
                    data=part['body']['data']
                else:
                    att_id=part['body']['attachmentId']
                    att=GMAIL.users().messages().attachments().get(userId=user_id, messageId=m_id,id=att_id).execute()
                    data=att['data']
                file_data = base64.urlsafe_b64decode(data.encode('UTF-8'))
                path = part['filename']
                with open(path, 'wb') as f:
                    f.write(file_data)
        try:
            mssg_parts = payld['parts'] # fetching the message parts
            part_one  = mssg_parts[0] # fetching first element of the part 
            part_body = part_one['body'] # fetching body of the message
            part_data = part_body['data'] # fetching data from the body
            clean_one = part_data.replace("-","+") # decoding from Base64 to UTF-8
            clean_one = clean_one.replace("_","/") # decoding from Base64 to UTF-8
            clean_two = base64.b64decode (bytes(clean_one, 'UTF-8')) # decoding from Base64 to UTF-8
            soup = BeautifulSoup(clean_two , "lxml" )
            mssg_body = soup.body()
            temp_dict['Message_body'] = mssg_body
        except :
            pass
        print(temp_dict)
        final_list.append(temp_dict)
        GMAIL.users().messages().modify(userId=user_id, id=m_id,body={ 'removeLabelIds': ['UNREAD']}).execute() 
    print ("Total messaged retrived: ", str(len(final_list)))
    return final_list

def split_text (data, text):
    text_list = text.split(';')
    #data["name"] = re.search('name:\s(.*)', text_list[0]).group(1)
    data["issue"] = re.search('issue:\s(.*)', text_list[0]).group(1)
    data["location"] = re.search('location:\s(.*)', text_list[1]).group(1)
    data["comments"] = re.search('comments:\s(.*)', text_list[2]).group(1)
    return True

def get_geojson (data_list):
    geojson = {
        "type" : "FeatureCollection",
        "features" : [
            {
                "type" :
                "Feature",
                "geometry" : {
                    "type" : "Point",
                    "coordinates" : [item['location'][1], item['location'][0]],
                    },
                "properties" : item,
                } for item in data_list
            ]
        }
    return geojson

def get_location (message):
    split_text(message, message['Snippet'])
    location = gmaps.geocode(message['location'])
    try:
        lat = location[0]['geometry']['location']['lat']
        lng = location[0]['geometry']['location']['lng']
        return lat, lng
    except:
        return None, None

f = open('key_words_es.json', encoding='latin-1', mode='r')
KEYWORDS = json.load(f)
f.close()

def get_ejkeyword (message):
    ej_keywords = [ ]
    words = message['Snippet'].lower() + ' ' + message['issue'].lower() + ' ' + message['comments'].lower()
    for item in KEYWORDS:
        keyword = item['Environmental Keywords in Spanish']
        if keyword.lower() in words:
            ej_keywords.append(keyword)
            print(keyword)
    print(ej_keywords)
    if (ej_keywords):
        counts = Counter(ej_keywords)
        top_two_cate = counts.most_common(2)
        return top_two_cate
    return None

def add_to_data (message, data_list):
    lat, lng = get_location(message)
    print('got location')
    ej_keyword = get_ejkeyword(message)
    print('got ej keyword')
    message['ej_keyword'] = ej_keyword
    message['location'] = [lat, lng]
    data_list.append(message)
    print('appended')
    #geojson = get_geojson(lat, lng)
    #c.execute("insert into sms (data, geojson) values (?, ?)", [json.dumps(message), json.dumps(geojson)])
    #conn.commit()
    return True

def send_reply (text, sender):
    msg = MIMEMultipart()
    msg['From'] = gmail_name
    msg['To'] = sender
    msg['Subject'] = "Reply to EJ Report"
    msg.attach(MIMEText(text, 'plain'))
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(gmail_name, gmail_pass)
    server.sendmail(gmail_name, sender, msg.as_string())
    server.quit()
    return True

def schema_feedback (message):
    sender = message['Sender']
    schema = '''
        Please send us the data using the format like below:
        issue: water pollution; location: 2594 Hearst Ave, Berkeley, CA 94709; comments: the water pollution is influencing my daily life
        There are issue, location, and comments three parts which should be separated by a ';'.
        Thank you for getting in touch with us!
        '''
    send_reply(schema, sender)
    return True

def success_feedback (message):
    sender = message['Sender']
    text = '''
        Your report has been successfully recorded, thank you for getting in touch with us!
        '''
    send_reply(text, sender)
    return True

if __name__ == "__main__":
    messages = get_messages('me', 'INBOX', 'UNREAD')
    #f = open('data.json', encoding='latin-1', mode='r')
    #try:
    #    data_list = json.load(f)
    #    f.close()
    #except:
    #    data_list = [ ]
    data_list = [ ]
    for m in messages:
        try:
            add_to_data(m, data_list)
            success_feedback(m)
        except:
            schema_feedback(m)
    f = open('data.json', encoding='latin-1', mode='w')
    json.dump(data_list, f)
    f.close()
    f = open('data.geojson', encoding='latin-1', mode='w')
    geojson_data = get_geojson(data_list)
    json.dump(geojson_data, f)
    f.close()
    client = MongoClient('mongodb+srv://gabrielchen:passwordgabrielchen@jamxio-kloz1.mongodb.net/admin')
    db = client.Axian
    for sms in data_list:
        result = db.sms.insert_one(sms)
        print('Created 1 entry in the Axian database')
    #conn.close()

'''
{	'Sender': '"email.com" <name@email.com>', 
	'Subject': 'Lorem ipsum dolor sit ametLorem ipsum dolor sit amet', 
	'Date': 'yyyy-mm-dd', 
	'Snippet': 'Lorem ipsum dolor sit amet'
	'Message_body': 'Lorem ipsum dolor sit amet'}
'''
