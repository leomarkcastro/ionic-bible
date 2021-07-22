import React from "react"
import { connect } from "react-redux"

import PropTypes from "prop-types"

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

import style from "./ShareCard.module.css"

import { shareDefault } from '../../utility/ShareFunctionality/Share'


class ShareCard extends React.Component{

    constructor(props){
        super(props)
    }

    shareVerse(){
        let message=`Verse of the Day!\n\n${this.props.verse}\n\n${this.props.author} ${this.props.chapter}:${this.props.number}\n\nGod Bless Everyone`
        shareDefault(message, "Bible Verse of the Day!")
    }

    render(){
        return (
            <>
            {this.props.selected ? 
                <IonPopover
                    cssClass='my-custom-class'
                    event={() => {}}
                    isOpen={this.props.selected}
                    onDidDismiss={this.props.dismiss.bind(this)}
                >
                    <div className={style.share}>   
                        <p className={`${style.verse}`}>{this.props.verse}</p>
                        <p className={`${style.verse}`}>{`${this.props.author} ${this.props.chapter}:${this.props.number}`}</p>
                        <IonButtons>
                            {
                                this.props.addToFavorite ?
                                    !this.props.favorited ?
                                    <IonButton 
                                        size="small" 
                                        color="primary" 
                                        onClick={this.props.addToFavorite.bind(this)}>
                                            <IonIcon icon={starOutline}/>
                                    </IonButton>
                                    :
                                    <IonButton 
                                        size="small" 
                                        color="warning" 
                                        fill="clear" 
                                        disabled>
                                            <IonIcon icon={star}/>
                                    </IonButton>
                                :
                                <></>
                            }
                            <IonButton 
                                size="small" 
                                fill="clear" 
                                color="primary"
                                onClick={this.shareVerse.bind(this)}
                                >
                                    <IonIcon icon={shareOutline}/>
                            </IonButton>
                        </IonButtons>
                        
                    </div>
                </IonPopover>
            : <></>}
            </>
        );
    }
  
}

ShareCard.propTypes = {
    selected : PropTypes.bool,
    favorited : PropTypes.bool, // an array

    verse: PropTypes.string,
    author: PropTypes.any,
    chapter: PropTypes.any,
    number: PropTypes.any,

    dismiss : PropTypes.func,
    addToFavorite : PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(ShareCard)
