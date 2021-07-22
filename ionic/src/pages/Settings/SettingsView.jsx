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
  IonToggle,
  IonItemDivider,
  IonCard,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonIcon,
  IonRange
} from '@ionic/react';
import { chevronBack, reorderFourOutline, reorderTwoOutline, sunny } from "ionicons/icons";

import { themeList, fontList } from "../../theme/theme_set" 

import note_color from "../../theme/note_color";

import style from "./Settings.module.css"

class SettingsView extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            active : false,
            exit: false
        }

        this.colorList = note_color

    }


    componentDidMount(){
        this.init_settings()
    }

    init_settings(){
        setTimeout(()=>{
                this.props.hot_load()
                this.setState({
                    ...this.state,
                    active : true
                })
            }, 250)
    }

    changeValue(location, value, e){
        let o = this.props.settings
        o[location[0]][location[1]] = e.detail[value]

        this.props.update_settings(o)
    }

    goBack(){
        this.props.history.push('/settings/redirect')
    }

    render(){
        return (
            <IonPage id="home-page">
                <IonToolbar>
                    <IonTitle>Settings</IonTitle>
                    <IonButtons slot="end">
                        <IonButton fill="solid" onClick={this.goBack.bind(this)}>
                            Save
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                
                <IonContent>

                    <IonCard>

                        <IonList>
                            
                            <IonItemDivider>Theme</IonItemDivider>

                            <IonItem>
                                <IonLabel>Dark Mode</IonLabel>
                                <IonToggle checked={this.props.settings.theme.darkMode} onIonChange={this.changeValue.bind(this, ["theme", "darkMode"], "checked")}/>
                            </IonItem>

                            <IonItem>
                                <IonLabel>Color Palette</IonLabel>
                                <IonSelect 
                                placeholder="Select One" 
                                    value={this.props.settings.theme.colorPalette} 
                                    onIonChange={this.changeValue.bind(this, ["theme", "colorPalette"], "value")}
                                    >
                                        {
                                            Object.keys(themeList).map((e,i) => {
                                                return <IonSelectOption key={"color_"+e+i} value={e}>{themeList[e]}</IonSelectOption>
                                            })
                                        }
                                </IonSelect>
                            </IonItem>
                            
                            <div className="ion-text-center">
                                {
                                    Object.keys(this.colorList).map((e,i) => {
                                        return (
                                            <IonButton 
                                                key={`color_select_${i}`}
                                                fill="solid" 
                                                color={this.colorList[e].main}
                                            >&nbsp;</IonButton>
                                        )
                                    })
                                }
                            </div>
                            
                        
                        </IonList>
                    
                    </IonCard>
                    
                    <IonCard>

                        <IonList>

                            <IonItemDivider>Font</IonItemDivider>

                            <IonItem>
                                <IonLabel>Style</IonLabel>
                                <IonSelect 
                                    placeholder="Select One" 
                                    value={this.props.settings.font.style}  
                                    onIonChange={this.changeValue.bind(this, ["font", "style"], "value")}
                                    interface="action-sheet"
                                    >
                                        {
                                            Object.keys(fontList).map((e,i) => {
                                                return <IonSelectOption key={"font_"+e+i} value={e} className={`font_${e}`} >{fontList[e]}</IonSelectOption>
                                            })
                                        }
                                </IonSelect>
                            </IonItem>
                            
                            <IonItemDivider>Verse Font Size</IonItemDivider>
                            <p className={style.verse_size}>For God so love the world that he gave his only begotten sone</p>
                            <IonItem>
                                <IonRange
                                    min={50}
                                    max={200}
                                    value={this.props.settings.font.verse_size} 
                                    onIonChange={this.changeValue.bind(this, ["font", "verse_size"], "value")} 
                                    >
                                    <IonIcon size="small" slot="start" icon={reorderTwoOutline}/>
                                    <IonIcon size="small" slot="end" icon={reorderFourOutline}/>
                                </IonRange>
                            </IonItem>

                            <IonItemDivider>Notes Font Size</IonItemDivider>
                            <p className={style.note_size}>A message that will leave someone in awe or question</p>
                            <IonItem>
                                <IonRange
                                    min={50}
                                    max={200}
                                    value={this.props.settings.font.note_size} 
                                    onIonChange={this.changeValue.bind(this, ["font", "note_size"], "value")} 
                                    >
                                    <IonIcon size="small" slot="start" icon={reorderTwoOutline}/>
                                    <IonIcon size="small" slot="end" icon={reorderFourOutline}/>
                                </IonRange>
                            </IonItem>

                        </IonList>
                    
                    </IonCard>
                    
                    {
                        false ? 
                        <IonCard>

                            <IonList>

                                <IonItemDivider>Enabled Languages</IonItemDivider>

                                <IonItem>
                                    <IonLabel>[Eng] New Intl. Version</IonLabel>
                                    <IonCheckbox checked={this.props.settings.enabled_languages.niv} onIonChange={this.changeValue.bind(this, ["enabled_languages", "niv"], "checked")} />
                                </IonItem>
                                <IonItem>
                                    <IonLabel>[Eng] King James Ver.</IonLabel>
                                    <IonCheckbox checked={this.props.settings.enabled_languages.kjv} onIonChange={this.changeValue.bind(this, ["enabled_languages", "kjv"], "checked")} />
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Tagalog</IonLabel>
                                    <IonCheckbox checked={this.props.settings.enabled_languages.tagalog} onIonChange={this.changeValue.bind(this, ["enabled_languages", "tagalog"], "checked")} />
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Ilocano</IonLabel>
                                    <IonCheckbox checked={this.props.settings.enabled_languages.ilocano} onIonChange={this.changeValue.bind(this, ["enabled_languages", "ilocano"], "checked")} />
                                </IonItem>

                            </IonList>
                        
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
        settings : state.settings.settings,
        first_start : state.settings.first_start_done,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update_settings : (data) => { 
            dispatch(
                {
                    type: 'SETTING_UPDATE', 
                    value: data
                }
            ) 
        },
        hot_load : () => { 
            dispatch(
                {
                    type: 'LOAD_HOT_SETTINGS', 
                }
            ) 
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
