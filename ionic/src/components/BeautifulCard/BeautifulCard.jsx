import React from "react"
import { IonCard, IonCardHeader, IonCardTitle, IonModal, IonButton, IonSearchbar } from '@ionic/react';

import PropTypes from "prop-types"

import style from "./BeautifulCard.module.css"

import getverse from "../../utility/GetVerse/getverse";
import SwipeCard from "../SwipeCard/SwipeCard";

class BeautifulCard extends React.Component {

    constructor(props){
        super(props)
        
        //Access the following below with a props
        this.state = {
            quotes: props.quotes,
            modal: props.quotes.length > 0,
            transparency: 0,
        }
        
    }

    componentDidUpdate(){
        if (this.state.modal != (this.props.quotes.length > 0)){
            this.setState({
                ...this.state,
                quotes: this.props.quotes,
                modal: this.props.quotes.length > 0,
            })
        }
        
    }

    setShowModal(modal){
        //let st = { ...this.state }
        
        //st.modal = false
        //this.setState(st)

        this.props.exitCB()
    }

    exitModal(index){
        if (index === 0){
            
            //let st = { ...this.state}
            //st.modal = false
            //this.setState(st)

            this.props.exitCB()
        }
    }
    
    setTransparency(value){
        this.setState({
            ...this.state,
            transparency: value,
        })  
    }

    render(){
        return (

            <IonModal isOpen={this.state.modal} className={style.modal}>

                {
                    this.state.quotes?.map(
                        (item, index) => <SwipeCard key={`Card_${index}`} verse={item.verse} author={item.source} onSwipe={this.exitModal.bind(this,index)} onSlide={this.setTransparency.bind(this)} onExit={this.setShowModal.bind(this,false)}/>
                    )
                }

                {/*

                <a className={style.modal_exit} onClick={() => this.setShowModal(false)}>No Verses to View!</a>
                
                */}

                <a className={style.quick_exit} onClick={() => this.setShowModal(false)} style={{
                    opacity: this.state.transparency
                }}>&lt; Quit</a>

            </IonModal>

             
        )
    }
    
}

BeautifulCard.propTypes = {
    search : PropTypes.string,
    quotes : PropTypes.any, // an array
    modal : PropTypes.bool,
    exitCB : PropTypes.func,
}

export default BeautifulCard;