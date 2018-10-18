/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

/* eslint-enable no-unused-vars */

/* eslint-disable */
export default class ManualLocationHandler extends Component {
  constructor (props) {
    super(props)
    this.state = {
      locInput: ''
    }
  }

  handleInputChange = (event) => {
    this.setState({
      locInput: event.target.value
    })
  }

  submitManualLocation = () => {
    window.fetch('', {
      /
    })
  }


  render () {
    return (
      <div className='ManualLocationHandlerWrapper'>
        <div className='box'>
          <div className='container has-text-centered'>
            <label>set manual location : </label>
          </div>
          <div className='container has-text-centered'>
            <input
              value={this.state.locInput}
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div className='container has-text-centered'>
            <button
              className='button is-warning'
              onClick={this.submitManualLocation}
            >Save</button>
          </div>
        </div>
      </div>
    )
  }
}
