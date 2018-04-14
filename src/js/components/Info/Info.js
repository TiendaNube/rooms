import React, { Component } from 'react'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import moment from 'moment'

import './info.css'
import FastBooker from "../Button/FastBooker"
import FreeRoom from "../Button/FreeRoom"
import TimeSelector from "../BookerWithSelector/BookerWithSelector"
import InfoConfig from './config.js'
import * as userActions from "../../actions/user"

moment.updateLocale('en', {
    relativeTime : {
        future: "%s",
        mm: "%d"
      }
});

class Info extends Component {

    componentWillMount(){
      const organizerEmail=this.props.currentSlot.organizer.email
      const nextMeetingOwnerEmail=this.props.nextMeeting.organizer.email
      if(organizerEmail){
        this.props.userActions.getUser(organizerEmail,"USER")
      }

      if(nextMeetingOwnerEmail){
        this.props.userActions.getUser(nextMeetingOwnerEmail,"NEXT_METTING_OWNER")
      }
    }
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

  	buildRoomAction(statusName, minutesToFinish, roomId){
      const times=InfoConfig.times
      const timeSelectorProps={times,roomId}
      const freeRoomPropsProps={statusName}
	    switch (statusName) {
	      case "toBusy":
          const fastBookerProps={minutesToFinish}
	        return <FastBooker {...fastBookerProps}/>
	        break;
	      case "busy":
	        return <FreeRoom {...freeRoomPropsProps}/>
	        break;
	      case "toFree":
	        return <FreeRoom {...freeRoomPropsProps}/>
	        break;
	      case "free":
	        return <TimeSelector {...freeRoomPropsProps}/>
	        break;
	      default:
	        return ""
    	}
  	}


    render(){

   	    const { label, statusName, meetingOwner, minutesToFinish, roomId} = this.props
   	    const timeLabel = this.buildTimeLabel(statusName, minutesToFinish)
   	    const roomAction = this.buildRoomAction(statusName, minutesToFinish, roomId)
   	    const infoMeetingOwner = meetingOwner.data.display_name ? (
     		  <div className="meeting-owner">por <strong>@{meetingOwner.data.display_name}</strong></div>
      	) : (
      		<div className="meeting-owner"></div>
    	);

    	return (
			  <div className="info">
          <div className="label">{label}</div>
          <div className="time">{timeLabel}</div>
          {infoMeetingOwner}
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
    minutesToFinish:state.room.stateRoom.status.minutesToFinish,
    currentSlot:state.room.stateRoom.currentSlot,
    nextMeeting:state.room.stateRoom.nextMeeting,
    meetingOwner:state.meetingOwner
  }
}

function mapDispatchToProps(dispatch){
  return{
    userActions:bindActionCreators(userActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Info)
