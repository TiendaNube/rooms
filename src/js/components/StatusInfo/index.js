import React, { Component } from 'react'
import ReactAnimatedEllipsis from 'react-animated-ellipsis';

import './statusInfo.css'

export default class RoomName extends Component {
    constructor(props){
      super()
    }
    render(){
   	  const { label,timeLabel,meetingOwner,statusName,nextMeetingOwner} = this.props
      const showInfoMeetingOwner = statusName!="free" ? nextMeetingOwner.fetched||meetingOwner.fetched ? (
      <div className="meeting-owner">por <strong>@{meetingOwner.data.display_name?meetingOwner.data.display_name:nextMeetingOwner.data.display_name}</strong></div>
      ) : (
      <div className="meeting-owner">Investigando<ReactAnimatedEllipsis/></div>
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
