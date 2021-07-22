import requests
from bs4 import BeautifulSoup
import json


data = []

book_list = []

# Fetch the books list
URL = f'https://www.biblestudytools.com/niv/'
page = requests.get(URL)
topics_soup = BeautifulSoup(page.content, 'html.parser')

for t in topics_soup.select("#testament-O > div > a") + topics_soup.select("#testament-N > div > a"):
    book_list.append([t.getText().strip(), t.get("href")])

# Fetch each book chapter
for ib, book in enumerate(book_list):

    print(f"Fetching book [{book[0]}]")

    URL = book[1]
    page = requests.get(URL)
    topics_soup = BeautifulSoup(page.content, 'html.parser')

    chapter_link = []
    chapter_data = []

    for chapter in topics_soup.select("#content-column > div:nth-child(5) > div > div > div > div > a"):
        chapter_link.append(chapter.get("href"))
    

    # Scrap the chapters
    for ic, chapterURL in enumerate(chapter_link):

        

        page = requests.get(chapterURL)
        topics_soup = BeautifulSoup(page.content, 'html.parser')
        c = []

        for t in topics_soup.select(".scripture .verse>span:nth-child(2)"):
            c.append(t.getText().strip())

        print(f"Fetching book [{book[0]}] chapter [{ic+1}/{len(chapter_link)}] with {len(c)} verses", end="\r")

        
        chapter_data.append(c)
    
    print()
    
    data.append({
        "n": book[0],
        "dn": book[0],
        "i": ib,
        "c": chapter_data,
    })

with open("result.json", "w+") as fp:
    json.dump(data, fp)