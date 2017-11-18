#!/bin/sh

echo "Hi, we got your message, thanks! Please send us the location of the polution area as exactly as possible with street address, city, and state. Have a good one! " > ./push.txt

mutt -s "Hello from Lurking Turkeys!" sms < ~/weather/push.txt
