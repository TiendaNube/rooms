import React, { Component } from 'react'
import './roomName.css'

export default class RoomName extends Component {
    constructor(props){
      super()
    }
    render(){
   	  const { name } = this.props
    	return (
			  <div>
        <h1 className="room-name">{name}</h1>
        </div>
    	)
    }
}
