import json


# fetch the bible

search_data = []

with open("result.json") as fp:
    raw_data = json.load(fp)

for ib, book in enumerate(raw_data):

    for ic, chapter in enumerate(book["c"]):

        for iv, verse in enumerate(chapter):

            search_data.append({
                "a": f"{book['dn'].lower()} {ic+1}:{iv+1}",
                "d": verse,
                "b": ib,
                "c": ic,
                "v": iv,
            })

with open("search_english_niv.json", "w+") as fp:
    json.dump(search_data, fp)