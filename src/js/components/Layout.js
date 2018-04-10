import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import moment from "moment"

import * as roomActions from "../actions/roomActions"
import Main from "./Main/Main"
import '../App.css'


class LayoutContainer extends React.Component {
  constructor(props){
    super(props)
  }
  componentWillMount() {
    this.props.roomActions.fetchRoom(`sala-${this.props.match.params.room}`)
  }
  componentDidMount() {
  }

  computeRoomTimes(){
    const { schedule } = this.props.room.data.schedule
    const now = moment()
    const currentEvent = schedule.find(slot => now.isBetween(slot.start, slot.end)) || null
    console.log("currentEvent")
    console.log(currentEvent)
  }

  render() {

    const mainProps = {
<<<<<<< HEAD
        label: "Ocupada hasta",
        time: "10:30",
        state: "free",
        user: "vickym",
        buttonLabel: "Reservar",
=======
        label: this.props.room.data.name?this.props.room.data.name:"Loading",
        time: 30,
        state: "free"
>>>>>>> add-react-router
    }
    return <div>
      <Main {...mainProps}/>
    </div>
  }
}

function mapStateToProps(state){
  return{
    room:state.room
  }
}

function mapDispatchToProps(dispatch){
  return{
    roomActions:bindActionCreators(roomActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LayoutContainer)
