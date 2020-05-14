/* eslint-disable no-unused-vars */
import React from 'react'

// COMPONENT

// CSS

// ! Dev
import ReactJson from 'react-json-view'
import Axios from 'axios'
/* eslint-enable no-unused-vars */

// /* eslint-disable */
class Admin extends React.Component {
  state = {
    data: {}
  }

  componentDidMount () {
    Axios('/api/admin/createRandomUser')
      .then((response) => {
        console.log('asios response:', response)
        this.setState({
          data: { ...response.data.result }
        })
      })
      .catch((error) => {
        console.log('response err: ', error)
      })
  }

  render () {
    return (
      <div>
        <div className='title is-5'>ADMIN</div>

        <ReactJson src={this.state.data} name='' collapsed='1' />

      </div>
    )
  }
}

export default Admin
