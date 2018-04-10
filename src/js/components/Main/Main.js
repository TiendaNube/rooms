import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Info from "../Info/Info"
import cn from 'classnames'
import './App.css'
import './Main.css'

export default class Main extends Component {
  constructor(props,context){
    super(props,context)
    console.log(props)
  }
  render() {
    const { label, time, state, user } = this.props
    const info={ label, time, user}
    return (
      <div className={cn('app', state)}>
        <img  className="background" src={`${state}-background.svg`}/>
        <div className="main">
          <div className="illustration">
            <img src={`${state}.svg`}/>
          </div>
          <Info {...info}/>
        </div>
      </div>
    )
  }
}

