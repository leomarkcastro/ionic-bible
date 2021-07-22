import { Redirect, Route } from 'react-router-dom';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { homeOutline, bookOutline, happyOutline, starOutline, clipboardOutline } from 'ionicons/icons';

import Home from '../Home/Home'
import Bible from '../Bible/Bible'
import Stars from '../Stars/Stars'
import Moods from "../Moods/Moods"
import Notes from '../Notes/Notes'

import style from "./BasePage.module.css"

import BookList from '../BookList/BookList'

const BasePage = props => {

    return(
        <Route path={props.path}>

            <IonTabs>

            <IonRouterOutlet animated={false}>
                <Route exact path="/base/home" component={Home}  />
                <Route exact path="/base/read" component={Bible} />
                <Route exact path="/base/mood" component={Moods} />
                <Route exact path="/base/notes" component={Notes} />
                <Route exact path="/base/stars" component={Stars} />
                < Redirect from="/base" to="/base/home" exact/>
            </IonRouterOutlet>

            <IonTabBar slot="bottom" defaultValue="home">


                <IonTabButton tab="read" href="/base/read">
                    <IonIcon icon={bookOutline} />
                    <IonLabel>Read</IonLabel>
                </IonTabButton>

                <IonTabButton tab="mood" href="/base/mood">
                    <IonIcon icon={happyOutline} />
                    <IonLabel>Mood</IonLabel>
                </IonTabButton>

                <IonTabButton tab="home" href="/base/home" className={style.home_button}>
                        <IonIcon icon={homeOutline} />
                        <IonLabel>Home</IonLabel>
                </IonTabButton>

                <IonTabButton tab="notes" href="/base/notes">
                    <IonIcon icon={clipboardOutline} />
                    <IonLabel>Notes</IonLabel>
                </IonTabButton>

                <IonTabButton tab="stars" href="/base/stars">
                    <IonIcon icon={starOutline} />
                    <IonLabel>Stars</IonLabel>
                </IonTabButton>


            </IonTabBar>

            </IonTabs>

        </Route>
    )
    
};

export default BasePage;
