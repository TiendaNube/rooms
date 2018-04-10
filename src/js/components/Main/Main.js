import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from "./styles.js"
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
    const { label, time, state } = this.props
    const info={
      label,
      state,
      time,
      user:"Guillermo"
    }
    return (
      <div className={cn('App', state)}>
        <img  style={Styles.Background} src={`${state}-background.svg`}/>
        <div className="Main">
          <div style={Styles.Illustration}>
            <img src={`${state}.svg`}/>
          </div>
          <Info {...info}/>
        </div>
      </div>
    )
  }
}

