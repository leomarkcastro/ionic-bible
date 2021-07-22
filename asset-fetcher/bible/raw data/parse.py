from xml.dom.minidom import parse
import xml.dom.minidom
import json

def parse_bible(loc):

    # Open XML document using minidom parser
    DOMTree = xml.dom.minidom.parse(loc)

    collection = DOMTree.documentElement

    # Get all the movies in the collection
    books = collection.getElementsByTagName("b")

    bible_names_english = ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"]


    # Print detail of each movie.
    bible_data = []
    search_data = []

    for b in books:

        book_index = b.getAttribute("bnumber") if b.hasAttribute("bnumber") else b.getAttribute("n")
        book_name_def = bible_names_english[int(book_index)]
        book_name = b.getAttribute("bname") if b.hasAttribute("bname") else book_name_def

        #input(b.getAttribute("bname"))

        c_list = []
        for ic, c in enumerate(b.getElementsByTagName('c')):

            v_list = []
            for iv, v in enumerate(c.getElementsByTagName('v')):
                v_list.append(v.childNodes[0].data)
                search_data.append({
                    "a": f"{book_name_def.lower()} {ic+1}:{iv+1}",
                    "d": v.childNodes[0].data,
                    "b": int(book_index)-1,
                    "c": ic,
                    "v": iv,
                })
            
            c_list.append(v_list)

        
        
        
        bible_data.append({
            "n": book_name,
            "dn": book_name_def,
            "i": book_index,
            "c": c_list
        })

    with open(f"bible_{loc.replace('.xml','')}.json", "w+") as fp:
        json.dump(bible_data, fp)
    with open(f"search_{loc.replace('.xml','')}.json", "w+") as fp:
        json.dump(search_data, fp)


#parse_bible("tagalog.xml")
#parse_bible("english_akjv.xml")
#parse_bible("english_asv.xml")
parse_bible("ilocano.xml")

