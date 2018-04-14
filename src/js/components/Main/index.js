import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Lottie from 'react-lottie';

import Info from "../Info/Info"
import './Main.css'
import * as animationData from './animate.json'
import Config from './config'

export default class Main extends Component {
  constructor(props,context){
    super(props,context)
  }

  render() {
    const { name, roomId } = this.props
    const statusName=this.props.status.name
    let label = Config.label[statusName]
    let infoProps={label,statusName, roomId}
    const infoComponent = statusName ? (
     <Info {...infoProps}/>
      ) : (
     <div></div>
    );
    const animationOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData[statusName]
    };

    return (
        <div className="main">
          <h1 className="room-name">{name}</h1>
          <div className="illustration">
            <Lottie options={animationOptions}/>
          </div>
          <div className="info-container">
            {infoComponent}
          </div>
        </div>
    )
  }
}
