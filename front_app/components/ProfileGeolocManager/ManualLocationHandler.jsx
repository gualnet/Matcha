/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

/* eslint-enable no-unused-vars */

/* eslint-disable */
export default class ManualLocationHandler extends Component {
  constructor (props) {
    super(props)
    this.state = {
      locInput: '',
      suggestions: []
    }
  }

  handleInputChange = (event) => {
    console.log('handleInputChange...')
    this.setState({
      locInput: event.target.value
    })
  }

  handleSuggestionClick = (event) => {
    console.log('handleSuggestionClick...')
    this.setState({
      locInput: event.target.value,
      suggestions: []
    })
  }

  // TODO set correctly the fetch and display according to the final UI
  fetchSuggest = async () => {
    console.log('%c fetchSuggest', 'color: blue')
    const word = this.state.locInput

    if (word.length > 2) {
      const fetchRep = await window.fetch(`https://geo.api.gouv.fr/communes?nom=${word}`)
      if (fetchRep.ok) {
        const repData = await fetchRep.json()
        console.log('repData', {repData})
        this.setState({
          suggestions: repData
        })
      } else {
        console.error('%c ERROR: ', 'color: red;', {fetchRep})
      }
    } else {
      this.setState({
        suggestions: []
      })
    }

  }

  displaySuggestion = () => {
    console.log('%c displaySuggestion', 'color: blue', this.state)
    const MAX_SUGGEST = '20'
    const sug = this.state.suggestions
    let arr = []
    if (sug.length < 1) {
      return ([<option key='0'>...</option>])
    }

    for (let idx in sug) {
      arr.push(
        <option
          key={idx}
          onClick={this.handleSuggestionClick}
          value={`${sug[idx].nom}`}>{`${sug[idx].nom} - ${sug[idx].population}`}
        >
        </option>
      )
      if (idx === MAX_SUGGEST) {
        break
      }
    }
    return (arr)
  }

  componentWillUpdate () {
    console.log('%c componentWillUpdate', 'color: orange')
    // this.fetchSuggest()
  }

  componentDidUpdate () {
    console.log('%c componentDidUpdate', 'color: orange')
  }

  render () {
    console.log('%c ManualLocationHandler RENDER', 'color: blue', this)
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
              onClick={() => this.props.geolocContext.updateManualPos(this.state.locInput)}
              disabled={(this.state.locInput.length > 0) ? false : true}
            >Save</button>
            <button
              className='button is-warning'
              onClick={this.testSuggest}
            >Suggest</button>
            <div className="select is-multiple is-small">
              <select multiple size="8">
                {this.displaySuggestion()}
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
