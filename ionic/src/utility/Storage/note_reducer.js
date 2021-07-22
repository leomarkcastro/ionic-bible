import { db_set, db_get ,db_check } from "./local_storage"

const saveSlot = "Notes"
const ver = "09062021"

const initialState = {
    ver: ver,
    lastEdit: false,
    notes: [],
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

function addNote(args){
    return {
        title : args.title,
        note: args.note,
        color: args.color,
        last_modified: args.last,
    }
}

const note_reducer = (state = initialState, actions) => {

    let ret = null

    // actions should come in the form of objects with { type , value , ... }
    switch (actions.type){

        case 'NOTE_ADD':

            ret = {
                ...state,
                lastEdit: state.notes.length,
                notes : [
                    ...state.notes,
                    addNote(actions.value)
                ]
            }

            db_set(saveSlot, ret)

            return ret

        case 'NOTE_REMOVE':

            ret = {...state}

            ret.notes.splice(actions.value, 1)
            if (ret.lastEdit == actions.value){
                ret.lastEdit = false
            }

            db_set(saveSlot, ret)

            return ret

        case 'NOTE_UPDATE':

            ret = {
                ...state,
                lastEdit : actions.value.index,
            }

            ret.notes[actions.value.index] = {
                ...ret.notes[actions.value.index],
                ...addNote(actions.value)
            }

            db_set(saveSlot, ret)

            return ret
        
        case 'RESTORE_NOTE':
            ret = {
                ...state,
                ...actions.value
            }
            
            db_set(saveSlot, ret)

            return ret

        case 'LOAD_HOT_NOTE':
            return { 
                ...initialState,
                first_start_done : true
             }

        default:
            return state
    }

    
}

export default note_reducer