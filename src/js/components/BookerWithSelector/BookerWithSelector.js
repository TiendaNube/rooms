import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as roomActions from "../../actions/room/Actions"
import Main from "../Main/Main"
import './bookerWithSelector.css'

class BookerWithSelector extends Component {

  constructor(props)
  {
    super(props)
    this.change = this.change.bind(this)
    this.state={
       timeSelected:props.times[0]
    }
  }
  book(){
    const timeBook=this.state.timeSelected
    this.props.roomActions.bookRoom(this.props.roomId,timeBook)
  }
  change(event){
    const value=event.target.value
    this.setState((prevState,value) => {
      return {timeSelected: value};
    })
  }

 OptionValues(props) {

    const numbers =  props;
    let items = [];
     for (let i = 0; i <props.length; i++) {
          items.push(<option key={numbers[i]} value={numbers[i]}>{numbers[i]}</option>);
     }
     return items;
  }

  render() {
    const booking = this.props.booking ? (<span className="reservation">Reservando..</span>):(<span className="reservation">Reservar por:</span>)
     return (
      <div>
          <label>
            {booking}
            <select id="time" onChange={(event)=>{this.change(event)}}>
              {this.OptionValues(this.props.times)}
            </select>
          </label>
          <button onClick={()=>{this.book()}} className="btn">{`Reservar`}</button>
      </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(BookerWithSelector)
