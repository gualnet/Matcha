/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Axios from 'axios'

// CSS
import './MemberModal.scss'

// ! Dev
import ReactJson from 'react-json-view'
/* eslint-enable no-unused-vars */

/* eslint-disable */
export default class MemberModal extends Component {
  state = {
    mainPic: -1,
    pictures: []
  }

  hideModal = () => {
		const modal = document.getElementsByClassName('modal')[0]
		if (modal == undefined) {
			console.log('%c Modal not found', 'color: red', modal)
			return
		}

		modal.className = 'modal'
  }
  
  getPictures = () => {
    if (this.props.memberInfo === undefined || this.props.userContext === undefined) {
      return
    }
    const dataToSend = {
      uid: this.props.userContext.uid,
      token: this.props.userContext.token
    }
    Axios({
      method: 'POST',
      url: `api/picture/${this.props.memberInfo.UserId}`,
      data: dataToSend
    })
      .then((response) => {
        console.log('%c AXIOS response: ', 'color: green', response.data)
        // let pics = []
        // this.setState({
        //   pictures
        // })
      })
      .catch((error) => {
        console.error('%c AXIOS response: ', 'color: red', error)
      })
  }

  render () {
    console.log('%c Modal RENDER', 'color: cyan')
    const MInfo = this.props.memberInfo
    this.getPictures()
    return (
      <div className='modal'>
        <div className='modal-background' onClick={this.hideModal}></div>
        <div className='modal-content'>
          <div className='box'>

            <div className='carousel carousel-animated carousel-animate-slide'>
              <div className='carousel-container'>
                <div className='carousel-item has-background is-active'>
                  <img className='is-background' 
                    src={MInfo !== undefined ? MInfo.PicPath : ''}
                    alt='member picture x' width='200' height='200' />
                    <div className="carousel-nav-left">
                      <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    </div>
                    <div className="carousel-nav-right">
                      <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    </div>
                </div>

                  
                </div>
              </div>

              

            {/* <ReactJson
              src={this.props}
              // src={MInfo}
            ></ReactJson> */}

          </div>
        </div>
      </div>
    )
  }
}
