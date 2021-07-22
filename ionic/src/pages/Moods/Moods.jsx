import React from "react"

import { connect } from "react-redux"

import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

import style from "./Moods.module.css"

import MainContent from "../../components/MainContent/MainContent";

import getverse from "../../utility/GetVerse/getverse";

import MoodList from "../../components/MoodList/MoodList";

import BeautifulCard from "../../components/BeautifulCard/BeautifulCard";

import getbible from "../../utility/GetBible/getbible";

import background from "./moods.jpg"

import bg01 from "./img_mood/random.jpg"
import bg02 from "./img_mood/goodvibes.jpg"
import bg03 from "./img_mood/personal.jpg"
import bg04 from "./img_mood/terms.jpg"

import DynamicImage from "../../components/DynamicImage/DynamicImage";

class Moods extends React.Component {

    constructor(props){
        super(props)
        
        this.state = {
            quotes: [],
        }

        this.verses = getverse()

        this.bible = getbible()

        this.callModal = this.callModal.bind(this)
        this.callModalArray = this.callModalArray.bind(this)

        this.joyTopics = [
            "Acknowledging",
            "Beauty",
            "Blessing",
            "Calling",
            "Comforter",
            "Compassion",
            "Contentment",
            "Encouragement",
            "Faith",
            "Freedom",
            "Friendship",
            "Gentleness",
            "Goodness",
            "Harvest",
            "Hope",
            "Love",
            "Life",
            "Learning",
            "Miracles",
            "Overcoming",
            "Patience",
            "Prayer",
            "Promises",
            "Relationships",
            "Strength",
            "Understanding",
            "Truth",
            "Trust",
        ]

        this.fav_firstLoad = true
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

    callModal(categ){
        let st = { ...this.state }
        if (categ){
            st.quotes = [ ...this.verses[categ]]

            this.shuffleArray(st.quotes)
            st.quotes = st.quotes.splice(0,5)
        }
        
        this.setState(st)

    }

    callModalArray(categArray){
        this.shuffleArray(categArray)
        let categ = categArray[0]

        let st = { ...this.state }
        if (categ){
            st.quotes = [ ...this.verses[categ]]

            this.shuffleArray(st.quotes)
            st.quotes = st.quotes.splice(0,5)
        }
        
        this.setState(st)

    }

    callModalFavorites(){

        if (this.first_load_favorite){
            this.props.hot_load_favorite()
        }

        let st = { ...this.state }
        let loc = [ ...this.props.favorites]
        
        let q = loc.map( e => {
            return {
                verse: this.bible[e.c_book].c[e.c_chapter][e.c_verse],
                source: `${this.bible[e.c_book].dn} ${e.c_chapter}:${e.c_verse}`,
                tags: [],
            }
        })
        
        st.quotes = q

        this.shuffleArray(st.quotes)
        st.quotes = st.quotes.splice(0,5)

        this.setState(st)
    }

    exitCB(){
        let st = { ...this.state }
        st.quotes = []
        
        this.setState(st)
    }

    getRandomCategory(){
        let cat = Object.keys(this.verses)
        let n = Math.floor(Math.random() * cat.length);

        this.callModal(cat[n])
    }

    render(){
        return (

            <MainContent title="Moods" styleImage={`"${background}"`}>
                
                <>
                    <IonCard color="secondary" button={true} onClick={this.getRandomCategory.bind(this)}>
                        <DynamicImage image={`${bg01}`} width="100%" height="12.5rem"/>
                        <IonCardHeader>
                            <IonCardTitle>Get Random Verses</IonCardTitle>
                            <p>Discover something new today!</p>
                        </IonCardHeader>
                    </IonCard>

                    <IonCard color="success" button={true} onClick={this.callModalArray.bind(this, this.joyTopics)}>
                        <DynamicImage image={`${bg02}`} width="100%" height="12.5rem"/>
                        <IonCardHeader>
                            <IonCardTitle>Good Vibes Verses!</IonCardTitle>
                            <p>Get your boost for the day!</p>
                        </IonCardHeader>
                    </IonCard>

                    {/*
                    <IonCard color="warning" button={true} onClick={this.callModalFavorites.bind(this)}>
                        <DynamicImage image={`${bg03}`} width="100%" height="12.5rem"/>
                        <IonCardHeader>
                            <IonCardTitle>Personal Favorite Verses</IonCardTitle>
                            <p>Get a peek of some of the verses that inspired you before</p>
                        </IonCardHeader>
                    </IonCard>
                    */}

                    <IonCard color="light">
                        <DynamicImage image={`${bg04}`} width="100%" height="12.5rem"/>
                        <IonCardHeader>
                            <IonCardTitle>Browse Categories</IonCardTitle>
                            <p>Pick From our Huge List of Categories!</p>
                        </IonCardHeader>
                        <IonCardContent>
                            <MoodList versedata={this.verses}/>
                        </IonCardContent>
                    </IonCard>
                
                    <BeautifulCard quotes={this.state.quotes} exitCB={this.exitCB.bind(this)}/>

                </>
                    

            </MainContent>
             
        )
    }
    
}

const mapStateToProps = state => {
    return {
        favorites : state.favorites.verses,
        first_load_favorite : state.favorites.first_load_done,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hot_load_favorite : () => { 
            dispatch(
                {
                    type: 'LOAD_HOT_FAVORITE', 
                }
            ) 
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Moods)