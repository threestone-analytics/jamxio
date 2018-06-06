import tweepy
import json
import sqlite3
from keys import *
import googlemaps
import re

# twitter credential
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True)

# db setup
conn = sqlite3.connect('../db.sqlite')
c = conn.cursor()

# google map credential
gmaps = googlemaps.Client(key=google_map_key)

def schema_feedback (sender):
    schema = '''
        Please send us the data using the format like below:
        issue: water pollution; location: 2594 Hearst Ave, Berkeley, CA 94709; comments: the water pollution is influencing my daily life
        There are issue, location, and comments three parts which should be separated by a ';'.
        Thank you for getting in touch with us!
        '''
    api.send_direct_message(user_id = sender.id, text = schema)
    return True

def split_text (data, text):
    text_list = text.split(';')
    issue = re.search('\w*ue:\s(.*)', text_list[0]).group(1)
    location = re.search('\w*on:\s(.*)', text_list[1]).group(1)
    comments = re.search('\w*ts:\s(.*)', text_list[2]).group(1)
    data["issue"] = issue
    data["location"] = location
    data["comments"] = comments
    return True

def get_data (message):
    data = dict()
    sender = message['sender']
    data['time'] = str(message['created_at'])
    data['name'] = sender.name
    data['id'] = sender.id
    text = message['text']
    split_text(data, text)
    return data

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

def success_reply (sender):
    reply = '''
            Thank you for getting in touch with us, your message has been retrieved!
            '''
    return api.send_direct_message(user_id = sender.id, text=reply)

def retrieve_dm ():
    messages = api.direct_messages()
    for m in messages:
        m = m.__dict__
        sender = m['sender']
        try:
            data = get_data(m)
            location = gmaps.geocode(data['location'])
            lat = location[0]['geometry']['location']['lat']
            lng = location[0]['geometry']['location']['lng']
            geojson = get_geojson(lat, lng)
            c.execute("insert into twitter_message (data, geojson) values (?, ?)", [json.dumps(data), json.dumps(geojson)])
            success_reply(sender)
            conn.commit()
            print(data)
        except:
            schema_feedback(sender)
        if not sender.following:
            sender.follow()
    return True

if __name__ == "__main__":
    retrieve_dm()
    conn.close()
