import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as roomActions from "../../../actions/room"
import './bookerWithSelector.css'

class BookerWithSelector extends Component {

  constructor(props)
  {
    super(props)
  }
  book(){
    this.props.roomActions.bookRoom(this.props.roomId,15)
  }

  render() {
    const booking = this.props.booking ? (<span className="reservation">Reservando..</span>):(<span className="reservation">Reservar por: 15 </span>)
     return (
      <div>
          <label>
            {booking}
          </label>
          <button onClick={()=>{this.book()}} className="btn">{`Reservar`}</button>
      </div>
    )
  }
}


//to map state in object props
function mapStateToProps(state){
  return{
    roomId:state.room.roomId,
    currentSlot:state.room.stateRoom.currentSlot
  }
}
//to map actions in object props
function mapDispatchToProps(dispatch){
  return{
    roomActions:bindActionCreators(roomActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookerWithSelector)
