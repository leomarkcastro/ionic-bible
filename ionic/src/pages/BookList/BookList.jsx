import React from "react"

import {connect} from 'react-redux'

import {
  IonTitle,
  IonButton,
  IonButtons,
  IonContent,
  IonBackButton,
  IonItem,
  IonLabel,
  IonPage,
  IonToolbar,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';

import getbible from "../../utility/GetBible/getbible";

class BookList extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            title : '',
            description : 'Description of the book',
            chapters: [],
            target: 0,
        }
    }

    componentDidMount(){
        let bible = getbible(this.props.language)
        let whatBook = Number(this.props.match.params.author)

        let curBook = bible[whatBook]

        this.setState({
            target: whatBook,
            title: curBook.fn,
            description: curBook.d,
            chapters: curBook.c.map((e,i) => {
                return(
                    {
                        text: `Chapter ${i+1}`,
                        description: curBook.cd[i],
                        number: i,
                    }
                )
            })
        })
    }

    render(){
        return (
            <IonPage id="home-page">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/base/read" />
                    </IonButtons>
                    <IonTitle>Browse The Bible</IonTitle>
                </IonToolbar>

                <IonContent fullscreen>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>{this.state.title}</IonCardTitle>
                            <p>{this.state.description}</p>
                        </IonCardHeader>
                        {
                            this.state.chapters.map((e, i) => {
                                return(
                                        <IonCard button key={`ChapterList_${i}`} routerLink={`/verse/${this.state.target}/${i}`}>
                                            <IonCardHeader>
                                                <IonCardTitle>{e.text}</IonCardTitle>
                                            </IonCardHeader>
                                            <IonCardContent>
                                                <p>{e.description}</p>
                                            </IonCardContent>

                                        </IonCard>
                                )
                            })
                        }
                        
                    </IonCard>
                    
                </IonContent>
            </IonPage>
        );
    }
  
}

const mapStateToProps = state => {
    return {
        language : state.profile.language
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

export default connect(mapStateToProps, {})(BookList);
