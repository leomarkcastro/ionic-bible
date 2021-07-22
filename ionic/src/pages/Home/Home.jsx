import React from "react"
import axios from "axios"

import { connect } from "react-redux"
import getbible from "../../utility/GetBible/getbible";

import MainContent from "../../components/MainContent/MainContent";

import { IonCard, IonCardHeader, IonCardContent, IonIcon, IonCardSubtitle,  IonCardTitle, IonItem, IonLabel, IonButton } from '@ionic/react';
import { bookOutline, clipboardOutline, cloudUpload, heartOutline, informationCircle, logoFacebook, logoGooglePlaystore, logoTwitter, searchCircleOutline, searchOutline, settings, settingsOutline, starOutline } from 'ionicons/icons';

import getvod from "../../utility/GetVOD/getvod";

import style from "./Home.module.css"

import background from "./home.jpg"

class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            verse: "Loading today's verse of the day...",
            author: "The Good Book",
            loadStarred: false,
        }
        
        this.bible = getbible()

        //  this.props.first_load_settings()
    }

    

    loadVerses(tries){
        if (tries>0){
            setTimeout(()=>{
                if (this.props.first_load_favorite !== undefined){
                    let active = !this.props.first_load_favorite
                    if (active){
                        this.props.hot_load_favorite()
                    
                        if(this.props.favorites == 0){
                            this.loadVerses(tries-1)
                        }else{
                            this.setCurrentStarredVerse()
                        }

                    }

                }
            }, 1000)
        }
        else{
            this.setCurrentStarredVerse()
        }
       
    }

    loadSettings(tries){
        if (tries>0){
            setTimeout(()=>{
                if (this.props.first_load_settings === undefined){
                    console.log("yo")
                    this.props.hot_load_settings()
                }
            }, 250)
        }
        else{
            this.setCurrentStarredVerse()
        }
       
    }


    componentDidMount(){
        this.verseToday()
    }

    getRandom(li){
        return li[Math.floor(Math.random() * li.length)]
    }

    getNewStarredVerse(){
        let day = this.get365Day()

        if (this.props.starred_verse.lastCheck != day){
            
            let randomVerse = this.getRandom(this.props.favorites)
            this.props.starred_verse_set(
                day, 
                this.bible[randomVerse.c_book].c[randomVerse.c_chapter-1][randomVerse.c_verse-1],
                randomVerse.id,
            )
        } 

    }

    setCurrentStarredVerse(){
        this.bible = getbible(this.props.language)

        this.getNewStarredVerse()

        this.setState({
            ...this.state,
            loadStarred : true
        })
    }

    getDateToday(){
        let objToday = new Date()

        let weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')
        let dayOfWeek = weekday[objToday.getDay()]
        let domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }()
        let dayOfMonth = ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder
        let months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')
        let curMonth = months[objToday.getMonth()]
        let curYear = objToday.getFullYear()
        //let curMeridiem = objToday.getHours() > 12 ? "PM" : "AM"

        let greetOfDay = ""
        if (objToday.getHours() <= 12){
            greetOfDay = "Morning"
        }
        else if (objToday.getHours() <= 18){
            greetOfDay = "Afternoon"
        }
        else{
            greetOfDay = "Evening"
        }

        //let today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;

        let today = `Good ${greetOfDay}! Today is ${dayOfWeek}, ${dayOfMonth} of ${curMonth} ${curYear}`
        
        return today
    }

    async verseToday2(){
        let verse = await axios.get('https://beta.ourmanna.com/api/v1/get/?format=text')
        let state = {...this.state}
        verse = verse.data.split(" - ")
        state.verse = verse[0]
        state.author = verse[1]

        this.setState(state)
    }

    get365Day(){
        let now = new Date();
        let start = new Date(now.getFullYear(), 0, 0);
        let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        let oneDay = 1000 * 60 * 60 * 24;
        let day = Math.floor(diff / oneDay);

        return day
    }

    verseToday(){

        let verse = getvod()
        let st = {...this.state}

        let dateToday = this.get365Day()
        verse = verse[dateToday]

        st.verse = verse[0]
        st.author = verse[1]

        this.setState(st)
    }

    render(){
        return (
            
            <MainContent styleImage={`"${background}"`}>

                <React.Fragment>
                
                    <p className={style.quote}>{this.state.verse}</p>
                    <p className={style.buttons} ></p>
                    <p className={style.quote_book}>
                        <sup><IonButton fill="clear" size="small" routerLink={`/search/${this.state.author}`}><IonIcon icon={searchOutline} slot="icon-only" /></IonButton></sup>
                        <i>{this.state.author}</i>
                    </p>
                    
                    
                    <p className={style.greeting}>{this.getDateToday()}</p>

                    {
                        false ?
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Ads Card Maybe</IonCardTitle>
                                <IonCardSubtitle>Place the Company Name Here</IonCardSubtitle>
                            </IonCardHeader>

                            <IonCardContent>
                                <img src="https://i.swncdn.com/media/800w/via/9145-woman-praying-gettyimages-made-suta-eyeem.jpg"/>
                            </IonCardContent>
                        </IonCard>
                        : <></>
                        
                    } 
                    

                    <IonCard>
                        <IonItem>
                            <IonIcon icon={clipboardOutline} slot="start" />
                            <IonLabel>Notes</IonLabel>
                            {
                                this.props.last_note ?
                                <IonButton fill="outline" slot="end" routerLink={`/notes/${this.props.last_note ? this.props.last_note : false}`}>Visit</IonButton>
                                :
                                <></>
                            }
                        </IonItem>

                        {
                            this.props.last_note ?
                            <IonCardContent>
                                <h2>{this.props.notes[this.props.last_note]?.title.slice(0,50)}</h2>
                                <br/>
                                <p>{this.props.notes[this.props.last_note]?.note.slice(0,500)}...</p>
                            </IonCardContent>
                            :
                            <IonCardContent>
                                Your latest note will display here if you have one
                            </IonCardContent>

                        }
                        
                    </IonCard>
                    
                    {/*
                    <IonCard>
                        <IonItem>
                            <IonIcon icon={starOutline} slot="start" />
                            <IonLabel>Starred</IonLabel>
                            <IonButton fill="outline" slot="end" routerLink={`/search/${this.props.starred_verse.starred_author}`}>Visit</IonButton>
                        </IonItem>

                        <IonCardContent>
                            {!this.state.loadStarred ? 
                            <p>Your favorite verses would appear here once you saved one!</p>
                            :
                            <>
                                <p className={style.starred_verse}>{this.props.starred_verse.starred_verse}</p>
                                <p className={style.starred_author}>{this.props.starred_verse.starred_author}</p>
                            </>
                            }
                        </IonCardContent>
                    </IonCard>
                    */}
                            
                    <IonCard>
                        <IonItem>
                            <IonIcon icon={bookOutline} slot="start" />
                            <IonLabel>Bible</IonLabel>
                            <IonButton fill="outline" slot="end" routerLink={`/verse/${this.props.last_read.book_index}/${this.props.last_read.chapter_index}`}>Read Now</IonButton>
                        </IonItem>

                        <IonCardContent>
                            <p>You left reading at {this.bible[this.props.last_read.book_index].n} Chapter {this.props.last_read.chapter_index + 1}</p>
                            <hr/>
                            <p>{this.bible[this.props.last_read.book_index].c[this.props.last_read.chapter_index][0].slice(0, 150)}...</p>
                        </IonCardContent>
                    </IonCard>

                    

                    <IonCard>
                        <IonItem routerLink="/settings">
                            <IonIcon icon={settings} slot="start" />
                            <IonLabel>Settings</IonLabel>
                        </IonItem>

                        <IonItem routerLink="/account">
                            <IonIcon icon={cloudUpload} slot="start" />
                            <IonLabel>Backup or Restore Data</IonLabel>
                        </IonItem>

                        <IonItem routerLink="/about">
                            <IonIcon icon={informationCircle} slot="start" />
                            <IonLabel>About the Developers</IonLabel>
                        </IonItem>
                    </IonCard>

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
        last_read : state.profile.last_read,
        starred_verse : state.profile.starred_verse,

        notes: state.note.notes,
        last_note : state.note.lastEdit,

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
        starred_verse_set : (date, verse, author) => { 
            dispatch(
                {
                    type: 'STARRED_VERSE_SET', 
                    value: {
                        date : date,
                        author : author,
                        verse : verse,
                    }
                }
            ) 
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)