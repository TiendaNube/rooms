import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import Lottie from 'react-lottie';

import StatusContainer from "../StatusContainer"
import RoomName from "../RoomName"

import './mainContainer.css'
import * as animationData from './animate.json'

class MainContainer extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const { roomName, statusName } = this.props
    const animationOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData[statusName]
    }
    return (
        <div className="main">
          <RoomName name={roomName}/>
          <div className="illustration">
            <Lottie options={animationOptions}/>
          </div>
          <div className="status-container">
            <StatusContainer/>
          </div>
        </div>
    )
  }
}

function mapStateToProps(state){
  return{
    statusName:state.room.stateRoom.status.name,
    roomName:state.room.stateRoom.name
  }
}

export default connect(mapStateToProps,()=>{return{}})(MainContainer)
