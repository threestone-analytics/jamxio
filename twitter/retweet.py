from keys import *
import tweepy
from time import sleep
import json

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

for tweet in tweepy.Cursor(api.search, q='Test location').items():
    try:
        data = dict()
        data['name'] = tweet.user.screen_name
        data['id'] = tweet.user.id
        data['text'] = tweet.text
        if tweet.place:
           data['coordinates'] = tweet.place.bounding_box.coordinates[0][0]
        print(data)
        f = open("data.json", 'a')
        f.write('\n')
        json.dump(data, f)
        tweet.retweet()
        tweet.favorite()
        if not tweet.user.following:
            tweet.user.follow()
        sleep(5)
    except tweepy.TweepError as e:
        print(e.reason)
    except StopIteration:
        break
