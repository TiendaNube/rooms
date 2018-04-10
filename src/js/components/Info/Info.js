import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from "./styles.js"


export default class Info extends Component {
    render(){
   	    const { label, state, time, user} = this.props
   	    const info ={
	      state,
	      time,
	    }

    	return (    
			<div style={Styles.Info}>
            	<div style={Styles.Label}>{label}</div>
            	<div style={Styles.Time}>{time}</div>

            	<div>por @{user}</div>

          	</div>
    	)
    }
}
