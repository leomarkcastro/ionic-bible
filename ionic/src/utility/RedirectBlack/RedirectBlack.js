import React, { useState } from "react"


class RedirectBlack extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        setTimeout(()=>{
            
            this.props.history.push(this.props.destination ? this.props.destination : "/")
        }, 1000)
    }


    render(){
        return(
            <></>
        )
    }
    
}


export default RedirectBlack;