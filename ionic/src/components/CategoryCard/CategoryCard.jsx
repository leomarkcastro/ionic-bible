import React from "react"
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

import style from "./CategoryCard.module.css"

import {withIonLifeCycle} from "@ionic/react"

import DynamicImage from "../DynamicImage/DynamicImage"

import ot_all from "./img_bible/ot_all.jpg"
import ot_0 from "./img_bible/ot_0.jpg"
import ot_1 from "./img_bible/ot_1.jpg"
import ot_2 from "./img_bible/ot_2.jpg"
import ot_3 from "./img_bible/ot_3.jpg"
import nt_all from "./img_bible/nt_all.jpg"
import nt_0 from "./img_bible/nt_0.jpg"
import nt_1 from "./img_bible/nt_1.jpg"
import nt_2 from "./img_bible/nt_2.jpg"
import nt_3 from "./img_bible/nt_3.jpg"
import nt_4 from "./img_bible/nt_4.jpg"

class CategoryCard extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            triggers : [ // Again, this is taboo
                false, false, false, false, false, //Old
                false, false, false, false, false, false, // New
            ]
        }

        this.scrollToRef = React.createRef()

        this.dataList = {
            "Old Testament": [
                {
                    Title : "Old Testament : The Complete Series",
                    Description: "Tells history and events about the nation of Israel, God’s covenant community, and the way in which God interacted with them throughout their history. The first 9 chapters of the Bible story take place in the Old Testament.",
                    D_Image : ot_all,
                    Book_List : [{"Name":"Genesis","Index":0},{"Name":"Exodus","Index":1},{"Name":"Leviticus","Index":2},{"Name":"Numbers","Index":3},{"Name":"Deuteronomy","Index":4},{"Name":"Joshua","Index":5},{"Name":"Judges","Index":6},{"Name":"Ruth","Index":7},{"Name":"1 Samuel","Index":8},{"Name":"2 Samuel","Index":9},{"Name":"1 Kings","Index":10},{"Name":"2 Kings","Index":11},{"Name":"1 Chronicles","Index":12},{"Name":"2 Chronicles","Index":13},{"Name":"Ezra","Index":14},{"Name":"Nehemiah","Index":15},{"Name":"Esther","Index":16},{"Name":"Job","Index":17},{"Name":"Psalms","Index":18},{"Name":"Proverbs","Index":19},{"Name":"Ecclesiastes","Index":20},{"Name":"Song of Solomon","Index":21},{"Name":"Isaiah","Index":22},{"Name":"Jeremiah","Index":23},{"Name":"Lamentations","Index":24},{"Name":"Ezekiel","Index":25},{"Name":"Daniel","Index":26},{"Name":"Hosea","Index":27},{"Name":"Joel","Index":28},{"Name":"Amos","Index":29},{"Name":"Obadiah","Index":30},{"Name":"Jonah","Index":31},{"Name":"Micah","Index":32},{"Name":"Nahum","Index":33},{"Name":"Habakkuk","Index":34},{"Name":"Zephaniah","Index":35},{"Name":"Haggai","Index":36},{"Name":"Zechariah","Index":37},{"Name":"Malachi","Index":38}],
                    Color: null,
                },
                {
                    Title : "Old Testament : Books of Israel’s Beginnings",
                    Description: "These are the Books of the Law, also known as The Pentateuch.  They are the first five books of the Bible and of the Old Testament popularly referred to as the Books of Moses. Includes Genesis ,Exodus ,Leviticus ,Numbers ,Deuteronomy",
                    D_Image : ot_0,
                    Book_List : [{"Name":"Genesis","Index":0},{"Name":"Exodus","Index":1},{"Name":"Leviticus","Index":2},{"Name":"Numbers","Index":3},{"Name":"Deuteronomy","Index":4}],
                    Color: null,
                },
                {
                    Title : "Old Testament : Historical Books",
                    Description: "These are the books containing a detailed History of Israel and they are the next twelve Old Testament books, namely: Joshua, Judges, Ruth, 1 Samuel, 2 Samuel, 1 Kings, 2 Kings, 1 Chronicles, 2 Chronicles, Ezra, Nehemiah, Esther.",
                    D_Image : ot_1,
                    Book_List : [{"Name":"Joshua","Index":5},{"Name":"Judges","Index":6},{"Name":"Ruth","Index":7},{"Name":"1 Samuel","Index":8},{"Name":"2 Samuel","Index":9},{"Name":"1 Kings","Index":10},{"Name":"2 Kings","Index":11},{"Name":"1 Chronicles","Index":12},{"Name":"2 Chronicles","Index":13},{"Name":"Ezra","Index":14},{"Name":"Nehemiah","Index":15},{"Name":"Esther","Index":16}],
                    Color: null,
                },
                {
                    Title : "Old Testament : Poetry Books",
                    Description: "(a.k.a. The Books of Everyday Wisdom or The Writings): Job, Psalms, Proverbs, Ecclesiastes.",
                    D_Image : ot_2,
                    Book_List : [{"Name":"Job","Index":17},{"Name":"Psalms","Index":18},{"Name":"Proverbs","Index":19},{"Name":"Ecclesiastes","Index":20},{"Name":"Song of Solomon","Index":21}],
                    Color: null,
                },
                {
                    Title : "Old Testament : Stories of the Apostles",
                    Description: "Includes the books of: Isaiah, Jeremiah, Lamentations, Ezekiel, Daniel, Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum, Habakkuk, Zephaniah, Haggai, Zechariah, Malachi",
                    D_Image : ot_3,
                    Book_List : [{"Name":"Isaiah","Index":22},{"Name":"Jeremiah","Index":23},{"Name":"Lamentations","Index":24},{"Name":"Ezekiel","Index":25},{"Name":"Daniel","Index":26},{"Name":"Hosea","Index":27},{"Name":"Joel","Index":28},{"Name":"Amos","Index":29},{"Name":"Obadiah","Index":30},{"Name":"Jonah","Index":31},{"Name":"Micah","Index":32},{"Name":"Nahum","Index":33},{"Name":"Habakkuk","Index":34},{"Name":"Zephaniah","Index":35},{"Name":"Haggai","Index":36},{"Name":"Zechariah","Index":37},{"Name":"Malachi","Index":38}],
                    Color: null,
                },
            ],
            "New Testament": [
                {
                    Title : "New Testament : The Complete Series",
                    Description: "The Miracles and gretness of Jesus Christ, the Christian church and the way in which the gospel of Jesus Christ was practically lived out within various faith communities. The last three chapters of the Bible story take place in the New Testament.",
                    D_Image : nt_all,
                    Book_List : [{"Name":"Matthew","Index":39},{"Name":"Mark","Index":40},{"Name":"Luke","Index":41},{"Name":"John","Index":42},{"Name":"Acts","Index":43},{"Name":"Romans","Index":44},{"Name":"1 Corinthians","Index":45},{"Name":"2 Corinthians","Index":46},{"Name":"Galatians","Index":47},{"Name":"Ephesians","Index":48},{"Name":"Philippians","Index":49},{"Name":"Colossians","Index":50},{"Name":"1 Thessalonians","Index":51},{"Name":"2 Thessalonians","Index":52},{"Name":"1 Timothy","Index":53},{"Name":"2 Timothy","Index":54},{"Name":"Titus","Index":55},{"Name":"Philemon","Index":56},{"Name":"Hebrews","Index":57},{"Name":"James","Index":58},{"Name":"1 Peter","Index":59},{"Name":"2 Peter","Index":60},{"Name":"1 John","Index":61},{"Name":"2 John","Index":62},{"Name":"3 John","Index":63},{"Name":"Jude","Index":64},{"Name":"Revelation","Index":65}],
                    Color: null,
                },
                {
                    Title : "New Testament : The Gospels",
                    Description: "Each Gospel tells the life story of Jesus. The first three Gospels -- Matthew, Mark and Luke -- are similar in content and structure. Because of this, they are grouped and labeled the 'Synoptic Gospels'. The book of John has markedly different subject material and organization.",
                    D_Image : nt_0,
                    Book_List : [{"Name":"Matthew","Index":39},{"Name":"Mark","Index":40},{"Name":"Luke","Index":41},{"Name":"John","Index":42}],
                    Color: null,
                },
                {
                    Title : "New Testament : Acts of the Apostles",
                    Description: "Acts recounts the early history of Christianity. After the death and resurrection of Jesus Christ, the Twelve Apostles began to preach and minister in a variety of locations. The second half of Acts focuses on Paul, an anti-Christian who later converts and becomes a missionary.",
                    D_Image : nt_1,
                    Book_List : [{"Name":"Acts","Index":43}],
                    Color: null,
                },
                {
                    Title : "New Testament : Paul's Epistles and Hebrews",
                    Description: "Books 6 to 18 of the New Testament are letters, called 'epistles', written by Paul. Paul's epistles are addressed to various communities and deal with philosophical and social issues facing new Christians. These 13 books are: Romans, 1 Corinthians, 2 Corinthians, Galatians, Ephesians, Philippians, Colossians, Thessalonians, 2 Thessalonians, 1 Timothy, 2 Timothy, Titus and Philemon.",
                    D_Image : nt_2,
                    Book_List : [{"Name":"Romans","Index":44},{"Name":"1 Corinthians","Index":45},{"Name":"2 Corinthians","Index":46},{"Name":"Galatians","Index":47},{"Name":"Ephesians","Index":48},{"Name":"Philippians","Index":49},{"Name":"Colossians","Index":50},{"Name":"1 Thessalonians","Index":51},{"Name":"2 Thessalonians","Index":52}],
                    Color: null,
                },
                {
                    Title : "New Testament : General Epistles",
                    Description: "The seven general epistles -- James, 1 Peter, 2 Peter, 1 John, 2 John, 3 John and Jude -- are ascribed to various authors and are addressed to a general Christian audience, rather than the specific communities addressed in Paul's Epistles. The General Epistles are alternatively called the 'Catholic Epistles'",
                    D_Image : nt_3,
                    Book_List : [{"Name":"1 Timothy","Index":53},{"Name":"2 Timothy","Index":54},{"Name":"Titus","Index":55},{"Name":"Philemon","Index":56},{"Name":"Hebrews","Index":57},{"Name":"James","Index":58},{"Name":"1 Peter","Index":59},{"Name":"2 Peter","Index":60},{"Name":"1 John","Index":61},{"Name":"2 John","Index":62},{"Name":"3 John","Index":63},{"Name":"Jude","Index":64}],
                    Color: null,
                },
                {
                    Title : "New Testament : Revelations",
                    Description: "The 27th and final book of the New Testament is called the Book of the Revelation to John, or more commonly, 'Revelation. Revelation is unique in that it is the only New Testament book to focus entirely on prophetic experience.",
                    D_Image : nt_4,
                    Book_List : [{"Name":"Revelation","Index":65}],
                    Color: null,
                },
            ]
        }

        this.render_divisions = this.render_divisions.bind(this)
        this.addCat_Live = this.addCat_Live.bind(this)
        this.render_div_books = this.render_div_books.bind(this)
    }

    componentDidUpdate(){
        if (this.scrollToRef.current){
            
            this.scrollToRef.current?.scrollIntoView({ behavior: 'smooth' })
            //this.scrollToRef.current.scrollTop -= 100;

            this.scrollToRef.current = undefined
        }
    }

    addCat_Live(index) {
        let st = { ...this.state }

        st.triggers[index] = true

        this.setState(st)

    }

    render_div_books(props){
        return(
            <>
            <IonCardHeader ref={this.scrollToRef}>
                <IonCardTitle>{props.categ.Title}</IonCardTitle>
                <p>{props.categ.Description}</p>
            </IonCardHeader>
            <IonCardContent>
                <div className={"ion-text-center " + style.books}>
                    <p>{props.categ.Title}</p>
                    {props.categ.Book_List.map((d, d_i) => {
                        return(
                            <IonButton size="small" key={`bible_cat_${props.divID}_${d_i}`} routerLink={`/verse/${d.Index}`}>{d.Name}</IonButton>
                        )
                    })}
                </div>
            </IonCardContent>
            
            </>
        )
    }
    
    render_divisions(){

        let cards = this.dataList[this.props.title].map((categ, i) => {
            // Only do this if items have no stable IDs
            return(
                <IonCard button={!this.state.triggers[i]} key={`bible_cat_${this.props.title.replace(' ','_')}_${i}`} id={`bible_cat_${this.props.title.replace(' ','_')}_${i}`}  onClick={!this.state.triggers[i] && this.addCat_Live.bind(this,i)}>
                    <DynamicImage image={categ.D_Image} width="100%" height="12.5rem"/>
                    
                    {
                        this.state.triggers[i] ? 
                        <this.render_div_books categ={categ} divID={i}/> 
                        : 
                        <IonCardHeader>
                            <IonCardTitle>{categ.Title}</IonCardTitle>
                            <p>{categ.Description}</p>
                        </IonCardHeader>
                    }
                    
                    
                </IonCard>
                    
            )
        })
        
        return cards
    }

    ionViewDidLeave(){
        this.setState({
            triggers : [ // Again, this is taboo
                false, false, false, false, false, //Old
                false, false, false, false, false, false, // New
            ]
        })
    }
    
    render(){
        return(
            <>
                <p key={`Title_${this.props.title}`}>{this.props.title}</p>
                
                <this.render_divisions />

            </>
        )
    }
    
}

export default withIonLifeCycle(CategoryCard);