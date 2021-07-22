import requests
from bs4 import BeautifulSoup
import json


data = []

# Fetch the books list
books = {}
URL = f'https://biblesummary.info/genesis'
page = requests.get(URL)
topics_soup = BeautifulSoup(page.content, 'html.parser')
fetch_topic = topics_soup.select("#page_body > div.column_side.page_content > ul > li > a")

for t in fetch_topic:
    books[t.getText()] = t.get("href")

for topic, url in books.items():
    chapters = []
    URL = f'https://biblesummary.info{url}'
    page = requests.get(URL)
    topics_soup = BeautifulSoup(page.content, 'html.parser')
    fetch_topic = topics_soup.select("#page_body > div.column_main.page_content > div > p.tweet_content")

    
    print(f"Fetching {len(fetch_topic)} chapters at Book {topic}")

    for t in fetch_topic:
        chapters.append(t.getText().split(":")[-1].strip())
    
    data.append({
        "Title": topic,
        "Chapters": chapters
    })

with open("result.json", "w+") as fp:
    json.dump(data, fp)