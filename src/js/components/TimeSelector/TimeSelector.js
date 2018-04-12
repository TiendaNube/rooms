import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Main from "../Main/Main"
import './timeSelector.css'

export default class TimeSelector extends Component {

  construct(props)
  {
    this.state={
      value:this.props.time
    }

  }

  change(event){
    console.log("event change fired") //to ensure that event was fired
    console.log(event.target.value)
  }

 OptionValues(props) {

    const numbers =  props;
    let items = [];
     for (let i = 0; i <props.length; i++) {

          items.push(<option key={numbers[i]} value={numbers[i]}>{numbers[i]}</option>);
          //here I will be creating my options dynamically based on
          //what props are currently passed to the parent component
     }
     return items;
  }

  render() {
     return (
      <div>
        <form>
          <label>
            <span className="reservation">Reservar por:</span>
            <select id="time" onChange={this.change}>
              {this.OptionValues(this.props.time)}
            </select>
          </label>
        </form>
      </div>
    )
  }
}
