import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import cn from 'classnames'

import * as roomActions from "../../actions/room"
import MainContainer from "../MainContainer"

import './layoutCalendar.css'

class LayoutContainer extends React.Component {
  constructor(props){
    super()
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
    const statusName=this.props.statusName
    const roomFetched=this.props.roomFetched
    const MainContainerComponent = roomFetched ? (
      <MainContainer/>
      ) : (
     <div></div>
    )
    return <div className={cn('layoutCalendar', statusName)}>
      <img className="background" src={`img/${roomFetched?statusName:"fetching"}-background.svg`}/>
      {MainContainerComponent}
    </div>
  }
}

function mapStateToProps(state){
  return{
    statusName:state.room.stateRoom.status.name,
    roomFetched:state.room.fetched,
    roomFetching:state.room.fetching
  }
}

function mapDispatchToProps(dispatch){
  return{
    roomActions:bindActionCreators(roomActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LayoutContainer)
