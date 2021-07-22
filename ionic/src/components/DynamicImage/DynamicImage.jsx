import React from "react"
import style from "./DynamicImage.module.css"
import PropTypes from "prop-types"

class MainContent extends React.Component {

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className={style.image} style={
                {
                    "backgroundImage": `url("${this.props.image}")`,
                    "height": `${this.props.height}`,
                    "width": `${this.props.width}`,
                }
            }></div>
        )
    }
    
}

MainContent.propTypes = {
    image : PropTypes.string,
    height : PropTypes.any,
    width : PropTypes.any,
}

export default MainContent;