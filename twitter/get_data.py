from keys import *
import tweepy
from time import sleep
import json
import re
import csv
import sqlite3
import googlemaps

# twitter credential
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True)

# db setup
conn = sqlite3.connect('../db.sqlite')
c = conn.cursor()

# google map credential
gmaps = googlemaps.Client(key=google_map_key)

def split_text (data, text):
    text_list = text.split(';')
    issue = re.search(r'issue:\s(.*)', text_list[0])
    location = re.search(r'location:\s(.*)', text_list[1])
    comments = re.search(r'comments:\s(.*)', text_list[2])
    data["issue"] = issue
    data["location"] = location
    data["comments"] = comments
    return True

def error_feedback ():
    schema = '''
        Please send us the data using the format like below:
        issue: water pollution; location: 2594 Hearst Ave, Berkeley, CA 94709; comments: the water pollution is influencing my daily life
        There are issue, location, and comments three parts which should be separated by a ';'.
        Thank you for getting in touch with us!
        '''
    return schema

def get_data (tweet):
    data = dict()
    data['time'] = str(tweet.created_at)
    data['name'] = tweet.user.screen_name
    data['id'] = tweet.user.id
    text = tweet.text
    split_text(data, text)
    return data

def retrieve_tweets (key_word):
    pattern = re.compile('((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$')
    for tweet in tweepy.Cursor(api.search, q=key_word).items():
        try:
            data = get_data(tweet)
            data['text'] = tweet.text
            location = gmaps.geocode(data['location'])
            lat = re.search('location\D*(\S*),', str(location)).group(1)
            lng = re.search('location\D*\S*,\s*\D*\s(\S*)}', str(location)).group(1)
            #data['coordinates'] = [lat, lng]
            match = re.search(pattern, tweet.text)
            if match:
                data['url'] = match.group(0)
            #data['coordinates'] = tweet.place.bounding_box.coordinates[0][0]
            geojson = {
                     "type" : "Feature",
                    "properties" : { "id" : 0 },
                    "geometry" : {
                         "type" : "Point",
                        "coordinates" : [lat, lng],
                        }
                    }
            c.execute("insert into tweets (keyword, data, geojson) values (?, ?, ?)", [key_word, json.dumps(data), json.dumps(geojson)])
            print(data)
            conn.commit()
            tweet.retweet()
            tweet.favorite()
            if not tweet.user.following:
                tweet.user.follow()
        except:
            error_feedback()
        sleep(5)
    return True

def feed_keywords ():
    words_sheet = open('key_words.csv')
    reader = csv.DictReader(words_sheet)
    for row in reader:
        key_word = row['Environmental Keywords in Spanish']
        retrieve_tweets(key_word)
    return True

if __name__ == "__main__":
    feed_keywords()
    conn.close()
