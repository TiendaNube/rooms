import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class TimeSelector extends Component {

  construct(props)
  {

    //this.handleTimer = this.handleTimer.bind(this);
    console.log("prueba")
    console.log(this.props)
    this.state={
      value:this.props.times[0]
    }

  }

  change(event){
    console.log("event change fired") //to ensure that event was fired
    console.log(event.target.value)
  }

  render() {
     return (
      <div>
        <form>
          <label>{this.props.times[0]}
            <select id="time" onChange={this.change}>

            </select>
          </label>
        </form>
      </div>
    )
  }
}

function OptionValues(props) {
  const numbers = props.options;
  const listItems = numbers.map((number) =>
    <option>{number}</option>
  );
  return (
    {listItems}
  );
}
