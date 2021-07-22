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
  IonTextarea,
  IonActionSheet,
  IonPopover,
  IonSpinner
} from '@ionic/react';

import style from "./NoteView.module.css"
import { 
    trash,
    share,
    closeOutline,
    ellipsisVertical,
    colorFill
} from "ionicons/icons";

import { shareDefault } from '../../utility/ShareFunctionality/Share'

import note_color from "../../theme/note_color";

class NoteView extends React.Component{

    constructor(props){
        super(props)

        this.firstLoad = true

        this.state = {
            active: false,
            toast : {
                active: false,
                message: "A Message",
                duration: 200
            },
            note: {
                note : "Product Content",
                title: "Title",
                color: "yellow"
            },
            popover : {
                delete : false,
                color: false,
            },
            actionSheet: false
        }

        this.titleRef = React.createRef()
        this.noteRef = React.createRef()

        this.colorList = note_color
    }

    shareNote(){
        shareDefault(this.state.note.note, this.state.note.title)
    }

    componentDidMount(){
        this.checkTextarea()
        this.checkTitleTextarea()
        this.loadNotes(5)
        this.loadContent()
    }

    loadContent(){
        let curNote = this.props.notelist[this.props.match.params.index]
        this.setState({
            ...this.state,
            note: {
                ...this.state.note,
                title : curNote?.title,
                note : curNote?.note,
                color: curNote?.color,
            }
        })
        
    }

