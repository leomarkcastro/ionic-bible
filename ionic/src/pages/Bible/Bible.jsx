import React, { useState } from "react"
import { connect } from 'react-redux'
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSegment, IonSegmentButton, IonLabel, IonButton } from '@ionic/react';

import style from "./Bible.module.css"

import MainContent from "../../components/MainContent/MainContent";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

import getbible, { bible_list } from "../../utility/GetBible/getbible";

import background from "./bible.jpg"

import DynamicImage from "../../components/DynamicImage/DynamicImage";

import b_continue from "./img_bible/continue.jpg"
import b_search from "./img_bible/search.jpg"

class Bible extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            active : false
        }
        this.firstLoad = true

        this.bible = getbible()
    }

    componentDidMount(){
        let prof_firstStart = !Boolean(this.props.first_start)
        if (prof_firstStart && this.firstLoad){
            let active = true
            this.setState({active: !active})
            setTimeout(()=>{
                if (this.firstLoad && prof_firstStart ){
                    this.props.hot_load()
                    this.firstLoad = false
                    this.setState({
                        active : true
                    })
                }
            }, 500)
        }

        this.bible = getbible(this.props.language)
        
    }

    changeLanguage(e){
        this.props.setLanguage(e.detail.value)
    }

    render(){
        
        return (

            <MainContent title="Bible" styleImage={`"${background}"`}>
                
                <>
                    <IonSegment onIonChange={this.changeLanguage.bind(this)} mode="ios" value={this.props.language} scrollable={true}>
                        {
                            Object.keys(bible_list).map((e,i) => {
                                return(
                                <IonSegmentButton key={`language_${i}`} value={e}>
                                    <IonLabel>{bible_list[e]}</IonLabel>
                                </IonSegmentButton>
                                )
                            })
                        }
                    </IonSegment>
                    
                    <>

                        <p>Your Book</p>

                        <IonCard color="warning" button={true} routerLink={'/search'} >
                            <DynamicImage image={`${b_search}`} width="100%" height="12.5rem"/>
                            <IonCardHeader>
                                <IonCardTitle>Search Verses</IonCardTitle>
                                <p>Search for Bible Verses</p>
                            </IonCardHeader>
                        </IonCard>

                        <IonCard color="tertiary" button={true} routerLink={`/verse/${this.props.last_read["book_index"]}/${this.props.last_read["chapter_index"]}`}>
                            <DynamicImage image={`${b_continue}`} width="100%" height="12.5rem"/>
                            <IonCardHeader>
                                <IonCardTitle>Continue Reading</IonCardTitle>
                                <p>You left reading at {this.bible[this.props.last_read["book_index"]].n} Chapter {this.props.last_read["chapter_index"]+1}</p>
                            </IonCardHeader>
                        </IonCard>

                    </>

                    <CategoryCard title="Old Testament"/>
                    <CategoryCard title="New Testament"/>

                </>
                    

            </MainContent>
             
        )
    }
    
}

const mapStateToProps = state => {
    return {
        language : state.profile.language,
        first_start : state.profile.first_start_done,
        last_read : state.profile.last_read,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLanguage : (language) => { 
            dispatch(
                {
                    type: 'LANGUAGE', 
                    value: language
                }
            ) 
        },
        hot_load : () => { 
            dispatch(
                {
                    type: 'LOAD_HOT_PROFILE', 
                }
            ) 
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bible);