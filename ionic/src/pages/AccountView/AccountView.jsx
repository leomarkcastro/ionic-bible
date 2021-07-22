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
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonToggle,
  IonItemDivider,
  IonCard,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonIcon,
  IonCardTitle,
  IonCardContent,
  IonCardHeader
} from '@ionic/react';
import { chevronBack, reorderFourOutline, reorderTwoOutline, sunny } from "ionicons/icons";

import style from "./AccountView.module.css"

import * as fb from "../../utility/Firebase/firebaseMain"

class AccountView extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            username : "",
            password : "",
            warning: "",
            email : "",
            uid: "",
        }

    }

    componentDidMount(){
        fb.hookAccount((e)=>{
            if (e){
                this.setState({
                    ...this.state,
                    email : e.email,
                    uid: e.uid,
                })
            }
            else if (this.state.email){
                this.setState({
                    ...this.state,
                    email : "",
                    uid: "",
                })
            }
        })
    }

    getDateToday(){
        let objToday = new Date()

        //let today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;

        
        return objToday
    }

    showError(e){
        this.setState({
            ...this.state,
            warning: e.message
        })
    }

    signin(){
        fb.loginUser(this.state.username, this.state.password, this.showError.bind(this))
    }

    signup(){
        fb.registerUser(this.state.username, this.state.password, this.showError.bind(this))
    }

    signinGoogle(){
        fb.loginUserGoogle()
    }

    signout(){
        fb.logoutUser()
    }

    changeValue(what, e){
        this.state[what] = e.detail.value
    }

    backup(){

        console.log(this.state.uid, {
            owner: this.state.uid,
            lastModify: new Date(),
            settings: this.props.setting,
            notes: this.props.note,
            profile: this.props.profile,
            favorite: this.props.favorite,
        })
        fb.message_write(this.state.uid, {
            owner: this.state.uid,
            lastModify: new Date(),
            settings: this.props.setting,
            notes: this.props.note,
            profile: this.props.profile,
            favorite: this.props.favorite,
        })

        this.props.updateLastBackup()
    }

    async restore(){

        let data = await fb.message_read(this.state.uid)

        this.props.restoreData(data)
    }

    render(){
        return (
            <IonPage id="home-page">
                <IonToolbar>
                    <IonButtons slot="start">
                            <IonBackButton defaultHref={`/`} />
                    </IonButtons>
                    <IonTitle>Account</IonTitle>
                </IonToolbar>
                
                <IonContent>
                    
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Account</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                                {
                                    this.state.email ? 
                                    <>
                                        <p>Account: {this.state.email}</p>
                                        <br/>
                                        <br/>
                                        <IonButton expand="block" onClick={this.signout.bind(this)}>Sign Out</IonButton>
                                    </>
                                    :
                                    <>
                                        <IonList>
                                            <IonItem>
                                                <IonLabel position="stacked">Email</IonLabel>
                                                <IonInput
                                                    value={this.state.username} 
                                                    onIonChange={this.changeValue.bind(this, "username")}></IonInput>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel position="stacked">Password</IonLabel>
                                                <IonInput 
                                                    type="password" 
                                                    value={this.state.password} 
                                                    onIonChange={this.changeValue.bind(this, "password")}></IonInput>
                                            </IonItem>
                                            <div className="ion-text-center">
                                                {this.state.warning ? <IonLabel color="danger">{this.state.warning}</IonLabel> : <></>}
                                            </div>
                                            
                                        </IonList>

                                        <br/>

                                        <IonButton expand="block" onClick={this.signin.bind(this)}>Sign In</IonButton>
                                        <IonButton expand="block" onClick={this.signup.bind(this)}>Sign Up</IonButton>
                                    </>
                                }
                                
                        </IonCardContent>
                    </IonCard>
                    
                    {
                        this.state.email ? 
                        <IonCard>

                            <IonCardHeader>
                                <IonCardTitle>Backup and Restore</IonCardTitle>
                            </IonCardHeader>

                            <IonCardContent>

                                <IonButton expand="block" onClick={this.backup.bind(this)}>Backup Now</IonButton>
                                <IonButton expand="block" onClick={this.restore.bind(this)}>Restore</IonButton>

                                <br/>

                                {this.props.lastBackup ? <div className="ion-text-center"><p>{JSON.stringify(this.props.lastBackup)}</p></div> : <></>}

                            </IonCardContent>
                        </IonCard>
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
        setting : state.settings,
        favorite : state.favorites,
        note : state.note,
        profile : state.profile,
        lastBackup : state.settings.lastBackup,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        restoreData : (data) => { 
            let toDispatch = {
                'RESTORE_FAVORITE' : data.favorite,
                'RESTORE_NOTE' : data.notes,
                'RESTORE_PROFILE' : data.profile,
                'RESTORE_SETTINGS' : data.settings,
            }

            for (let d in toDispatch){
                dispatch(
                    {
                        type: d, 
                        value: toDispatch[d]
                    }
                )
            }
             
        },
        updateLastBackup : () => { 
            dispatch(
                {
                    type: "UPDATE_LASTBACKUP", 
                    value: new Date()
                }
            )
             
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountView);