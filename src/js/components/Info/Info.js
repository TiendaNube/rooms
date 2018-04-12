import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './info.css'
import Button from "../Button/Button"
import moment from 'moment'


export default class Info extends Component {

    buildTimeLabel(status, time){
	    switch (status) {
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
   	    const { label, status, user, time} = this.props
   	    const button={ status }
   	    let timeLabel = this.buildTimeLabel(status, time)

   	    const infoUser = user ? (
     		<div className="user">por <strong>@{user}</strong></div>
      	) : (
      		<div className="user"></div>
    	);

    	return (
			<div className="info">
            	<div className="label">{label}</div>
            	<div className="time">{timeLabel}</div>
            	{infoUser}

            	<Button {...button}/>
          	</div>
    	)
    }
}
