import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from "./styles.js"
import cn from 'classnames'

export default class Main extends Component {
  constructor(props,context){
    super(props,context)
    console.log(props)
  }
  render() {
    const { label, time, state } = this.props

    return (
      <div style={Styles.App }>
        <img  style={Styles.Background} src={`${state}-background.svg`}/>
        <div style={Styles.Main}>
          <div style={Styles.Illustration}>
            <img src={`${state}.svg`}/>
          </div>
          <div style={Styles.Info}>
            <div style={Styles.Label}>{label}</div>
            <div style={Styles.Time}>{time}</div>
          </div>
        </div>
      </div>
    )
  }
}
