/* eslint-disable no-unused-vars */
// IMPORT
import React, { Component } from 'react'

// CSS
import './SearchPanel.scss'
/* eslint-enable no-unused-vars */

/* eslint-disable */
export default class SearchPanel extends Component {
  state = {
    Age: 18,
    Distance: 30
  }

  setAge = (event) => {
    console.log('setAge: ', event.target.value)
    const min = Number(event.target.value)
    this.props.getChildAgeFilter([min, 0])
    // TODO max value
    // TODO const max = ???
    // TODO this.props.getChildAgeFilter([min, max])
  }

  setDisatance = (event) => {
    this.setState({
      Distance: event.target.value
    })
  }

  handleGenderClick = (event) => {
    // event.persist()
    // console.log('handleCheckboxClick: ', event._targetInst.key)
    // console.log('handleCheckboxClick: ', key, event.target.checked)
    const key = event._targetInst.key
    let gender = this.props.parentStateFilters.Gender
    gender[key] = event.target.checked
    this.props.setParentGender(gender)
  }

  render () {

    return (
      <aside className='menu' id='searchPanel'>
        <p className='menu-label'>MENU</p>
        <ul className='menu-list'>
          <li><a>Age Min: {this.props.parentStateFilters.AgeMin}</a></li>
          <input className='slider has-output'
            step='1' min='18' max='120'
            defaultValue='0' type='range'
            onChange={this.setAge}>
          </input>

          <li><a>Distance : {this.props.parentStateFilters.Distance}</a></li>
          {/* {`>option indiferent<`} */}
          <input className='slider has-output'
            step='10' min='10' max='500'
            defaultValue={this.state.Distance} type='range'
            onChange={this.setDisatance}>
          </input>

          <div className=''><a>Gender</a>
            <div className='underPan is-close'>
                <div><input key='0' className='checkbox' type='checkbox' onClick={this.handleGenderClick}/>Hetero</div>
                <div><input key='1' className='checkbox' type='checkbox' onClick={this.handleGenderClick}/>Bisex</div>
                <div><input key='2' className='checkbox' type='checkbox' onClick={this.handleGenderClick}/>Homo</div>
                {/* <div><input key='3' className='checkbox' type='checkbox' onClick={this.handleGenderClick}/>Pansex</div> */}
                {/* <div><input key='4' className='checkbox' type='checkbox' onClick={this.handleGenderClick}/>Asex</div> */}
            </div>
          </div>

          <div className=''><a>Tags</a>
            <div className='underPan is-close'>
              <div>
                <input className='checkbox' type='checkbox'/> TagXX
              </div>
              <div>
                <input className='checkbox' type='checkbox'/> TagXX
              </div>
              <div>
                <input className='checkbox' type='checkbox'/> TagXX
              </div>
              <div>
                <input className='checkbox' type='checkbox'/> TagXX
              </div>
            </div>
          </div>
        </ul>
        <button className='button is-link' onClick={this.props.initData}>Get All Data..</button>
        <button className='button is-link' onClick={this.props.getFilteredData}>Get Filtered Data..</button>
      </aside>

    )
  }
}
