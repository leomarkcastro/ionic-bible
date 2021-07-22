import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

/* 
    Each Reducer would serve different kinds of data sphere for storage
    The planned divisions would be:
        - Favorite verse list
        - Session 
            -- For the last read
        - Notes list *maybe
        - Account data *maybe

*/

import fav_reducer from './favorite_reducer.js'
import pro_reducer from './profile_reducer.js'
import note_reducer from './note_reducer.js';
import settings_reducer from './settings_reducer.js';


const rootReducer = combineReducers({
    favorites : fav_reducer,
    profile : pro_reducer,
    note : note_reducer,
    settings: settings_reducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store