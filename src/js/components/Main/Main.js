import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Info from "../Info/Info"
import cn from 'classnames'
import './App.css'
import './Main.css'

export default class Main extends Component {
  constructor(props,context){
    super(props,context)
  }
  /*buildLabel(state){
    switch (state) {
      case "busy":
        return `${}`
        break;
      default:

    }
  }*/
  render() {
    const { name, time, state, user } = this.props
    //let label = this.buildLabel(state)
    const info ={ label:name, time, user, state}
    return (
      <div className={cn('app', state)}>
        <img className="background" src={`img/${state}-background.svg`}/>
        <div className="main">
          <div className="illustration">
            <img src={`img/${state}.svg`}/>
          </div>
          <div className="info-container">
            <Info {...info}/>
          </div>
        </div>
      </div>
    )
  }
}
