import React from "react"
import { connect } from "react-redux"

import {
  IonItemSliding,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonButton,
  IonButtons,
  IonPopover,
  IonIcon
} from '@ionic/react';


import { star, starOutline, shareOutline } from 'ionicons/icons';

import ShareCard from "../ShareCard/ShareCard";

import style from "./VerseText.module.css"

class VerseText extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            selected: false,
            favorited: false,
        }
        this.click = 0

        this.sliderRef = React.createRef()
    }

    selected(){
        this.click += 1
        if ((this.click == 1) || true){
            this.setState({
                selected: !this.state.selected,
                favorited: this.state.favorited
            })
            this.click = 0
        }
        
    }

    dismiss(){
        this.setState({
            selected: false,
            favorited: this.state.favorited
        })
        this.click = 0
    }

    getDateToday(){
        let objToday = new Date()

        let dayOfMonth = ( objToday.getDate() < 10) ? '0' + objToday.getDate(): objToday.getDate()
        let months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')
        let curMonth = months[objToday.getMonth()]
        let curYear = objToday.getFullYear()
        let curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : objToday.getHours()
        let curMinute = objToday.getMinutes()
        let curMeridiem = objToday.getHours() > 12 ? "PM" : "AM"

        let today = `${curHour}:${curMinute} ${curMeridiem} ${curMonth} ${dayOfMonth}, ${curYear}`
        
        return today
    }

    addToFavorite(){
        let id = `${this.props.d_title} ${this.props.chapter}:${this.props.number}`.toLowerCase()

        if (!this.props.favorite_list.includes(id)){
            this.props.favorite(
                `${this.props.author} ${this.props.chapter}:${this.props.number}`,
                this.getDateToday(),
                id,
                {
                    c_book: this.props.book_code,
                    c_chapter: this.props.chapter,
                    c_verse: this.props.number,
                }
            )

            let comp = this.sliderRef.current
            if (comp){
                comp.style.cssText = ""
            }

            this.setState({
                selected: false,
                favorited: true,
            })

            //this.dismiss()

            this.props.onFavorite()
        }
        else{
            console.log("Verse already in stars")
        }
        
    }

    componentDidMount(){
        let id = `${this.props.d_title} ${this.props.chapter}:${this.props.number}`.toLowerCase()
        this.setState({
            favorited: this.props.favorite_list.includes(id),
            selected: this.state.selected
        })

    }

    render(){
        return (
            <IonItemSliding id={this.props.id}>

                <IonItem ref={this.sliderRef}>
                    <p className={`${style.verse} ${this.state.selected ? "none" : "none"}`}><sup className={(this.state.favorited ? style.favorite : style.number)}>{this.props.number}</sup> {this.props.verse}</p>
                </IonItem>
                
                <ShareCard 
                    
                    selected={this.state.selected} 
                    
                    verse={this.props.verse}
                    author={this.props.author}
                    chapter={this.props.chapter}
                    number={this.props.number}
                    dismiss={this.dismiss.bind(this)}

                    addToFavorite={this.addToFavorite.bind(this)}
                    favorited={this.state.favorited}
                />

                <IonItemOptions side="end">
                    <IonItemOption color="light" onClick={this.selected.bind(this)}>Share</IonItemOption>
                </IonItemOptions>
            </IonItemSliding>
        );
    }
  
}



const mapStateToProps = state => {
    return {
        favorite_list : state.favorites.verseDat
    }
}

const mapDispatchToProps = dispatch => {
    return {
        favorite : (source, date, id, c_data) => { 
            dispatch(
                {
                    type: 'ADD', 
                    value: {
                        source: source,
                        date: date,
                        id: id,
                        c_book: c_data.c_book,
                        c_chapter: c_data.c_chapter,
                        c_verse: c_data.c_verse,
                    }
                }
            ) 
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerseText)
