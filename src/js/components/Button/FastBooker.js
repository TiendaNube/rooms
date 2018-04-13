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
      //this.props.roomActions.fastBooking()
    }

    render(){
      const {time} = this.props
      const content = this.props.booking? (<div></div>):
      (<button className="btn" onclick={this.book()}>{`Ocupar por`}</button>);

    	return (
        	  <div>{content}</div>
    	)
    }
}

//to map state in object props
function mapStateToProps(state){
  return{
    booking:state.room.booking
  }
}
//to map actions in object props
function mapDispatchToProps(dispatch){
  return{
    roomActions:bindActionCreators(roomActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FastBooker)
