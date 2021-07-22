import React from "react"

import {connect} from 'react-redux'

import {
  IonTitle,
  IonButton,
  IonButtons,
  IonContent,
  IonBackButton,
  IonPage,
  IonToolbar,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSpinner,
} from '@ionic/react';

import search_function from "../../utility/GetSearch/search_function";

import { bible_list } from "../../utility/GetBible/getbible";

class SearchView extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            results : [],
            active : false,
            loading: false,
        }

        this.firstLoad = true

        this.searchRef = React.createRef()

        this.search_function = search_function()

        this.waitFn = null
    }

    changeLanguage(e){
        this.props.setLanguage(e.detail.value)
        
        this.search_function = search_function(this.props.language)
        
        this.setState({
            ...this.state,
            results: this.search_function(`${this.searchRef.current.value}`.toLowerCase())
        })
    }


    searchFn(e){
        if (this.waitFn) clearTimeout(this.waitFn)

        this.setState({
            ...this.state,
            loading: true,
        })

        this.waitFn = setTimeout(() => {
            this.setState({
                ...this.state,
                results: this.search_function(`${e.detail.value}`.toLowerCase()),
                loading: false,
            })
        }, 2500)
        
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
                        ...this.state,
                        active : true
                    })
                }
            }, 500)
        }

        if (this.props.match.params.search){
            this.searchRef.current.value = this.props.match.params.search
            
            this.setState({
                ...this.state,
                loading: true,
            })

            this.search_function = search_function(this.props.language)

            this.waitFn = setTimeout(() => {
                this.setState({
                    ...this.state,
                    results: this.search_function(`${this.props.match.params.search}`.toLowerCase()),
                    loading: false,
                })
            }, 2500)
        }
        
    }

    render(){
        return (
            <IonPage id="home-page">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/base/read" />
                    </IonButtons>
                    <IonTitle>Search The Bible</IonTitle>
                </IonToolbar>
                
                <IonToolbar>
                    <IonSearchbar ref={this.searchRef} onIonChange={this.searchFn.bind(this)}></IonSearchbar>
                </IonToolbar>

                <IonContent fullscreen>

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

                    {
                        this.state.loading ? <div className="ion-text-center ion-margin"><IonSpinner /></div> : <></>
                    }

                    {
                        this.state.results.map((e,i) => {
                            return(
                                <IonCard key={`searchresult_${i}`} button={true} routerLink={`/verse/${e.item.b}/${e.item.c}/${e.item.v}`}>
                                    <IonCardHeader>
                                        <IonCardTitle>{e.item.d}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <p>{`${e.item.a.toUpperCase().slice(0,1) + e.item.a.slice(1)}`}</p>
                                    </IonCardContent>
                                </IonCard>
                                
                            )
                        })
                    }

                    
                </IonContent>
            </IonPage>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
