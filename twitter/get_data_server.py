from keys import *
import tweepy
from time import sleep
import json
import sys
import requests
import re

# Regex for URL
pattern = re.compile('((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$')

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

for tweet in tweepy.Cursor(api.search, q='water pollution').items():
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
           data['coordinates'] = tweet.place.bounding_box.coordinates[0][0]
        print(data)
        requests.post('http://127.0.0.1:27017', data=data)
        tweet.retweet()
        tweet.favorite()
        if not tweet.user.following:
            tweet.user.follow()
        sleep(5)
    except tweepy.TweepError as e:
        print(e.reason)
    except StopIteration:
        break
