import React from "react"
import { connect } from "react-redux"

import {
  IonTitle,
  IonButton,
  IonButtons,
  IonContent,
  IonBackButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonPage,
  IonToolbar,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonToast,
  IonHeader,
} from '@ionic/react';

import style from "./BookView.module.css"

import { chevronBackOutline, chevronForwardOutline, ellipsisHorizontal, ellipsisVertical, playSkipBackOutline, playSkipForwardOutline } from 'ionicons/icons';

import getbible , { bible_list } from "../../utility/GetBible/getbible";
import VerseText from "../../components/VerseText/VerseText";



class BookView extends React.Component{

    constructor(props){
        super(props)

        this.firstLoad = true

        this.state = {
            active : false,
            title : '',
            verses: [],
            chapter: 0,
            book: 0,
            maxChapter: 1000,
            maxBook: 1000,
            toast : {
                active: false,
                message: "A Message",
                duration: 200
            }
        }

        this.bible = getbible()

        this.scrollRef = React.createRef()

        this.customAlertOptions = {
            header: 'Select Bible Language',
            subHeader: 'In what language do you want to read the bible',
            translucent: true
          };

          this.scrolltoverse = this.scrolltoverse.bind(this)
    }

    componentDidMount(){
        this.init_book()
        this.scrolltoverse()
    }

    init_book(){
        this.bible = getbible(this.props.language)
        let whatBook = Number(this.props.match.params.author)
        let whatChapter = Number(this.props.match.params.chapter)

        this.props.setLastRead(whatBook, whatChapter)

        let curBook = this.bible[whatBook]

        this.setState({
            ...this.state,
            book: whatBook,
            chapter: whatChapter,
            title: curBook.n,
            d_title: curBook.dn,
            verses: curBook.c[whatChapter],
            desc: curBook.cd[whatChapter],
            maxChapter: curBook.c.length,
            maxBook: this.bible.length,
        })
    }

    loadBook(){
        
        this.bible = getbible(this.props.language)
        let whatBook = this.state.book
        let whatChapter = this.state.chapter

        this.props.setLastRead(whatBook, whatChapter)

        let curBook = this.bible[whatBook]

        this.setState({
            ...this.state,
            book: whatBook,
            chapter: whatChapter,
            title: curBook.n,
            d_title: curBook.dn,
            verses: curBook.c[whatChapter],
            desc: curBook.cd[whatChapter],
            maxChapter: curBook.c.length,
            maxBook: this.bible.length,
        })
    }

    scrolltoverse(){
        if (this.props.match.params.verse){

            setTimeout(() => {
                let whatVerse = Number(this.props.match.params.verse)

                let target = document.querySelector(`#VerseText_${whatVerse}`)
                if (target){
                    target.scrollIntoView({ behavior: 'smooth' })
                    //target.scrollTop -= 50;
                }
            }, 1000)

            setTimeout(() => {
                let whatVerse = Number(this.props.match.params.verse)

                let target = document.querySelector(`#VerseText_${whatVerse}`)
                if (target){
                    target.classList = `${target.classList} animate__animated animate__headShake`
                    //target.scrollTop -= 50;
                }
            }, 2000)

        }
    }

    init_language(){
        let prof_firstStart = !Boolean(this.props.first_start)
        if (prof_firstStart && this.firstLoad){
            let active = true

            this.setState({
                ...this.state,
                active: !active
            })

            setTimeout(()=>{
                if (this.firstLoad && prof_firstStart ){
                    this.props.hot_load()
                    this.firstLoad = false
                    this.setState({
                        ...this.state,
                        active : true
                    })
                }
            }, 500)
        }
    }

    changeLanguage(e){
        this.props.setLanguage(e.detail.value)
        this.loadBook()
    }


