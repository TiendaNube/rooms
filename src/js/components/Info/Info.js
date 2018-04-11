import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './info.css'
import Button from "../Button/Button"
import moment from 'moment'


export default class Info extends Component {

    buildTimeLabel(state, time){
      console.log(this.props.slot.end)
	    switch (state) {
	      case "toBusy":
	        return `${time}'`
	        break;
	      case "busy":
	        return `${moment(this.props.slot.end).format("HH:SS")}`
	        break;
	      case "toFree":
	        return `${time}'`
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
