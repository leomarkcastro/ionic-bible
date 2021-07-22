import { db_set, db_get ,db_check } from "./local_storage"
import * as theme_set from "../../theme/theme_set"

const saveSlot = "Settings"
const ver = "09062021"

const initialState = {
    ver: ver,
    uid : false,
    lastBackup: false,
    first_load: false,
    settings : {
        theme : {
            darkMode : theme_set.isDarkModeDefault(),
            colorPalette : "default",
        },
        font : {
            style : "default",
            verse_size: 100,
            note_size: 100,
        },
        enabled_languages : {
            niv : true,
            kjv : true,
            tagalog : true,
            ilocano : true,
        }
        
    }
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

function update_settings(settings){//the settings above

    theme_set.toggleDarkMode(settings.theme.darkMode)
    theme_set.toggleThemeMode(settings.theme.colorPalette, true)
    theme_set.toggleFontMode(settings.font.style, true)
    theme_set.setCSSProperty('--ion-note-size', settings.font.note_size)
    theme_set.setCSSProperty('--ion-verse-size', settings.font.verse_size)

} 


const settings_reducer = (state = initialState, actions) => {

    let ret = null

    // actions should come in the form of objects with { type , value , ... }
    switch (actions.type){
        case 'SETTING_UPDATE':

            ret = {
                ...state,
            }

            ret.settings = actions.value // should contain settings

            update_settings(actions.value)

            db_set(saveSlot, ret)

            return ret
        
            
        case 'UPDATE_LASTBACKUP':
            ret = {...state}
            ret.lastBackup = actions.value
            
            db_set(saveSlot, ret)

            return ret

        case 'LOAD_FIRST_SETTINGS':

            ret = {
                ...state,
            }

            if (!(state.first_load)){
                ret = {
                    ...initialState,
                    first_load : true
                }

                db_set(saveSlot, ret)

                
            }

            return ret
        
        case 'RESTORE_SETTINGS':
            ret = {
                ...state,
                ...actions.value
            }
            
            db_set(saveSlot, ret)

            return ret
            

        case 'LOAD_HOT_SETTINGS':
            
            setTimeout(
                ()=>{
                    update_settings(initialState.settings)
                }, 250
            )
            

            return { 
                ...initialState,
                first_start_done : true
             }

        default:
            return state
    }

    
}

export default settings_reducer