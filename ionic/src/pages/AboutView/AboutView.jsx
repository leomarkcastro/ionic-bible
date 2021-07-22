import React from "react"

import {connect} from 'react-redux'

import {
  IonTitle,
  IonButton,
  IonButtons,
  IonContent,
  IonBackButton,
  IonPage,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonItemDivider,
  IonCard,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonIcon,
  IonCardTitle,
  IonCardContent,
  IonCardHeader
} from '@ionic/react';
import { chevronBack, reorderFourOutline, reorderTwoOutline, sunny } from "ionicons/icons";

import style from "./AboutView.module.css"

class AboutView extends React.Component{

    constructor(props){
        super(props)

    }

    render(){
        return (
            <IonPage id="home-page">
                <IonToolbar>
                    <IonButtons slot="start">
                            <IonBackButton defaultHref={`/`} />
                    </IonButtons>
                    <IonTitle>About</IonTitle>
                </IonToolbar>
                
                <IonContent>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Developers</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <p>Leo Castro</p>
                            <p>Aven Bulaong</p>
                            <p>Rome Agustin</p>
                            <p>Rhealyn Mendoza</p>
                            <p>Sofia Ondra</p>
                        </IonCardContent>
                    </IonCard>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Little History about This</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <p>This was created as a project in Bulacan State University. Never in my life I imagine I would write an android program. And yep, I never did here, I developed this using Ionic+Framework, a hybrid web mobile framework.</p>
                        </IonCardContent>
                    </IonCard>
                            

                </IonContent>
                
            </IonPage>
        );
    }
  
}

export default AboutView;
