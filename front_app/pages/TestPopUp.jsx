// IMPORT
/* eslint-disable no-unused-vars */
import React from 'react'
import MsgPop from '../components/MsgPop/MsgPop.jsx'

// CSS

/* eslint-enable no-unused-vars */

// const msgpop = new MsgPop()
/* eslint-disable */
export default class Members extends React.Component {
  constructor () {
    super()
    this.state = {
      showToast: false,
      level: 'success',
      message: null
    }
  }

  onLevelChange (e) {
    this.setState({
      level: e.target.value
    })
  }
  
  onMessageChange (e) {
    this.setState({
      message: e.target.value
    })
  }
  
  showToast (e) {
    e.preventDefault()
    
    this.setState({
      showToast: true
    }, () => {
      setTimeout(() =>
        this.setState({ showToast: false })
    ,  3000)
    })
  }

  render () {
    return (
      <form onSubmit={this.showToast.bind(this)}>
        <select 
          onChange={this.onLevelChange.bind(this)} 
          required
          >
          <option defaultValue="">Select level</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="danger">Danger</option>
        </select>
        <input 
          onChange={this.onMessageChange.bind(this)}
          placeholder="Enter message"
          required
        />
        <button type="submit">Show toast</button>
        
        <MsgPop
          level={this.state.level}
          message={this.state.message}
          visible={this.state.showToast}
        />
      </form>
    )
  }
  
  
}
