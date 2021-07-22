import requests
from bs4 import BeautifulSoup
import json


data = []

# Fetch the books list
URL = f'https://www.bibleblender.com/2017/biblical-lessons/biblical-history/complete-concise-summary-each-book-of-bible-old-testament-new-testament'
page = requests.get(URL)
topics_soup = BeautifulSoup(page.content, 'html.parser')
fetch_topic = topics_soup.select("#content > div > div > div > div.mg-blog-post-box > article > p")

for t in fetch_topic[1:]:
    data.append(t.getText())


with open("result.json", "w+") as fp:
    json.dump(data, fp)