import { db_set, db_get ,db_check } from "./local_storage"

const saveSlot = "Favorite"
const ver = "09062021"

const initialState = {
    ver: ver,
    verses : [],
    verseDat : [],
    first_load_done: false,
}

async function load_favorite(){
    
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
            ver: ver
        }
    }
    
    db_set(saveSlot, dat)
    
    return dat

}



let _h = (async () => {
    let d = await load_favorite()
    initialState.verses = d.verses
    initialState.verseDat = d.verseDat
})()

function createSave(args){
    return {
        source: args.source,
        date: args.date,
        id : args.id,
        _c_book: args.c_book,
        _c_chapter: args.c_chapter,
        _c_chapter: args.c_verse,
    }
}

const fav_reducer = (state = initialState, actions) => {

    // actions should come in the form of objects with { type , value , ... }

    let dat = {}

    switch (actions.type){
        case 'ADD':

            dat = {
                ...state,
                verses: [
                    ...state.verses,
                    actions.value
                ],
                verseDat: [
                    ...state.verseDat,
                    actions.value.id
                ]
            }

            db_set(saveSlot, dat)

            return dat

        case 'REMOVE':
            dat = {...state}
            dat.verses.splice(Number(actions.value), 1)
            dat.verseDat.splice(Number(actions.value), 1)
            
            db_set(saveSlot, dat)

            return dat
        
        
        case 'RESTORE_FAVORITE':
            dat = {
                ...state,
                ...actions.value
            }
            
            db_set(saveSlot, dat)

            return dat

        case 'LOAD_HOT_FAVORITE':
            return { 
                ...initialState,
                first_load_done : true
            }

        default:
            return state
    }

    
}

export default fav_reducer