import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './button.css'
import moment from 'moment'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as roomActions from "../../actions/room/Actions"


class FastBooker extends Component {

    constructor(props)
    {
      super(props)
      this.book = this.book.bind(this)
    }
    book(){
      this.props.roomActions.fastBooking(1)
    }

    render(){
      const {time} = this.props
      const contentComponent = this.props.cancelling ? (
       <div></div>
        ) : (
       <button className="btn" onClick={() => {this.book()}}>{`Ocupar por ${time}'`}</button>
      );
    	return (
        	  <div>{contentComponent}</div>
    	)
    }
}

//to map state in object props
function mapStateToProps(state){
  return{
    booking:state.room.data.currentSlot.booking
  }
}
//to map actions in object props
function mapDispatchToProps(dispatch){
  return{
    roomActions:bindActionCreators(roomActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FastBooker)
