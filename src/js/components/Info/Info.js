import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './info.css'
import FastBooker from "../Button/FastBooker"
import FreeRoom from "../Button/FreeRoom"
import moment from 'moment'
import TimeSelector from "../BookerWithSelector/BookerWithSelector"
import { connect } from "react-redux"
import InfoConfig from './config.js'
moment.updateLocale('en', {
    relativeTime : {
        future: "%s",
        mm: "%d"
      }
});

class Info extends Component {

    buildTimeLabel(status, time){
	    switch (status) {
	      case "toBusy":
	        return `${time}'`
	        break;
	      case "busy":
	        return `${moment(this.props.currentSlot.end).format("hh:mm")}`
	        break;
	      case "toFree":
          const now = moment()
          const finishCurrentMeeting = moment(this.props.currentSlot.end)
          const diffMinutes=finishCurrentMeeting.diff(now,"minutes")
          return `${diffMinutes}'`
	        break;
	      case "free":
	        return "libre"
	        break;
	      default:
	        return ""
    	}
  	}

  	buildRoomAction(status, time){
  		const buttonStatus={status}
  		const buttonTime={time}

	    switch (status) {
	      case "toBusy":
	        return <FastBooker {...buttonTime}/>
	        break;
	      case "busy":
	        return <FreeRoom {...buttonStatus}/>
	        break;
	      case "toFree":
	        return <FreeRoom {...buttonStatus}/>
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
   	    const buttonStatus={status}

   	    let timeLabel = this.buildTimeLabel(status, time)

   	    let roomAction = this.buildRoomAction(status, time)

   	    const infoUser = user.data.display_name ? (
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
        
          <div class="windows8">
            <div class="wBall" id="wBall_1">
              <div class="wInnerBall"></div>
            </div>
            <div class="wBall" id="wBall_2">
              <div class="wInnerBall"></div>
            </div>
            <div class="wBall" id="wBall_3">
              <div class="wInnerBall"></div>
            </div>
            <div class="wBall" id="wBall_4">
              <div class="wInnerBall"></div>
            </div>
            <div class="wBall" id="wBall_5">
              <div class="wInnerBall"></div>
            </div>
          </div>
        </div>
    	)
    }
}


function mapStateToProps(state){
  return{
    time:state.room.data.state.time,
    currentSlot:state.room.data.currentSlot,
    user:state.user
  }
}

function mapDispatchToProps(dispatch){
  return{}
}

export default connect(mapStateToProps,mapDispatchToProps)(Info)
