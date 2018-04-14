import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import cn from 'classnames'
import moment from "moment"

import * as roomActions from "../../actions/room"
import Main from "../Main"

import './layout.css'

class LayoutContainer extends React.Component {
  constructor(props){
    super(props)
  }
  componentWillMount() {
    this.props.roomActions.getRoomState(this.props.match.params.room)
  }
/*TODO   updateTime(){
    if(this.props.room.data.state.status&&this.props.room.fetching==false){
      this.props.roomActions.tickTime(this.props.match.params.room,this.props.room)
      clearInterval(this.updateInterval)
    }
  }*/

  render() {
    //TODO this.updateInterval = setInterval(() => this.updateTime(), 1 * 60000)
    const statusName=this.props.room.stateRoom.status.name
    const mainProps = {
        name: this.props.room.stateRoom?this.props.room.stateRoom.name:null,
        status: this.props.room.stateRoom?this.props.room.stateRoom.status:null,
        roomId:this.props.match.params.room
    }
    return <div className={cn('layout', statusName)}>
      <img className="background" src={`img/${statusName}-background.svg`}/>
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
