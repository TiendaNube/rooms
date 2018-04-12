import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Info from "../Info/Info"
import cn from 'classnames'
import './App.css'
import './Main.css'
import TimeSelector from "../TimeSelector/TimeSelector"

import Lottie from 'react-lottie';
import * as animationData from './animate.json'
import * as labelData from './label.json'


export default class Main extends Component {
  constructor(props,context){
    super(props,context)
  }

  render() {
    const { name, time, status, user, slot } = this.props
    let label = labelData[status]
    const info = {label, time, user, status ,slot}

    const infoComponent = status ? (
     <Info {...info}/>
      ) : (
     <div></div>
    );

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData[status]
    };

    return (
      <div className={cn('app', status)}>
        <img className="background" src={`img/${status}-background.svg`}/>
        <div className="main">
          <h1 className="room-name">{name}</h1>
          <div className="illustration">
            <img src={`img/${status}.svg`}/>
          </div>

          <div id="animation" className="animation">
            <Lottie options={defaultOptions}/>
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
