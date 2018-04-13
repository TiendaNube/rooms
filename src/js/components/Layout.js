import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import moment from "moment"

import * as roomActions from "../actions/room/Actions"
import Main from "./Main/Main"
import '../App.css'


class LayoutContainer extends React.Component {
  constructor(props){
    super(props)
  }
  componentWillMount() {
    this.props.roomActions.fetchRoom(this.props.match.params.room)
  }
  updateTime(){
    if(this.props.room.data.state.status&&this.props.room.fetching==false){
      this.props.roomActions.tickTime(this.props.match.params.room,this.props.room)
      clearInterval(this.updateInterval)
    }
  }

  render() {
    this.updateInterval = setInterval(() => this.updateTime(), 1 * 60000)
    const mainProps = {
        name: this.props.room.data.name,
        time: this.props.room.data.state.time,
        status: this.props.room.data.state.status,
        slot: this.props.room.data.currentSlot,
        user: this.props.user.data.display_name,
        roomId:this.props.match.params.room
    }
    return <div>
      <Main {...mainProps}/>
    </div>
  }
}

function mapStateToProps(state){
  return{
    room:state.room,
    user:state.user
  }
}

function mapDispatchToProps(dispatch){
  return{
    roomActions:bindActionCreators(roomActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LayoutContainer)
