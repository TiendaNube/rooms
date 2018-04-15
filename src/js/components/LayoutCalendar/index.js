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
    this.props.roomActions.loadRoomState(this.props.match.params.room)
  }

  render() {
    //TODO change status, load new room state
    const statusName=this.props.statusName
    const roomLoaded=this.props.roomLoaded
    const MainContainerComponent = roomLoaded ? (
      <MainContainer/>
      ) : (
     <div></div>
    )
    return <div className={cn('layoutCalendar', statusName)}>
      <img className="background" src={`img/${roomLoaded?statusName:"getting"}-background.svg`}/>
      {MainContainerComponent}
    </div>
  }
}

function mapStateToProps(state){
  return{
    statusName:state.room.stateRoom.status.name,
    roomLoaded:state.room.loaded
  }
}

function mapDispatchToProps(dispatch){
  return{
    roomActions:bindActionCreators(roomActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LayoutContainer)
