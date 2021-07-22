
const search_dat = {
    niv: require("./search_english_niv.json"),
    asv: require("./search_english_asv.json"),
    kjv: require("./search_english_akjv.json"),
    tagalog: require("./search_tagalog.json"),
    ilocano: require("./search_ilocano.json"),
}

export const search = search_dat;

function getsearch(key="asv"){

    return search_dat[key]

}

export default getsearch