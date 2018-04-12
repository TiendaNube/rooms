import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './info.css'
import FastBooker from "../Button/FastBooker"
import FreeRoom from "../Button/FreeRoom"
import moment from 'moment'
import TimeSelector from "../TimeSelector/TimeSelector"
import { connect } from "react-redux"
import InfoConfig from './config.js'

class Info extends Component {

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

  	buildRoomAction(status, time){
	    switch (status) {
	      case "toBusy":
	        return <FastBooker {...time}/>
	        break;
	      case "busy":
	        return <FreeRoom {...status}/>
	        break;
	      case "toFree":
	        return <FreeRoom {...status}/>
	        break;
	      case "free":
	        return <TimeSelector time = {InfoConfig.times}/>
	        break;
	      default:
	        return ""
    	}
  	}


    render(){
   	    const { label, status, user, time} = this.props

   	    let timeLabel = this.buildTimeLabel(status, time)
   	    let roomAction = this.buildRoomAction(status)

   	    const infoUser = user ? (
     		<div className="user">por <strong>@{user.data.display_name}</strong></div>
      	) : (
      		<div className="user"></div>
    	);

    	return (
			<div className="info">
            	<div className="label">{label}</div>
            	<div className="time">{timeLabel}</div>
            	{infoUser}

            	{roomAction}

            	
            	
          	</div>
    	)
    }
}


function mapStateToProps(state){
  return{
    time:state.room.data.state.time,
    slot:state.room.data.state.currentSlot,
    user:state.user
  }
}

function mapDispatchToProps(dispatch){
  return{}
}

export default connect(mapStateToProps,mapDispatchToProps)(Info)