    getNewVerse(direction){
        let whatBook = Number(this.state.book)
        let whatChapter = Number(this.state.chapter) + direction

        this.props.setLastRead(whatBook, whatChapter)

        let curBook = this.bible[whatBook]

        this.setState({
            ...this.state,
            book: whatBook,
            chapter: whatChapter,
            title: curBook.n,
            verses: curBook.c[whatChapter],
            desc: curBook.cd[whatChapter],
            maxChapter: curBook.c.length,
            maxBook: this.bible.length,
        })
        this.scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    getNewBook(direction){
        let whatBook = Number(this.state.book) + direction
        let whatChapter = 0

        this.props.setLastRead(whatBook, whatChapter)

        let curBook = this.bible[whatBook]

        this.setState({
            ...this.state,
            book: whatBook,
            chapter: whatChapter,
            title: curBook.n,
            verses: curBook.c[whatChapter],
            desc: curBook.cd[whatChapter],
            maxChapter: curBook.c.length,
            maxBook: this.bible.length,
        })
        this.scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
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

    render(){
        return (
            <IonPage id="home-page">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref={`/`} />
                        </IonButtons>
                        <IonTitle>{this.state.title} Chapter {this.state.chapter+1}</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonToolbar ref={this.scrollRef}>
                        <IonButtons slot="start">
                            {
                                this.state.book >= 1 ?
                                <IonButton onClick={this.getNewBook.bind(this,-1)}>
                                    <IonIcon slot="icon-only" icon={playSkipBackOutline} />
                                </IonButton>
                                : <></>
                            }
                            
                            {
                                this.state.chapter >= 1 ?
                                <IonButton onClick={this.getNewVerse.bind(this,-1)}>
                                    <IonIcon slot="icon-only" icon={chevronBackOutline}/>
                                </IonButton>
                                : <></>
                            }
                        </IonButtons>

                        <IonButtons slot="end">
                            
                            {
                                this.state.chapter+1 < this.state.maxChapter ?

                                <IonButton onClick={this.getNewVerse.bind(this,1)}>
                                    <IonIcon slot="icon-only" icon={chevronForwardOutline}/>
                                </IonButton>
                                                                
                                : <></>
                            }
                            {
                                this.state.book+1 < this.state.maxBook ?

                                <IonButton onClick={this.getNewBook.bind(this,1)}>
                                    <IonIcon slot="icon-only" icon={playSkipForwardOutline} />
                                </IonButton>
                                                               
                                : <></>
                            }
                        </IonButtons>

                        <IonSelect 
                            okText="Select" 
                            cancelText="Dismiss" 
                            onIonChange={this.changeLanguage.bind(this)} 
                            value={this.props.language}
                            interfaceOptions={this.customAlertOptions}
                        >
                            {
                                Object.keys(bible_list).map((e,i) => {
                                    return(<IonSelectOption key={`language_${e}`} value={e}>{bible_list[e]}</IonSelectOption>)
                                })
                            }
                        </IonSelect>

                    </IonToolbar>

                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>{this.state.title} Chapter {this.state.chapter+1}</IonCardTitle>
                            <p>{this.state.desc}</p>
                        </IonCardHeader>

                        {/*
                        <div className={style.banner_img}></div>
                        */}

                        <IonCardContent>
                            <div>
                                {
                                    this.state.verses.map((e, i) => {
                                        return(
                                            <VerseText 
                                                key={`VerseText_${i}`} 
                                                id={`VerseText_${i}`} 
                                                number={i+1} 
                                                verse={e} 
                                                d_title={this.state.d_title} 
                                                author={this.state.title} 
                                                chapter={this.state.chapter+1} 
                                                book_code={Number(this.props.match.params.author)} 
                                                onFavorite={this.showToast.bind(this, `Verse [${this.state.title} ${this.state.chapter+1}:${i+1}] Added To Favorite!`, 1000)}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </IonCardContent>
                    </IonCard>
                    {
                        /*
                        this.state.chapter+1 < this.state.maxChapter ?
                        
                        <div className={"ion-text-center " + style.nav}>
                            <IonButton fill="clear"  onClick={this.getNewVerse.bind(this,1)}>Next Chapter</IonButton>
                        </div>
                        : <></>
                        */
                    }

                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={this.getNewBook.bind(this,-1)}>
                                <IonIcon slot="icon-only" icon={playSkipBackOutline} />
                            </IonButton>
                            
                            {
                                this.state.chapter >= 1 ?
                                <IonButton onClick={this.getNewVerse.bind(this,-1)}>
                                    <IonIcon slot="icon-only" icon={chevronBackOutline}/>
                                </IonButton>
                                : <></>
                            }
                        </IonButtons>

                        <IonButtons slot="end">
                            
                            {
                                this.state.chapter+1 < this.state.maxChapter ?

                                <IonButton onClick={this.getNewVerse.bind(this,1)}>
                                    <IonIcon slot="icon-only" icon={chevronForwardOutline}/>
                                </IonButton>
                                                                
                                : <></>
                            }
                            <IonButton onClick={this.getNewBook.bind(this,1)}>
                                <IonIcon slot="icon-only" icon={playSkipForwardOutline} />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>

                    
                    <IonToast
                        isOpen={this.state.toast.active}
                        onDidDismiss={() => this.closeToast()}
                        message={this.state.toast.message}
                        duration={this.state.toast.duration}
                    />
                    
                </IonContent>
            </IonPage>
        );
    }
  
}

const mapStateToProps = state => {
    return {
        language : state.profile.language,
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
        setLastRead : (book, chapter) => { 
            dispatch(
                {
                    type: 'LASTREAD', 
                    value: {
                        book: book,
                        chapter: chapter
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(BookView);
