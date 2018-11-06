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
    pictures: [],
    pictures2: this.props.pic2
  }

  hideModal = () => {
		const modal = document.getElementsByClassName('modal')[0]
		if (modal == undefined) {
			console.log('%c Modal not found', 'color: red', modal)
			return
		}

		modal.className = 'modal'
  }

  carouselPicChange = (event, go) => {
    // console.log('carouselPicChange', go)
    const arr = this.props.memberInfo.pictures
    if (arr.length <= 1) {
      return
    }
    const elem = document.getElementById('carouImg')
    const idx = arr.indexOf(elem.src.replace(window.location.origin, ''))
    console.log('Looking for: ', elem.src.replace(window.location.origin, ''), arr)
    console.log('Start idx: ', idx, elem.src.replace(window.location.origin, ''), arr)

    if (go === 'next' && idx + 1 < arr.length) {
      // console.log('Cas0 ', idx, idx + 1)
      elem.src = arr[idx + 1]
    } else if (go === 'next' && idx + 1 === arr.length) {
      // console.log('Cas1 ', idx, 0)
      elem.src = arr[0]
    } else if (go === 'prev' && idx - 1 > 0) {
      // console.log('Cas2 ', idx, idx - 1)
      elem.src = arr[idx - 1]
    } else if (go === 'prev') {
      // console.log('Cas3 ', idx, arr.length - 1)
      elem.src = arr[arr.length - 1]
    }
  }

  render () {
    console.log('%c Modal RENDER', 'color: cyan')
    const MInfo = this.props.memberInfo
    
    return (
      <div className='modal'>
        <div className='modal-background' onClick={this.hideModal}></div>
        <div className='modal-content'>
          <div className='box'>
            <div className='carousel-items'>
              <img className='is-background' id='carouImg'
                src={MInfo !== undefined ? MInfo.PicPath : ''}
                alt='member picture x' width='200' height='200' />
              <div className="nav-left">
                <i className="fa fa-chevron-left" aria-hidden="true" onClick={(e) => this.carouselPicChange(e, 'prev')}></i>
              </div>
              <div className="nav-right">
                <i className="fa fa-chevron-right" aria-hidden="true" onClick={(e) => this.carouselPicChange(e, 'next')}></i>
              </div>
            </div>
            {
              MInfo !== undefined &&
              <div>
                <div><img className='image is-16x16' src='/assets/icons/geoloc.svg' />{`${MInfo.Distance}km`}</div>
                <div>{`${MInfo.Login}`} {`${MInfo.Age}`}</div>
                <div>{`${MInfo.Popularity}pts`}</div>
                <div>{`${MInfo.Bio}`}</div>
              </div>
            }
            {/* <div>Sex</div>
            <div>Nom</div>
            <div>Prenom</div>
            <div>Bio</div>
            <div>Tags</div> */}

          </div>

            {/* <ReactJson
              src={this.props}
              // src={MInfo}
            ></ReactJson> */}

          </div>
      </div>
    )
  }
}
