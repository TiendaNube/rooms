import React, { Component } from 'react'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import moment from 'moment'

import StatusInfo from "../StatusInfo"
import StatusActionContainer from "../StatusActionContainer"

import StatusContainerConfig from './config.js'
import * as userActions from "../../actions/user"

moment.updateLocale('en', {
    relativeTime : {
        future: "%s",
        mm: "%d"
      }
});

class Info extends Component {
    componentWillMount(){
      const {organizerEmail,nextMeetingOwnerEmail}=this.props
      if(organizerEmail){
        this.props.userActions.getUser(organizerEmail,"USER")
      }

      if(nextMeetingOwnerEmail){
        this.props.userActions.getUser(nextMeetingOwnerEmail,"NEXT_METTING_OWNER")
      }
    }
    buildTimeLabel(status, minutesToFinish){
	    switch (status) {
	      case "toBusy":
	        return `${minutesToFinish}'`
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
  	render(){
   	  const { statusName, meetingOwner, secondsToFinish} = this.props
      const label = StatusContainerConfig.label[statusName]
      const minutesToFinish=Math.trunc(secondsToFinish/60)
   	  const timeLabel = this.buildTimeLabel(statusName, minutesToFinish)
      const statusInfoProps={label,timeLabel,meetingOwner}
    	return (
        <div>
          <StatusInfo {...statusInfoProps}/>
          <StatusActionContainer minutesToFinish={minutesToFinish}/>
        </div>
    	)
    }
}


function mapStateToProps(state){
  return{
    organizerEmail:state.room.stateRoom.currentSlot.organizer.email,
    nextMeetingOwnerEmail:state.room.stateRoom.nextMeeting.organizer.email,
    secondsToFinish:state.room.stateRoom.status.secondsToFinish,
    currentSlot:state.room.stateRoom.currentSlot,
    meetingOwner:state.meetingOwner,
    statusName:state.room.stateRoom.status.name
  }
}

function mapDispatchToProps(dispatch){
  return{
    userActions:bindActionCreators(userActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Info)
