import requests
from bs4 import BeautifulSoup
import json

output_folder = "./verses/"

import os

URL = r'C:\Users\castro\Desktop\bible\verse of the day\Top 1,000 Bible verses - Top Verses Bible.html'

verse_list = []

with open(URL) as fp:
    soup = BeautifulSoup(fp, 'html.parser')

verses = soup.select("#verse-container > .container")

for v in verses:
    verse_list.append([
        v.select_one(".scripture > div.frame > div:nth-child(1) > div").getText().strip().split("\n")[0],
        v.select_one("h2").getText().strip().split("\n")[0],
    ])

[print(v) for v in verse_list]
print(len(verse_list))

with open("verse_per_day.json", "w+") as fp:
    json.dump(verse_list, fp)
