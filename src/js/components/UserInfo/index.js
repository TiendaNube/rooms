import React, { Component } from 'react'
import ReactAnimatedEllipsis from 'react-animated-ellipsis';

import './userInfo.css'

export default class InfoUser extends Component {
    constructor(props){
      super()
    }
    render(){
   	  const { user } = this.props
      const infoUser = user.fetched ? (
      <div className="user-info">por <strong>@{user.data.display_name}</strong></div>
      ) : (
      <div className="user-info">Investigando <ReactAnimatedEllipsis/></div>
      );
      
    	return <div>{infoUser}</div>
    }
}
