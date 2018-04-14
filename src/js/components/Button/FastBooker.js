import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './button.css'
import moment from 'moment'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as roomActions from "../../actions/room"


class FastBooker extends Component {

    constructor(props)
    {
      super(props)
      this.book = this.book.bind(this)
    }
    book(time,roomId){
      this.props.roomActions.bookNow(roomId,time)
    }

    render(){
      const {secondsToFinish,minutesToFinish,roomId} = this.props
      const contentComponent = this.props.cancelling ? (
       <div></div>
        ) : (
       <button className="btn" onClick={() => {this.book(time,roomId)}}>{`Ocupar por ${minutesToFinish}:${secondsToFinish}`}</button>
      );
    	return (
        	  <div>{contentComponent}</div>
    	)
    }
}

//to map state in object props
function mapStateToProps(state){
  return{
    booking:state.room.stateRoom.currentSlot.booking
  }
}
//to map actions in object props
function mapDispatchToProps(dispatch){
  return{
    roomActions:bindActionCreators(roomActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FastBooker)
