import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './info.css'
import Button from "../Button/Button"


export default class Info extends Component {
    render(){
   	    const { label, state, time, user} = this.props
   	    const button={ state }

    	return (    
			<div className="info">
            	<div className="label">{label}</div>
            	<div className="time">{time}</div>
            	<div className="user">por <strong>@{user}</strong></div>

            	<Button {...button}/>
          	</div>
    	)
    }
}
