import React from "react"
import { connect } from "react-redux"

import { 
    IonSpinner, 
    IonToast,
    IonSegment, 
    IonSegmentButton, 
    IonLabel,
} from '@ionic/react';

import style from "./Stars.module.css"

import MainContent from "../../components/MainContent/MainContent";
import FavoriteCard from "../../components/FavoriteCard/FavoriteCard";

import getbible, {bible_list} from "../../utility/GetBible/getbible";

import ShareCard from "../../components/ShareCard/ShareCard";

import background from "./stars.jpg"


class Stars extends React.Component {

    constructor(props){
        super(props)
        this.firstLoad = true

        this.state = {
            active : false,
            toast : {
                active: false,
                message: "A Message",
                duration: 200
            },
            share : {
                selected : false,
                verse : "",
                author : "",
                chapter : "",
                number : "",
            }
        }

        this.bible = getbible()

    }


    load_language(){
        let prof_firstStart = !Boolean(this.props.first_start)
        if (prof_firstStart && this.firstLoad){
            let active = true
            this.setState({active: !active})
            setTimeout(()=>{
                if (this.firstLoad && prof_firstStart ){
                    this.props.hot_load_language()
                    this.firstLoad = false
                    this.setState({
                        active : true
                    })
                }
            }, 500)
        }
        
    }

    changeLanguage(e){
        this.props.setLanguage(e.detail.value)
    }


    loadVerses(tries){
        if (tries>0){
            setTimeout(()=>{
                if (this.props.first_load_favorite !== undefined){
                    let active = !this.props.first_load_favorite
                    this.setState({active: !active})
                    if (active){
                        this.props.hot_load_favorite()
                    
                        this.firstLoad = false
                        this.setState({
                            active : true
                        })
                        if(this.props.favorites == 0){
                            this.loadVerses(tries-1)
                        }
                    }

                }else{
                    this.setState({
                        active : true
                    })
                }
                
                
            }, 500)
        }
       
    }

    componentDidMount(){
        let tries = 5
        this.loadVerses(tries)
        this.load_language()
        
        
        this.bible = getbible(this.props.language)
    }

    showToast(message, duration=200){
        let st = {
            active : true,
            message: message,
            duration: duration
        }
        this.setState({
            ...this.state,
            toast : st
        })
    }

    closeToast(){
        let st = {
            ...this.state.toast,
            active : false
        }
        this.setState({
            ...this.state,
            toast : st
        })
    }

    callShare(verse, author, chapter, number){
        this.setState({
            ...this.state,
            share: {
                verse: verse,
                author: author,
                chapter: chapter,
                number: number,
                selected : true
            }
        })
    }

    dismiss(){
        let share = { ...this.state.share }
        this.setState({
            ...this.state,
            share: {
                ...share,
                selected : false
            }
        })
    }

    render(){

        this.bible = getbible(this.props.language)

        return (

            <MainContent title="Stars" styleImage={`"${background}"`}>
                
                <React.Fragment>

                    <IonSegment onIonChange={this.changeLanguage.bind(this)} mode="ios" value={this.props.language} scrollable={true} className={style.segment}>
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

                    {   
                        this.state.active ?
                        
                        this.props.favorites?.map((d,i) => {
                            let v = this.bible[Number(d.c_book)].c[Number(d.c_chapter)-1][Number(d.c_verse)-1]
                            let a = this.bible[Number(d.c_book)].n
                            return (
                                <FavoriteCard 
                                    key={`Stars_${i}`} 
                                    source={d.source} 
                                    verse={v} 
                                    index={i} 
                                    b={Number(d.c_book)} 
                                    c={Number(d.c_chapter)-1} 
                                    v={Number(d.c_verse)-1} 
                                    time={d.date} 
                                    onDelete={this.showToast.bind(this, "Verse Deleted", 1000)} 
                                    onShare={this.callShare.bind(this,v, a, d.c_chapter, d.c_verse)}
                                />
                            )
                        })
                        :
                        <div className="ion-text-center"><IonSpinner name="dots" color="primary"/></div>
                    }

                    <ShareCard 
                        
                        selected={this.state.share.selected} 
                        
                        verse={this.state.share.verse}
                        author={this.state.share.author}
                        chapter={this.state.share.chapter}
                        number={this.state.share.number}
                        dismiss={this.dismiss.bind(this)}

                    />

                    <IonToast
                        isOpen={this.state.toast.active}
                        onDidDismiss={() => this.closeToast()}
                        message={this.state.toast.message}
                        duration={this.state.toast.duration}
                    />

                </React.Fragment>
                    

            </MainContent>
            
                        

            
        )
    }
    
}

const mapStateToProps = state => {
    return {
        favorites : state.favorites.verses,
        first_load_favorite : state.favorites.first_load_done,
        
        language : state.profile.language,
        first_start : state.profile.first_start_done,
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
        setLanguage : (language) => { 
            dispatch(
                {
                    type: 'LANGUAGE', 
                    value: language
                }
            ) 
        },
        hot_load_language : () => { 
            dispatch(
                {
                    type: 'LOAD_HOT_PROFILE', 
                }
            ) 
        },
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

export default connect(mapStateToProps, mapDispatchToProps)(Stars)