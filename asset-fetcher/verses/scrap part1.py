import requests
from bs4 import BeautifulSoup
import json

output_folder = "./verses/"

import os

if not os.path.exists(output_folder):
    os.makedirs(output_folder)


batch_size = 200
workers = 5
work_done = 0

collection = {}

# Collect the moods
versions = {
    "niv": "topics", 
    "esv": "topics/esv", 
    "kjv": "topics/kjv", 
    "nkjv": "topics/nkjv"
}

for k, ver in versions.items():

    verse_data = {}

    print(f"Scrapping bible of [{k}]")

    topics = {}
    URL = f'https://dailyverses.net/{ver}'
    page = requests.get(URL)

    topics_soup = BeautifulSoup(page.content, 'html.parser')

    fetch_topic = topics_soup.select("body > div > div.left > div:nth-child(4) > ul > li > a")
    
    print(f"Fetching verse category of {ver}")
    for t in fetch_topic:
        topics[t.getText()] = t.get("href")

    print(f"Fetched {len(topics)} verse categories")
    count = 0

    for key, dat in topics.items():
        verse_data[key] = []

        verse_url = f'https://dailyverses.net/{dat}'
        page = requests.get(verse_url)

        verse_soup = BeautifulSoup(page.content, 'html.parser')

        fetch_topic = verse_soup.select(".verses > li.b2,li.b3")

        for f in fetch_topic:
            _dat = {
                "verse": f.select_one("span").getText(),
                "source": f.select_one(".vc").getText(),
                "tags": [t.getText().capitalize() for t in f.select(".t")]
            }

            verse_data[key].append(_dat)
        
        
        print(f"Fetched {len(verse_data[key])} verses on {key} category [{count+1}/{len(topics)}]")

        count += 1
    
    collection[k] = verse_data

    with open(f"{output_folder}verses_{k}.json", "w+") as fp:
        json.dump(verse_data, fp)
    


#with open(f"{output_folder}verses_all_.json", "w+") as fp:
#    json.dump(collection, fp)
    