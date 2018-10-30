/* eslint-disable no-unused-vars */
// IMPORT
import React, { Component } from 'react'

// CSS
import './SearchPanel.scss'
import Axios from 'axios'
// ! Dev
import ReactJson from 'react-json-view'
import { promisify } from 'util'
/* eslint-enable no-unused-vars */

/* eslint-disable */
export default class SearchPanel extends Component {
  state = {
    // Age: 0,
    // Distance: 0,
    tags: [],
    tagList: []

  }

  setAge = (event, key) => {
    // console.log('setAge: ', event.target.value)
    const ageVal = Number(event.target.value)
    if (key === 0) {
      if (ageVal >= this.props.parentStateFilters.AgeMax) {
        return
      }
      this.props.setParentAge([
        ageVal, this.props.parentStateFilters.AgeMax])
    } else if (key === 1) {
      if (ageVal <= this.props.parentStateFilters.AgeMin) {
        return
      }
      this.props.setParentAge([
        this.props.parentStateFilters.AgeMin, ageVal])
    }

    // TODO max value
    // TODO const max = ???
    // TODO this.props.setParentAge([min, max])
  }

  setDistance = (event) => {
    // console.log('setDistance', event.target.value)
    const dist = Number(event.target.value)
    this.props.setParentDistance(dist)
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

  tagEnventHandler = (event) => {
    // event.persist()
    // console.log('COUCOU', event.type, event)
    switch (event.type) {
      case ('mouseenter'):
        event.target.className = 'tag is-danger'
        break
      case ('mouseleave'):
        event.target.className = 'tag is-primary'
        break
      case ('click'):
        // event.target.style.display = 'none'
        const Tag = this.state.tags
        const newArr = Tag.filter((val) => {
          return (val !== event.target.innerText)
        })
        this.setState({
          tags: newArr
        })
        break

      default:
        break
    }
  }

  displayTags = () => {
    const tags = this.state.tags
    var arr = []
    tags.map((val, key) => {
      // console.log('MAP', val, key)
      arr.push(
        <span key={key} className="tag is-primary"
          onMouseEnter={this.tagEnventHandler}
          onMouseLeave={this.tagEnventHandler}
          onClick={this.tagEnventHandler}>
          {val}
        </span>
      )
    })
    // console.log('ARR', arr)

    return (arr)
  }

  handleHadTag = (event) => {
    // console.log('handleHadTag', event.target.value)
    for (let val in this.state.tags) {
      if (this.state.tags[val] === event.target.value) {
        return
      }
    }

    this.setState({
      tags: [...this.state.tags, `${event.target.value}`]
    })
    // console.log('handleHadTag', event.target.value)
  }

  makeSelectOptions = () => {
    const tags = this.state.tagList
    if (tags === undefined) {
      return
    }
    const options = []
    Object.entries(tags).forEach(
      ([key, value]) => {
        // console.log("tags => ", "key: ", key, "value: ", value.Name)
        options.push(
          <option key={key}>
            {`${value.Name}`}
          </option>
        )
      }
    )
    // console.log('options: ', options)
    return (options)
  }

  componentWillMount () {
    Axios({
      method: 'GET',
      url: `/api/tags/${this.props.userContext.uid}/${this.props.userContext.token}`
    })
      .then((response) => {
        console.log('%c response ok: ', 'color: green', response)
        if (response.data.success) {
          // console.log('---> ', response.data.result)
          this.setState({
            tagList: response.data.result
          })
        } else {
          console.error('%c Get tag list from server returned: ', 'color: red', response.data.msg, response.data)
        }
      })
      .catch((error) => {
        console.error('%c error getting the tag list from server: ', 'color: red', error)
      })
  }

  render () {
    // console.log('%c Panel RENDER', 'color: cyan')
    return (

      <aside className='menu' id='searchPanel'>
        {/* <ReactJson src={this.state.tags}></ReactJson> */}
        <p className='menu-label'>MENU</p>
        <ul className='menu-list'>
          <li><a>Age Min: {this.props.parentStateFilters.AgeMin}</a></li>
          <input className='slider has-output'
            step='1' min='18' max='120'
            defaultValue='18' type='range'
            onChange={(e) => this.setAge(e, 0)}>
          </input>

          <li><a>Age Max: {this.props.parentStateFilters.AgeMax}</a></li>
          <input className='slider has-output'
            step='1' min='18' max='120'
            defaultValue='120' type='range'
            onChange={(e) => this.setAge(e, 1)}>
          </input>

          <li><a>Distance : {this.props.parentStateFilters.Distance}</a></li>
          {/* {`>option indiferent<`} */}
          <input className='slider has-output'
            step='10' min='10' max='500'
            defaultValue='0' type='range'
            onChange={this.setDistance}>
          </input>

          <div className=''><a>Gender</a>
            <div className='underPan is-close'>
              <div><input key='0' className='checkbox' type='checkbox' onClick={this.handleGenderClick}/><img className='svg' src={`/assets/icons/maleGenderSym.svg`}/></div>
              <div><input key='1' className='checkbox' type='checkbox' onClick={this.handleGenderClick}/><img className='svg' src={`/assets/icons/femaleGenderSym.svg`}/></div>
              <div><input key='1' className='checkbox' type='checkbox' onClick={this.handleGenderClick}/><img className='svg' src={`/assets/icons/BiGenderSymb.svg`}/></div>

            </div>
          </div>

          <div className=''><a>Tags</a>
            {/* <input className='input is-small' type='tags' placeholder='Add Tag'/> */}
            {
              this.state.tags.length !== 0 &&
              <div className='box'>
                {this.displayTags()}
              </div>
            }
          </div>
          <div className="select is-small">
            <select defaultValue='tags'
              onChange={(e) => { this.handleHadTag(e) }}>
              <option>...</option>
              {this.makeSelectOptions()}
            </select>
          </div>
        </ul>

        <div className='section'>
          <button className='button is-link' onClick={this.props.initData}>Get All Data..</button>
          <button className='button is-link' onClick={this.props.getFilteredData}>Get Filtered Data..</button>
        </div>
      </aside>

    )
  }
}
