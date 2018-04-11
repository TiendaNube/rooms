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
    this.props.roomActions.fetchRoom(this.props.match.params.room)
  }
  componentDidMount() {
  }

  render() {
    const mainProps = {
        name: this.props.room.data.name,
        time: 30,
        state: this.props.room.data.state,
        user: "vickym",
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
