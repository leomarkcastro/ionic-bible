import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { connect } from "react-redux"

import "./animate.min.css"
import "./no_scroll.css"

import BasePage from './pages/BasePage/BasePage';
import BookList from './pages/BookList/BookList';
import BookView from './pages/BookView/BookView';
import SearchView from "./pages/SearchView/SearchView"
import NoteView from "./pages/NoteView/NoteView"
import SettingsView from "./pages/Settings/SettingsView"
import AboutView from "./pages/AboutView/AboutView"
import AccountView from "./pages/AccountView/AccountView"

import RedirectBlack from "./utility/RedirectBlack/RedirectBlack"

import { useDispatch } from "react-redux"

// #region  Ionic Style Declarations


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// #endregion

class Index extends React.Component {

  constructor(props){
    super(props)

    
    this.loadSettings(10)
  }

  loadSettings(tries){
      if (tries>0){
          setTimeout(()=>{
              if (this.props.first_load_settings === undefined){
                  console.log("Dark Mode Called")
                  this.props.hot_load_settings()
              }
          }, 250)
      }
  }

  render(){
    return (
        <IonApp>
          <IonReactRouter>

            <IonRouterOutlet>

              <Redirect from="/" to="/base" exact/>
              <BasePage path="/base"/>

              <Route path="/verse/:author" component={BookList} exact/>
              <Route path="/verse/:author/:chapter" component={BookView} exact/>
              <Route path="/verse/:author/:chapter/:verse" component={BookView} exact/>

              <Route path="/search" component={SearchView} exact/>
              <Route path="/search/:search" component={SearchView} exact/>

              <Route path="/notes/:index" component={NoteView} exact/>

              <Route path="/about" component={AboutView} exact/>
              
              <Route path="/account" component={AccountView} exact/>

              <Route path="/settings" component={SettingsView} exact/>
              <Route path="/settings/redirect" render={(props) => <RedirectBlack {...props} destination="/base/home" />} exact/>
              
              

            </IonRouterOutlet>

          </IonReactRouter>
        </IonApp>
    )
  }

}

const mapStateToProps = state => {
  return {
    first_load_settings : state.settings.first_load_done,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      hot_load_settings : () => { 
          dispatch(
              {
                  type: 'LOAD_HOT_SETTINGS', 
              }
          ) 
      },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)