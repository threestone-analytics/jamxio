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

def get_data (tweet):
    data = dict()
    data['time'] = str(tweet.created_at)
    data['name'] = tweet.user.screen_name
    data['id'] = tweet.user.id
    data['text'] = tweet.text
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

def retrieve_tweets (key_word):
    url_pattern = re.compile('((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$')
    loc_pattern = re.compile('M\wxico')
    pattern = re.compile('((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$')
    count = 0
    for tweet in tweepy.Cursor(api.search, q=key_word).items():
        if count == 200:
            break
        try:
            count += 1
            data = get_data(tweet)
            url_match = re.search(url_pattern, tweet.text)
            print(data)
            if url_match:
                data['url'] = match.group(0)
            print('user place:', tweet.user.location)
            if tweet.place:
                print('geo enable, testing country...')
                print('tweet country:', tweet.place.country)
                if re.search(loc_pattern, tweet.place.country):
                    data['coordinates'] = tweet.place.bounding_box.coordinates[0][0]
                    geojson = get_geojson(lat, lng)
                    c.execute("insert into tweets (keyword, data, geojson) values (?, ?, ?)", [key_word, json.dumps(data), json.dumps(geojson)])
                    print('successfuly retrieved from geolocation!')
            else if re.search():
                print('no enable geo, using user location to continue...')

                sleep(5)
                continue
                #c.execute("insert into tweets (keyword, data) values (?, ?)", [key_word, json.dumps(data)])
            match = re.search(pattern, tweet.text)
            if match:
                data['url'] = match.group(0)
            print('user place:', tweet.user.location)
            if tweet.place:
                data['coordinates'] = tweet.place.bounding_box.coordinates[0][0]
                geojson = get_geojson(lat, lng)
                c.execute("insert into tweets (keyword, data, geojson) values (?, ?, ?)", [key_word, json.dumps(data), json.dumps(geojson)])
            else:
                c.execute("insert into tweets (keyword, data) values (?, ?)", [key_word, json.dumps(data)])
            print(data)
            conn.commit()
            tweet.retweet()
            tweet.favorite()
            if not tweet.user.following:
                tweet.user.follow()
        except:
            pass
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
