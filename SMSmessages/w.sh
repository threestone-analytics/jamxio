#!/bin/sh

echo "Hi, we got your message, thanks! Please" > ./push.txt
python3 filter.py LA
python3 filter.py Berkeley
echo "I hope you would have a wonderful day! " >> ./push.txt

mutt -s "Hello from Lurking Turkeys!" sms < ~/weather/push.txt
