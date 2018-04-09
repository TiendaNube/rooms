import React, { Component } from 'react'
import { connect } from "react-redux"
import Countdown from 'react-countdown-now'
import './statusActionContainer.css'
import StatusContinerActionConfig from "./config.js"
import FastBookerButton from "../Buttons/FastBooker"
import FreeRoomButton from "../Buttons/FreeRoom"
import BookerWithSelector from "../Buttons/BookerWithSelector"

class StatusActionContainer extends Component {
    constructor(props){
      super()
    }

    buildRoomAction(statusName, minutesToFinish, secondsToFinish, roomId){
      const times=StatusContinerActionConfig.times
      const cancelling=this.props.cancelling
      const booking=this.props.booking
      const timeSelectorProps={times,roomId}
      switch (statusName) {
        case "toBusy":
        const renderedFastBooker = ({minutes, seconds, completed }) => {
            return <FastBookerButton minutesToFinish={minutesToFinish} secondsToFinish={seconds}/>
          }
        return <Countdown
              date={Date.now() + secondsToFinish *1000}
              renderer={renderedFastBooker}/>
        break;
        case "busy":
          return cancelling?<div></div>:<FreeRoomButton/>
          break;
        case "toFree":
          return <FreeRoomButton/>
          break;
        case "free":
          return booking?<div></div>:<BookerWithSelector/>
          break;
        default:
          return ""
      }
    }

    render(){
      const {roomId,minutesToFinish,secondsToFinish,statusName}=this.props
      const roomAction = this.buildRoomAction(statusName, minutesToFinish,secondsToFinish, roomId)
    	return (
        <div className="action">
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
    roomId:state.room.roomId,
    secondsToFinish:state.room.stateRoom.status.secondsToFinish,
    statusName:state.room.stateRoom.status.name,
    cancelling:state.room.stateRoom.currentSlot.cancelling,
    booking:state.room.stateRoom.currentSlot.booking
  }
}

function mapDispatchToProps(dispatch){
  return{}
}

export default connect(mapStateToProps,()=>{return{}})(StatusActionContainer)
