import re
import sys

fhandle = open(sys.argv[1])
f = fhandle.read()
filted_temp = re.findall("\S+?large-temp\S+([0-9][0-9])", f)
filted_weather = re.findall("\S+?cond\S+>(.+)?</span>", f)
tem = filted_temp[-2:]
print("and the weather today for", sys.argv[1], "is", filted_weather[0], "with highest temperature about", tem[0], "degrees Fahrenheit and lowest temperature about", tem[1], "degrees Fahrenheit. ")
