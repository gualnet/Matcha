/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

// CSS
import './MemberModal.scss'
/* eslint-enable no-unused-vars */

/* eslint-disable */
export default class MemberModal extends Component {

  hideModal = () => {
		const modal = document.getElementsByClassName('modal')[0]
		if (modal == undefined) {
			console.log('%c Modal not found', 'color: red', modal)
			return
		}

		modal.className = 'modal'
	}

  render () {
    return (
      <div className='modal' onClick={this.hideModal}>
        <div className='modal-background'></div>
        <div className='modal-content'>
          <div>
            photo
            info
          </div>
          

        </div>
      </div>
    )
  }
}
