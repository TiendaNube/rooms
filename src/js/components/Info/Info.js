import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './info.css'


export default class Info extends Component {
    render(){
   	    const { label, state, time, user} = this.props
   	    const info ={
	      state,
	      time,
	    }

    	return (    
			<div className="info">
            	<div className="label">{label}</div>
            	<div className="time">{time}</div>
            	<div className="user">por <strong>@{user}</strong></div>
          	</div>
    	)
    }
}
