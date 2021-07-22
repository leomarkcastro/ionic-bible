import React from "react"
import { withIonLifeCycle } from "@ionic/react"
import { 
    IonContent, 
    IonPage, 
    IonToolbar, 
    IonTitle, 
    IonMenu, 
    IonHeader, 
    IonItem, 
    IonList,
    IonFab,
    IonFabButton
} from '@ionic/react';
import style from "./MainContent.module.css"
import PropTypes from "prop-types"

class MainContent extends React.Component {

    constructor(props){
        super(props)
        this.myRef = React.createRef()
    }

    render(){
        return (
            
            <IonPage ref={this.myRef}>

                <IonContent className={style.bg} fullscreen>   
                    
                    <div className={style.image} style={
                        {
                            "backgroundImage": `linear-gradient(180deg, rgba(0,0,0,0) 50%, var(--ion-background-color) 100%), url(${this.props.styleImage})`
                        }
                    }></div>

                    {/*
                    <div className={style.hide}>
                        <p className={style.style_title_text}>The Good Book</p>
                    </div>
                    */}

                    <div className={style.content_card + " xanimate__animated xanimate__fadeInUp xanimate__faster"}>
                        
                        {this.props.title ? <p className={style.title}>{this.props.title}</p> : <React.Fragment />}
                        {this.props.children}

                    </div>

                    {this.props.fab ? this.props.fab : <></>}
                    
                </IonContent>

            </IonPage>

            
        )
    }
    
}

MainContent.propTypes = {
    title : PropTypes.string,
    children : PropTypes.element.isRequired,
    styleImage: PropTypes.string,
}

export default withIonLifeCycle(MainContent);