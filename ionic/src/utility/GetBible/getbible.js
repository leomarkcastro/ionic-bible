
let bible = {
    niv: require("./bible_english_niv.json"),
    asv: require("./bible_english_asv.json"),
    kjv: require("./bible_english_akjv.json"),
    tagalog: require("./bible_tagalog.json"),
    ilocano: require("./bible_ilocano.json"),
}

export const bible_list = {
    niv: "Eng NIV",
    //asv: "Eng ASV",
    kjv: "Eng KJV",
    tagalog: "Tagalog",
    ilocano: "Ilocano",
}

function getbible(key="asv"){

    return bible[key]

}

export default getbible