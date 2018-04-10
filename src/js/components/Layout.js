import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as roomActions from "../actions/roomActions"
import Main from "./Main/Main"
import '../App.css'


class LayoutContainer extends React.Component {

  componentWillMount() {
    this.props.roomActions.fetchRoom(`${this.props.salaId}`)
  }

  render() {
    const mainProps = {
        label: "Ocupada hasta",
        time: "10:30",
        state: "free",
        user: "vickym",
        buttonLabel: "Reservar",
    }

    return <div>
      <Main {...mainProps}/>
    </div>
  }
}

function mapStateToProps(state){
  return{
    room:state.room,
    fetching:state.fetching
  }
}

function mapDispatchToProps(dispatch){
  return{
    roomActions:bindActionCreators(roomActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LayoutContainer)
