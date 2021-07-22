import React from "react"
import { connect } from "react-redux"

import {
    IonItem, IonLabel, IonItemSliding, IonCard, IonButton, IonCardContent, IonItemOptions, IonItemOption, IonReorder, 
} from '@ionic/react';

import style from "./FavoriteCard.module.css"


class FavoriteCard extends React.Component{

    constructor(props){
        super(props)

        this.sliderRef = React.createRef()
    }

    deleteCard(e){
        this.props.remove(this.props.index)

        let comp = this.sliderRef.current
        if (comp){
            comp.style.cssText = ""
        }
        
        this.props.onDelete()
    }

    render(){
        return(
            <IonCard>
                <IonItem>
                    <IonItemSliding>
                        <IonItem ref={this.sliderRef}>
                            <IonReorder slot="start" />
                            <IonLabel>{this.props.source}</IonLabel>
                            <IonButton fill="clear" slot="end" disabled>&lt;&lt;Slide</IonButton>
                        </IonItem>

                        <IonItemOptions side="end">
                            <IonItemOption color="danger" onClick={this.deleteCard.bind(this)}>Delete</IonItemOption>
                            <IonItemOption color="warning" onClick={this.props.onShare.bind(this)}>Share</IonItemOption>
                            <IonItemOption color="secondary" routerLink={`/verse/${this.props.b}/${this.props.c}/${this.props.v}`}>Go to</IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>
                </IonItem>

                <IonCardContent>
                    {this.props.verse}
                    <p/>
                    <sub>Saved at {this.props.time}</sub>
                </IonCardContent>
            </IonCard>
        )
    }
  
}



const mapStateToProps = state => {
    return {
        favorites : state.favorites
    }
}

const mapDispatchToProps = dispatch => {
    return {
        remove : (index) => { 
            dispatch(
                {
                    type: 'REMOVE', 
                    value: index
                }
            ) 
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCard)