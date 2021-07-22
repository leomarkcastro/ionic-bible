import React from "react"
import { createGesture, Gesture } from '@ionic/react';

import { IonCard, IonButton, IonIcon, IonCardTitle ,IonCardContent } from '@ionic/react';

import { searchOutline } from 'ionicons/icons';

import PropTypes from "prop-types"

import style from "./SwipeCard.module.css"

class SwipeCard extends React.Component {

    constructor(props){
        super(props)
        this.myRef = React.createRef()
    }

    updateState(data){

        this.myRef.current.style.transform = `translateX(${data.deltaX}px) rotate(${data.deltaX/20}deg) translateZ(0)`
        this.myRef.current.style.willChange = `transform`
        //this.myRef.current.style.transform = `translateX(${Math.max(0,data.deltaX)}px)`
        
    }

    componentDidMount(){
        
        let ReactDOM = this.myRef.current
        let style = ReactDOM.style
        
        const gesture = createGesture({
            el: this.myRef.current,
            threshold: 0,
            gestureName: 'swipe-card',
            onStart: () => {
                style.transition = "none";
            },
            onMove: detail => {
                this.updateState(detail)
                this.props.onSlide(detail.deltaX/200*-1)
            },
            onEnd: ev => {
                style.transition = "transform 0.3s ease-out";
                
                style.willChange = `unset`
                
                let windowWidth = window.innerWidth;

                if(ev.deltaX > windowWidth/2){
                    style.transform = `translateX(${windowWidth * 1.5}px)`;
                    this.props.onSwipe()
                } else if (ev.deltaX < -windowWidth/2){
                    style.transform = `translateX(-${windowWidth * 1.5}px)`;
                    this.props.onExit()
                } else {
                    style.transform = ''
                }
                
                this.props.onSlide(0)
                
            }
        })

        gesture.enable()
    }


    render(){
        return (
            <>
            
            <IonCard ref={this.myRef} className={style.card}>
                <IonCardContent>
                    <div className={style.verse_content}>
                        <div className={style.verse_box}>
                            <p className={style.verse}>{this.props.verse}</p>
                            <p>&nbsp;</p>
                            <p className={style.author}><sup><IonButton fill="clear" size="small" routerLink={`/search/${this.props.author}`}><IonIcon icon={searchOutline} slot="icon-only" color="dark"/></IonButton></sup>{this.props.author}</p>
                        </div>
                    </div>
                    
                </IonCardContent>
            </IonCard>
            
            
            </>
             
        )
    }
    
}

SwipeCard.propTypes = {
    verse : PropTypes.string,
    author : PropTypes.string,
    onSwipe : PropTypes.func,
    onSlide : PropTypes.func,
    onExit : PropTypes.func,
}

export default SwipeCard;