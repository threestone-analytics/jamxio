from keys import *
import tweepy
from time import sleep
import json
import re
import csv
import sqlite3

# twitter credential
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True)

# db setup
conn = sqlite3.connect('../db.sqlite')
c = conn.cursor()

def retrieve_tweets (key_word):
    pattern = re.compile('((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$')
    for tweet in tweepy.Cursor(api.search, q=key_word).items():
        try:
            data = dict()
            data['time'] = str(tweet.created_at)
            data['name'] = tweet.user.screen_name
            data['id'] = tweet.user.id
            data['text'] = tweet.text
            match = re.search(pattern, tweet.text)
            if match:
                data['url'] = match.group(0)
            if tweet.place:
                #continue
                data['coordinates'] = tweet.place.bounding_box.coordinates[0][0]
            print(data)
            c.execute("insert into tweets (keyword, data) values (?, ?)", [key_word, json.dumps(data)])
            conn.commit()
            tweet.retweet()
            tweet.favorite()
            if not tweet.user.following:
                tweet.user.follow()
            sleep(5)
        except tweepy.TweepError as e:
            print(e.reason)
        except StopIteration:
            conn.close()
            break
    return True

def get_data ():
    words_sheet = open('key_words.csv')
    reader = csv.DictReader(words_sheet)
    for row in reader:
        key_word = row['Environmental Keywords in Spanish']
        retrieve_tweets(key_word)
    return True

if __name__ == "__main__":
    get_data()
    conn.close()
