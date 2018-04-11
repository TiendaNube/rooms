import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Info from "../Info/Info"
import cn from 'classnames'
import './App.css'
import './Main.css'
import TimeSelector from "../TimeSelector/TimeSelector"

export default class Main extends Component {
  constructor(props,context){
    super(props,context)
  }

  buildLabel(state){
    switch (state) {
      case "toBusy":
        return "Se ocupa en:"
        break;
      case "busy":
        return   `Ocupada hasta:`
        break;
      case "toFree":
        return "Se libera en:"
        break;
      default:
        return ""
    }
  }

  render() {
    const { name, time, state, user, slot } = this.props
    let label = this.buildLabel(state)
    const info = {label, time, user, state ,slot}

    const infoComponent = state ? (
     <Info {...info}/>
      ) : (
     <div></div>
    );


    return (
      <div className={cn('app', state)}>
        <img className="background" src={`img/${state}-background.svg`}/>
        <div className="main">
          <h1 className="room-name">{name}</h1>
          <div className="illustration">
            <img src={`img/${state}.svg`}/>
          </div>
          <TimeSelector time = {[15,30,60]}/>
          <div className="info-container">
            {infoComponent}
          </div>


        </div>
      </div>
    )
  }
}
