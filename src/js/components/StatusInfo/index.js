import React, { Component } from 'react'
import './statusInfo.css'

export default class RoomName extends Component {
    constructor(props){
      super()
    }

    render(){
   	  const { label,timeLabel,meetingOwner } = this.props
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
        </div>
    	)
    }
}
