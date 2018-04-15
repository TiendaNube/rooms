import React, { Component } from 'react'
import UserInfo from "../UserInfo"
import './statusInfo.css'

export default class RoomName extends Component {
    constructor(props){
      super()
    }
    render(){
   	  const { label,timeLabel,meetingOwner,statusName,nextMeetingOwner} = this.props
      const user = statusName=="toBusy"?nextMeetingOwner:meetingOwner
      const showInfoMeetingOwner = statusName!="free" ?(
        <UserInfo user={user}/>
      ) : (
        <div></div>
      );
    	return (
        <div className="info">
          <div className="label">{label}</div>
          <div className="time">{timeLabel}</div>
          {showInfoMeetingOwner}
        </div>
    	)
    }
}
