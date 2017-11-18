#!/bin/sh

BERKELEY="https://www.accuweather.com/en/us/berkeley-ca/94704/daily-weather-forecast/332044"
LA="https://www.accuweather.com/en/us/los-angeles-ca/90012/daily-weather-forecast/347625"
NOW=$(date +"%c")

curl -o Berkeley $BERKELEY
curl -o LA  $LA 

echo "Hello my babe, now is $NOW, " > ./push.txt
python3 filter.py LA >> ./push.txt
python3 filter.py Berkeley >> ./push.txt
echo "I hope you would have a wonderful day! " >> ./push.txt

mutt -s "Morning My Babe!" love < ~/weather/push.txt
