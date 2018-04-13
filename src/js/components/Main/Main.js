import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Info from "../Info/Info"
import cn from 'classnames'
import './App.css'
import './Main.css'

import Lottie from 'react-lottie';
import * as animationData from './animate.json'
import * as labelData from './label.json'

export default class Main extends Component {
  constructor(props,context){
    super(props,context)
  }

  render() {
    const { name, status } = this.props
    let label = labelData[status]
    let infoProps={label,status}
    const infoComponent = status ? (
     <Info {...infoProps}/>
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
            <Lottie options={defaultOptions}/>
          </div>
          <div className="info-container">
            {infoComponent}
          </div>
        </div>
      </div>
    )
  }
}
