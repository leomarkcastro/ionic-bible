import requests
from bs4 import BeautifulSoup
import json


data = []

# Fetch the books list
books = {}
URL = f'https://www.blueletterbible.org/study/misc/66books.cfm'
page = requests.get(URL)
topics_soup = BeautifulSoup(page.content, 'html.parser')
titles = topics_soup.select('td[data-label="Book Title:"]')
chapters = topics_soup.select('td[data-label="Chapters:"]')
verses = topics_soup.select('td[data-label="Verses:"]')

for i in range(len(titles)):
    data.append({
        "Title": titles[i].getText().strip(),
        "Chapters": chapters[i].getText().strip(),
        "Verses": verses[i].getText().strip()
    })

with open("result.json", "w+") as fp:
    json.dump(data, fp)