import React from "react"
import { IonButton, IonSearchbar } from '@ionic/react';

import style from "./MoodList.module.css"

import getverse from "../../utility/GetVerse/getverse";
import BeautifulCard from "../BeautifulCard/BeautifulCard";

import {withIonLifeCycle} from "@ionic/react"

class MoodList extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            search: '',
            quotes: [],
            showList: false
        }

        this.toShow = 5

        this.verses = this.props.versedata

        this.renderCategories = this.renderCategories.bind(this)
    }

    shuffleArray(array) {
        if (!array){
            return
        }
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    renderCategories(){
        
        let categories = Object.keys(this.verses).map(categ => {
                // Only do this if items have no stable IDs
                return(
                    <IonButton className="mood_item" expand="block" color="primary" key={"key_"+ categ} onClick={this.callModal.bind(this, categ)}>
                        {/*<IonCard className="mood_item" color="primary" key={"key_"+ categ} routerLink={"/"+categ}>*/}
                        {categ}
                    </IonButton>
                )
                
            }
        );

        return (<>{categories}</>)
    }


    changeSearch(ev){
        let st = {...this.state}
        st.search = ev.detail.value
        
        this.setState(st)

        let moods = document.querySelectorAll('.mood_item');
        
        requestAnimationFrame(() => {
            moods.forEach(item => {
                const shouldShow = item.textContent.toLowerCase().indexOf(ev.detail.value.toLowerCase()) > -1;
                item.style.display = shouldShow ? 'block' : 'none';
            });
        })
        

    }

    callModal(categ){
        let st = { ...this.state }
        if (categ){
            st.quotes = [ ...this.verses[categ]]

            this.shuffleArray(st.quotes)
            st.quotes = st.quotes.splice(0,5)
        }
        
        this.setState(st)

    }

    exitCB(){
        let st = { ...this.state }
        st.quotes = []
        
        this.setState(st)
    }

    showAllCategories(val){
        let st = { ...this.state }
        st.showList = val
        
        this.setState(st)
    }

    ionViewDidLeave(){
        this.showAllCategories(false)
    }

    render(){
        return (

            <>

                <div className="ion-text-center">
                    
                    { this.state.showList ? 
                    <>
                        <IonSearchbar onIonChange={this.changeSearch.bind(this)} value={this.state.search}></IonSearchbar>
                        <this.renderCategories />
                        
                        <IonButton onClick={this.showAllCategories.bind(this, false)} fill="clear" size="small" >Hide All Categories</IonButton> 
                    </> : 
                    <>
                        <IonButton onClick={this.showAllCategories.bind(this, true)} fill="clear" target="parent">Show All Categories</IonButton> 
                    </>
                    }
                </div>

                <BeautifulCard quotes={this.state.quotes} exitCB={this.exitCB.bind(this)}/>

            </>
             
        )
    }
    
}

export default withIonLifeCycle(MoodList);