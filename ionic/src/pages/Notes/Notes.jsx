import React from "react"
import { connect } from "react-redux"

import { 
    IonSpinner, 
    IonToast,
    IonSegment, 
    IonSegmentButton, 
    IonLabel,

    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,

    IonFab,
    IonFabButton,

    IonIcon
} from '@ionic/react';

import { 
    addOutline
} from "ionicons/icons";

import note_color from "../../theme/note_color";

import style from "./Notes.module.css"

import MainContent from "../../components/MainContent/MainContent";

import getbible from "../../utility/GetBible/getbible";


import background from "./notes.jpg"

class Notes extends React.Component {

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
        }

        this.bible = getbible()

        this.colorList = note_color

    }

    componentDidMount(){
        this.loadNotes(5)
    }

    loadNotes(tries){
        if (tries>0){
            setTimeout(()=>{
                if (this.props.first_load_note === undefined){
                    let active = !this.props.first_load_note
                    if (active){
                        this.props.hotloadnote()
                        this.setState({
                            ...this.state,
                            active: true
                        })
                    
                        this.firstLoad = false
                        if(this.props.favorites == 0){
                            this.loadVerses(tries-1)
                        }
                    }

                }
                else{
                    this.setState({
                        ...this.state,
                        active: true
                    })
                }
                
            }, 500)
        }
       
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

    createNewNote(){
        console.log(this.props.notelist.length)
        this.props.newNote()
        this.props.history.push(`/notes/${this.props.notelist.length}`)
    }

    render(){

        this.bible = getbible(this.props.language)

        return (

            <MainContent title="Notes" styleImage={`"${background}"`} fab={
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={this.createNewNote.bind(this)}>
                        <IonIcon icon={addOutline}/>
                    </IonFabButton>
                </IonFab>
            }>

                
                
                <React.Fragment>

                    {   
                        this.state.active ?
                        
                        this.props.notelist.map((e,i) => {
                            return (
                                <IonCard 
                                    key={`notes_list_${i}`}
                                    className={style.note_base} 
                                    color={this.colorList[e.color].main} 
                                    button={true} routerLink={`/notes/${i}`}
                                    style = {
                                        {
                                            borderTop : this.colorList[e.color].border
                                        }
                                    }
                                >
                                    <IonCardHeader>
                                        <IonCardTitle>{e.title.slice(0,50)}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <p>{e.note.slice(0,200)}</p>
                                    </IonCardContent>
                                </IonCard>
                            )
                        })
                        :
                        <div className="ion-text-center"><IonSpinner name="dots" color="primary"/></div>
                    }

                    

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
        notelist : state.note.notes,
        first_load_note : state.note.first_start_done,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hotloadnote : () => { 
            dispatch(
                {
                    type: 'LOAD_HOT_NOTE', 
                }
            ) 
        },
        newNote : () => {
            dispatch(
                {
                    type: 'NOTE_ADD',
                    value: {
                        title : "",
                        note: "",
                        color: "yellow"
                    }
                }
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);