    loadNotes(tries){
        if (tries>0){
            setTimeout(()=>{
                if (this.props.first_load_note === undefined){

                    let active = !this.props.first_load_note
                    if (active){
                        this.props.hotloadnote()
                        this.loadContent()
                        
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

    checkTextarea(){
        return this.noteRef.current?.getInputElement().then((element) => {
          if(element.style.height == '0px'){
           return  element.style.height = 'auto';
          } else {
            setTimeout(()=> this.checkTextarea(),100)};
          })
    }

    checkTitleTextarea(){
        return this.titleRef.current?.getInputElement().then((element) => {
          if(element.style.height == '0px'){
           return  element.style.height = 'auto';
          } else {
            setTimeout(()=> this.checkTitleTextarea(),100)};
          })
    }

    
    callAction(){
        this.setState({
            ...this.state,
            actionSheet: true
        })
    }

    callColor(val){
        this.setState(
            {   ...this.state, 
                popover : { 
                    ...this.state.popover, 
                    color: val}
                }
            )
    }

    callDelete(val){
        this.setState(
            {   ...this.state, 
                popover : { 
                    ...this.state.popover, 
                    delete: val}
                }
            )
    }

    actionDelete(){
        this.callDelete(false)
        this.props.deleteNote(this.props.match.params.index)
        //this.props.history.push("/base/notes")
        this.props.history.goBack()
    }

    actionColor(color){
        let noteNew = { 
            ...this.state.note, 
            color: color
        }

        this.setState(
            {   ...this.state, 
                note : noteNew
            }
            )
            
        this.updateNote(noteNew)
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


    changeTitle(e){
        this.setState({
            ...this.state,
            note : {
                ...this.state.note,
                title: e.detail.value
            }
        })
    }

    changeContent(e){
        this.setState({
            ...this.state,
            note : {
                ...this.state.note,
                note: e.detail.value
            }
        })
    }

    callUpdateNote(){
        this.updateNote()
    }

    updateNote(e = false){
        let note = this.state.note
        if(Boolean(e) === true){
            note = e
        }
        this.props.updateNote(
            this.props.match.params.index,
            note,
        )
    }

    render(){
        return (
            <IonPage id="home-page">

                <IonHeader>
                    <IonToolbar color={this.colorList[this.state.note.color]?.main}>
                        <IonButtons slot="start" >
                            <IonBackButton defaultHref={`/base/notes`} />
                        </IonButtons>
                        <IonTitle>Notes</IonTitle>
                        <IonButton 
                            slot="end" 
                            fill="clear" 
                            onClick={this.callAction.bind(this)}>
                            <IonIcon 
                                slot="icon-only" 
                                icon={ellipsisVertical}/>
                        </IonButton>

                        {/*
                            <IonButtons slot="end">

                                <IonButton>
                                    <IonIcon slot="icon-only" icon={colorFillOutline}/>
                                </IonButton>

                                <IonButton>
                                    <IonIcon slot="icon-only" icon={shareOutline}/>
                                </IonButton>
                                <IonButton>
                                    <IonIcon slot="icon-only" icon={trashBinOutline}/>
                                </IonButton>

                            </IonButtons>

                        */}

                    </IonToolbar>
                </IonHeader>

                <IonContent>

                    {
                        /*
                        this.state.active ?
                        <IonCard color={this.colorList[this.state.note.color]?.main} style={
                            {
                                borderTop : this.colorList[this.state.note.color]?.border
                            }
                        }>
                            <IonCardHeader>
                                
                                <IonCardTitle>
                                    <IonTextarea 
                                        onIonChange={this.changeTitle.bind(this)}
                                        placeholder={"Title of Note Here"}
                                        className={style.text_area_title}
                                        ref={this.titleRef}
                                        maxlength={100}
                                        rows={3}
                                        
                                        value={this.state.note.title}
                                        onIonBlur={this.callUpdateNote.bind(this)}
                                        ></IonTextarea>
                                </IonCardTitle>

                            </IonCardHeader>

                            <IonCardContent>
                                <IonTextarea
                                    onIonChange={this.changeContent.bind(this)}
                                    className={style.text_area}
                                    placeholder={"Content of Your Note Here"}
                                    autoGrow={true}
                                    ref={this.noteRef}

                                    value={this.state.note.note}

                                    onIonBlur={this.callUpdateNote.bind(this)}
                                    ></IonTextarea>
                            </IonCardContent>
                        </IonCard>
                        :
                        <div className="ion-text-center"><IonSpinner name="dots" color="primary"/></div>
                        */
                    }

                    {
                        this.state.active ?
                        <div color={this.colorList[this.state.note.color]?.main} style={
                                {
                                    borderTop : this.colorList[this.state.note.color]?.border,
                                    backgroundColor : this.colorList[this.state.note.color]?.background,
                                    color : this.colorList[this.state.note.color]?.color,
                                    height : "100%",
                                    padding: "2%",
                                }
                            }>

                            <div style={
                                {
                                    height: "max-content"
                                }
                            }>
                                <h1>
                                    <IonTextarea
                                    onIonChange={this.changeTitle.bind(this)}
                                    placeholder={"Title of Note"}
                                    autoGrow={true}
                                    ref={this.titleRef}

                                    value={this.state.note.title}

                                    onIonBlur={this.callUpdateNote.bind(this)}
                                    ></IonTextarea>
                                </h1>
                            </div>
                            
                            <div className="">
                                <IonTextarea
                                    onIonChange={this.changeContent.bind(this)}
                                    className={style.text_area}
                                    placeholder={"Content of Your Note Here"}
                                    autoGrow={true}
                                    ref={this.noteRef}

                                    value={this.state.note.note}

                                    onIonBlur={this.callUpdateNote.bind(this)}
                                ></IonTextarea>
                            </div>
                            
                        </div>
                        :
                        <div className="ion-text-center"><IonSpinner name="dots" color="primary"/></div>
                    }
                    
                    
                    
                    <IonToast
                        isOpen={this.state.toast.active}
                        onDidDismiss={() => this.closeToast()}
                        message={this.state.toast.message}
                        duration={this.state.toast.duration}
                    />

                    <IonActionSheet
                            isOpen={this.state.actionSheet}
                            onDidDismiss={() => this.setState({...this.state, actionSheet: false})}
                            buttons={
                                [
                                    {
                                    text: 'Delete',
                                    role: 'destructive',
                                    icon: trash,
                                    handler: this.callDelete.bind(this, true)
                                    }, 
                                    {
                                    text: 'Share',
                                    icon: share,
                                    handler: this.shareNote.bind(this)
                                    }, 
                                    {
                                    text: 'Select Note Color',
                                    icon: colorFill,
                                    handler: this.callColor.bind(this, true)
                                    }, 
                                    {
                                    text: 'Cancel',
                                    icon: closeOutline,
                                    role: 'cancel',
                                    handler: this.setState.bind({...this.state, actionSheet: false})
                                    }
                                ]
                            }
                        >
                    </IonActionSheet>
                    
                    {
                        this.state.popover.delete ? 
                        <IonPopover
                            isOpen={this.state.popover.delete}
                            onDidDismiss={this.callDelete.bind(this, false)}
                        >
                            <IonCard>
                                <IonCardHeader>Delete Current Note?</IonCardHeader>
                                <IonContent>
                                    <IonButtons>
                                        <IonButton onClick={this.actionDelete.bind(this)}>Yes</IonButton>
                                        <IonButton onClick={this.callDelete.bind(this,false)}>No</IonButton>
                                    </IonButtons>
                                </IonContent>
                            </IonCard>
                        </IonPopover>
                        :
                        <></>
                    }
                    
                    {
                        this.state.popover.color ? 
                        <IonPopover
                            isOpen={this.state.popover.color}
                            onDidDismiss={this.callColor.bind(this, false)}
                        >
                            <IonCard>
                                <IonCardHeader>Note Color Select</IonCardHeader>
                                <IonContent>
                                    <IonButtons className={`ion-text-center`}>
                                        {
                                            Object.keys(this.colorList).map((e,i) => {
                                                return (
                                                    <IonButton 
                                                        key={`color_select_${i}`}
                                                        onClick={this.actionColor.bind(this, e)} 
                                                        fill="solid" 
                                                        color={this.colorList[e].main}
                                                    >&nbsp;</IonButton>
                                                )
                                            })
                                        }
                                        
                                    </IonButtons>
                                </IonContent>
                            </IonCard>
                        </IonPopover>
                        :
                        <></>
                    }


                </IonContent>
            </IonPage>
        );
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
        updateNote : (index, noteDat) => {
            dispatch(
                {
                    type: 'NOTE_UPDATE', 
                    value : {
                        index : index,
                        title : noteDat.title,
                        note : noteDat.note,
                        color : noteDat.color,
                        last : "000000",
                    }
                }
            ) 
        },
        deleteNote : (index) => {
            dispatch(
                {
                    type: 'NOTE_REMOVE',
                    value: index
                }
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteView);