import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './button.css'
import moment from 'moment'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as roomActions from "../../actions/room/Actions"


class FreeRoom extends Component {
  constructor(props)
  {
    super(props)
    this.cancel = this.cancel.bind(this)
  }

  cancel(){
    this.props.roomActions.cancelMeeting(15)
  }

    render(){
      console.log(this.props.cancelling)
      const contentComponent = this.props.cancelling ? (
       <div></div>
        ) : (
       <button className="btn" onClick={() => {this.cancel()}}>{`Liberar`}</button>
      );
    	return (
        <div>{contentComponent}</div>
    	)
    }
}
//to map state in object props
function mapStateToProps(state){
  return{
    cancelling:state.room.data.currentSlot.cancelling
  }
}
//to map actions in object props
function mapDispatchToProps(dispatch){
  return{
    roomActions:bindActionCreators(roomActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FreeRoom)
