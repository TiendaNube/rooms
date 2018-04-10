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
  render() {
    const { label, time, state, user } = this.props
    const info={ label, time, user, state}
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
