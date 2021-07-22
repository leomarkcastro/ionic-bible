import json
import os

#loop through all the bibles
'''
    all we have yet is:
        n - name on display
        fn - full name (to add)
        dn - variable name

        d - book description

        cd - chapter descriptions
        c - chapters listing all verse data

        c_c - chapter count
        v_c - verse count
        
'''

files = [f"bibles/{i}" for i in os.listdir("bibles")]

with open("book_data.json") as fp:
    d_dat = json.load(fp)

with open("book_descption.json") as fp:
    b_dat = json.load(fp)

with open("chapter_description.json") as fp:
    c_dat = json.load(fp)

for f in files:
    with open(f) as fp:
        cur = json.load(fp)

    for i in range(len(cur)):
        cur[i].update({
            "fn": d_dat[i]["Title"],
            "d": b_dat[i],
            "cd": c_dat[i]["Chapters"],
            "c_c": d_dat[i]["Chapters"],
            "v_c": d_dat[i]["Verses"],
        })
    
    with open(f"result/{f.split('/')[-1]}", "w+") as fp:
        json.dump(cur, fp)