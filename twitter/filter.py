from keys import *
import tweepy

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

class MyStreamListener(tweepy.StreamListener):
    def on_status(self, status):
        print(status.text)
    def on_error(self, status_code):
        if status_code == 420:
            return False

stream_listener = MyStreamListener()
stream = tweepy.Stream(auth = api.auth, listener=stream_listener)

stream.filter(track=['itisbenjamin'], async=True)
