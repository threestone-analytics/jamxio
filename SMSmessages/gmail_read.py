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

# google map credential
gmaps = googlemaps.Client(key=google_map_key)

# db setup
conn = sqlite3.connect('../db.sqlite')
c = conn.cursor()

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
    data["name"] = re.search('name:\s(.*)', text_list[0]).group(1)
    data["issue"] = re.search('issue:\s(.*)', text_list[1]).group(1)
    data["location"] = re.search('location:\s(.*)', text_list[2]).group(1)
    data["comments"] = re.search('comments:\s(.*)', text_list[3]).group(1)
    return True

def get_geojson (lat, lng):
    geojson = {
            "type" : "Feature",
            "properties" : { "id" : 0 },
            "geometry" : {
                "type" : "Point",
                "coordinates" : [lat, lng],
                }
            }
    return geojson

def get_location (message):
    split_text(message, message['Snippet'])
    location = gmaps.geocode(message['location'])
    lat = location[0]['geometry']['location']['lat']
    lng = location[0]['geometry']['location']['lng']
    return lat, lng

def send_to_db (message):
    lat, lng = get_location(message)
    geojson = get_geojson(lat, lng)
    c.execute("insert into sms (data, geojson) values (?, ?)", [json.dumps(message), json.dumps(geojson)])
    conn.commit()
    return True

if __name__ == "__main__":
    messages = get_messages('me', 'INBOX', 'UNREAD')
    for m in messages:
        send_to_db(m)
    conn.close()

'''
{	'Sender': '"email.com" <name@email.com>', 
	'Subject': 'Lorem ipsum dolor sit ametLorem ipsum dolor sit amet', 
	'Date': 'yyyy-mm-dd', 
	'Snippet': 'Lorem ipsum dolor sit amet'
	'Message_body': 'Lorem ipsum dolor sit amet'}
'''
