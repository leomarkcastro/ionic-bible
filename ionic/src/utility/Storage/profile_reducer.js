import { db_set, db_get ,db_check } from "./local_storage"

const saveSlot = "Profile"
const ver = "09062021"

const initialState = {
    ver: ver,
    name: 'User',
    language : "niv", // niv, asv, kjv, tagalog, ilocano
    last_read : {
        book_index : 0,
        chapter_index : 0,
    },
    starred_verse: {
        lastCheck : null,
        starred_verse: null,
        starred_author: null,
    },
    first_start_done: false,
}


async function load_profile(){
    
    let dat = {
        ...initialState
    }

    let check = await db_check(saveSlot)
    let loadSlot = null

    if (check) {
        loadSlot = await db_get(saveSlot)
        dat = {
            ...dat,
            ...loadSlot,
            ver: ver,
        }
    }

    db_set(saveSlot, dat)
        
    
    return dat

}



let _h = (async () => {
    let d = await load_profile()
    for (let key in initialState){
        initialState[key] = d[key]
    }
})()

function lastRead(args){
    return {
        book_index : args.book,
        chapter_index : args.chapter,
    }
}

function setStarred(args){
    return {
        lastCheck : args.date,
        starred_verse: args.verse,
        starred_author: args.author,
    }
}

const pro_reducer = (state = initialState, actions) => {

    let ret = null

    // actions should come in the form of objects with { type , value , ... }
    switch (actions.type){
        case 'LANGUAGE':

            ret = {
                ...state,
                language: actions.value // should only be: asv, kjv, tagalog, ilocano
            }

            db_set(saveSlot, ret)

            return ret

        case 'LASTREAD':

            ret = {
                ...state,
                last_read: lastRead(actions.value) // should only be: asv, kjv, tagalog, ilocano
            }

            db_set(saveSlot, ret)

            return ret

        case 'LOAD_HOT_PROFILE':
            return { 
                ...initialState,
                first_start_done : true
             }
            
        case 'RESTORE_PROFILE':
            ret = {
                ...state,
                ...actions.value
            }
            
            db_set(saveSlot, ret)

            return ret

        case 'STARRED_VERSE_SET':
            
            ret = { 
                ...initialState,
                starred_verse : setStarred(actions.value),
             }

            db_set(saveSlot, ret)

            return ret

             

        default:
            return state
    }

    
}

export default pro_reducer