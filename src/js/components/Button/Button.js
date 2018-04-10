import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './button.css'


export default class Button extends Component {
    render(){
   	    const {state} = this.props

    	return (    
        <button className="btn">{`Reservar ${state}`}</button>
    	)
    }
}