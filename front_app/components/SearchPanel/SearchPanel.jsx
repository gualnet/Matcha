/* eslint-disable no-unused-vars */
// IMPORT
import React, { Component } from 'react'

// CSS
import './SearchPanel.scss'
// ! Dev
import ReactJson from 'react-json-view'
import { promisify } from 'util'
/* eslint-enable no-unused-vars */

/* eslint-disable */
export default class SearchPanel extends Component {
  state = {
    // Age: 0,
    // Distance: 0,
    Tags: [],
    // TagList: []
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

  setPopularity = (event, key) => {
    // console.log('setPopularity: ', event.target.value)
    const popVal = Number(event.target.value)
    if (key === 0) {
      if (popVal >= this.props.parentStateFilters.PopMax) {
        return
      }
      this.props.setParentPopularity([
        popVal, this.props.parentStateFilters.PopMax])
    } else if (key === 1) {
      if (popVal <= this.props.parentStateFilters.PopMin) {
        return
      }
      this.props.setParentPopularity([
        this.props.parentStateFilters.PopMin, popVal])
    }
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

  handleOrientationClick = (event) => {
    // event.persist()
    // console.log('handleCheckboxClick: ', event._targetInst.key)
    // console.log('handleCheckboxClick: ', key, event.target.checked)
    const key = event._targetInst.key
    let orientation = this.props.parentStateFilters.Orientation
    orientation[key] = event.target.checked
    this.props.setParentOrientation(orientation)
  }

  tagEnventHandler = (event) => {
    // event.persist()
    console.log('COUCOU', event.type, event)

    switch (event.type) {
      case ('mouseenter'):
        event.target.className = 'tag is-danger'
        break
      case ('mouseleave'):
        event.target.className = 'tag is-primary'
        break
      case ('click'):
        // event.target.style.display = 'none'
        const tag = this.state.Tags
        console.log('AV', tag)
        const newArr = tag.filter((val) => {
          return (val !== event.target.innerText)
        })
        console.log('AP', newArr)
        this.setState({
          Tags: newArr
        })
        this.props.setParentTags(newArr)
        break
      default:
        break
    }
  }

  displayTags = () => {
    const tags = this.state.Tags
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

  handleAddTag = (event) => {
    console.log('handleAddTag', event.target.value)
    for (let val in this.state.Tags) {
      if (this.state.Tags[val] === event.target.value) {
        return
      }
    }

    const newTags = [...this.state.Tags, `${event.target.value}`]
    this.setState({
      Tags: newTags
    })
    this.props.setParentTags(newTags)
    // console.log('handleAddTag', event.target.value)
  }

  makeSelectOptions = () => {
    const tags = this.props.TagList
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

  render () {
    console.log('%c  Panel RENDER', 'color: cyan')
    return (

      <aside className='menu' id='searchPanel'>
        {/* <ReactJson src={this.state}></ReactJson> */}
        <p className='menu-label'>FILTERS</p>
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
            defaultValue='500' type='range'
            onChange={this.setDistance}>
          </input>

          <div>
            interval de popularité
            <li><a>Pop Min: {this.props.parentStateFilters.PopMin}</a></li>
          <input className='slider has-output'
            step='10' min='-100' max='0'
            defaultValue='-100' type='range'
            onChange={(e) => this.setPopularity(e, 0)}>
          </input>

          <li><a>Pop Max: {this.props.parentStateFilters.PopMax}</a></li>
          <input className='slider has-output'
            step='10' min='0' max='100'
            defaultValue='100' type='range'
            onChange={(e) => this.setPopularity(e, 1)}>
          </input>
          </div>

          <div className=''><a>Tags</a>
            {/* <input className='input is-small' type='tags' placeholder='Add Tag'/> */}
            {
              this.state.Tags.length !== 0 &&
              <div className='box'>
                {this.displayTags()}
              </div>
            }
          </div>
          <div className="select is-small">
            <select defaultValue='tags'
              onChange={(e) => { this.handleAddTag(e) }}>
              <option>...</option>
              {this.makeSelectOptions()}
            </select>
          </div>
        </ul>

        <div className='section'>
          <button className='button is-link' onClick={this.props.initData}>Get All Data..</button>
          <button className='button is-link' onClick={this.props.getFilteredData}>Get 1-Filtered Data..</button>
        </div>
      </aside>
    )
  }
}

{/* <div className=''><a>Gender:</a>
  <div className='underPan is-close'>
    <div><input key='0' className='checkbox' type='checkbox' onClick={this.handleGenderClick}/><img className='svg' src={`/assets/icons/maleGenderSym.svg`}/></div>
    <div><input key='1' className='checkbox' type='checkbox' onClick={this.handleGenderClick}/><img className='svg' src={`/assets/icons/femaleGenderSym.svg`}/></div>
    <div><input key='2' className='checkbox' type='checkbox' onClick={this.handleGenderClick}/><img className='svg' src={`/assets/icons/BiGenderSymb.svg`}/></div>
  </div>
</div> */}

{/* <div className=''><a>Orientation:</a>
  <div className='underPan is-close'>
    <div><input key='0' className='checkbox' type='checkbox' onClick={this.handleOrientationClick}/><img className='svg' src={`/assets/icons/maleGenderSym.svg`}/></div>
    <div><input key='1' className='checkbox' type='checkbox' onClick={this.handleOrientationClick}/><img className='svg' src={`/assets/icons/femaleGenderSym.svg`}/></div>
    <div><input key='2' className='checkbox' type='checkbox' onClick={this.handleOrientationClick}/><img className='svg' src={`/assets/icons/BiGenderSymb.svg`}/></div>
  </div>
</div> */}