import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './info.css'
import Button from "../Button/Button"


export default class Info extends Component {
   
    buildTimeLabel(state, time){
	    switch (state) {
	      case "toBusy":
	        return `${time}a`
	        break;
	      case "busy":
	        return `${time}`
	        break;
	      case "toFree":
	        return `${time}a`
	        break;
	      case "free":
	        return "libre"
	        break;
	      default: 
	        return ""
    	}
  	}


    render(){
   	    const { label, state, user, time} = this.props
   	    const button={ state }
   	    let timeLabel = this.buildTimeLabel(state, time)

    	return (    
			<div className="info">
            	<div className="label">{label}</div>
            	<div className="time">{timeLabel}</div>
            	<div className="user">por <strong>@{user}</strong></div>

            	<Button {...button}/>
          	</div>
    	)
    }
}
