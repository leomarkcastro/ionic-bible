list = [
    {
      "name": "Old Man's War",
      "abbrev": "omw",
      "chapters": [
        {
             "book": 1,
          "verse" : [
            "This is a big world", "You shouln't be travelling alone."
          ]
        },
        {
             "book": 2,
          "verse" : [
            "Care to see what we are", "Hiding in plain sight"
          ]
        }
      ]
    },
    {
      "name": "New Man's War",
      "abbrev": "nmw",
      "chapters": [
        {
             "book": 1,
          "verse" : [
            "This is a bit scary", "And I don't know if I can trust anyone"
          ]
        },
        {
             "book": 2,
          "verse" : [
            "There's the sun", "That doesn't speak any word"
          ]
        }
  
      ]
    }
  ]

const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: [
        "chapters.verse"
    ]
};

const fuse = new Fuse(list, options);

// Change the pattern
const pattern = "sun"

  return fuse.search(pattern)

/*
[
  {
    "item": {
      "name": "New Man's War",
      "abbrev": "nmw",
      "chapters": [
        {
          "book": 1,
          "verse": [
            "This is a bit scary",
            "And I don't know if I can trust anyone"
          ]
        },
        {
          "book": 2,
          "verse": [
            "There's the sun",
            "That doesn't speak any word"
          ]
        }
      ]
    },
    "refIndex": 1
  }
]
*/

ret = ret[0].item?.chapters