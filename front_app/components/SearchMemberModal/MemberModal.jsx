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

  displayInterests = (str) => {
    console.log('displayInterests: ', str)
    if (str.length === 0) {
      return
    }
    let arr = []

    const splited = str.split(',')
    console.log('splited', splited)
    splited.forEach(elem => {
      // console.log('elem', elem, typeof elem)
      if (elem.length === 0) {
        // do nothing
      } else {
        let num = Number(elem)
        // console.log('num', num, typeof num)
        for (let elem in this.props.tagList) {
          if (this.props.tagList[elem].TagsId === num) {
            console.log('this.props.tagList[elem]', this.props.tagList[elem])
            arr.push(
              <span key={elem} className="tag is-light">
                {this.props.tagList[elem].Name}
              </span>
            )
            break
          }
        }
      }
    })
    return (arr)
  }

  handleLike = (type, targetId = -1) => {
    console.log('handleLike', targetId)
    if (targetId === -1) {
      return
    }
    if (type === 'like') {
      Axios({
        method: 'POST',
        url: `/api/interact/like`,
        data: { 
          uid: this.props.userContext.uid,
          token: this.props.userContext.token,
          target: targetId }
      })
      // TODO reprendre la liste des like de la reponse au lieu de refaire une requete
      const usrData = this.props.userContext.userData
      this.props.userContext.setState({
        userData: {
          ...usrData,
          Likes: [...usrData.Likes, targetId]
        }
      })
      // TODO ^^^^^^^^^^^^^^^^^^^
    } else if (type === 'unlike') {
      Axios({
        method: 'DELETE',
        url: `/api/interact/like`,
        data: { 
          uid: this.props.userContext.uid,
          token: this.props.userContext.token,
          target: targetId }
      })
      const usrData = this.props.userContext.userData
      this.props.userContext.setState({
        userData: {
          ...usrData,
          Likes: [...usrData.Likes, targetId]
        }
      })
    }
    
  }

  render () {
    console.log('%c Modal RENDER', 'color: cyan', this.props.userContext)
    const MInfo = this.props.memberInfo
    if (MInfo === undefined) {
      console.log('render null')
      return (
        <div className='modal'>
          <div className='modal-background' onClick={this.hideModal}></div>
          <div className='modal-content'>
            <div className='box'>
            </div>
          </div>
        </div>
      )
    }
    console.log('Minfo', MInfo)
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
                <div id='topInfo'>
                  <div className='title' id='i-login'>{`${MInfo.Login}`}</div>
                  <div className='subtitle' id='i-firstName'>{`${MInfo.FirstName}`} - {`${MInfo.Age}`}</div>
                  {/* <div id='age'></div> */}
                  <div id='i-popularity'>Score: {`${MInfo.Popularity} pts`}</div>
                </div>
            }
            {
              MInfo !== undefined &&
                  <div id='i-distance'>
                    <img className='image is-16x16' src='/assets/icons/geoloc.svg' />{` ${MInfo.Distance} km`}
                  </div>
            }
            {
              MInfo !== undefined &&
                  <div id='i-bio'>
                    {`${MInfo.Bio}`}
                  </div>
            }
            {
              <div id='i-tags'>
                <div className='subtitle is-6' id='tag-subtitle'>Tags</div>
                <ol>
                  {this.displayInterests(MInfo.Interest)}
                </ol>
              </div>
            }

            <div className='' id='btnBox'>
              {
                this.props.userContext.userData.Likes.includes(MInfo.UserId) ?
                <button className='button is-light' onClick={() => this.handleLike('like', MInfo.UserId)}>Unlike</button> : <button className='button is-link' onClick={() => this.handleLike('unlike', MInfo.UserId)}>Like</button>
              }
              {
                this.props.userContext.userData.Likes.includes(MInfo.UserId) ?
                <button className='button is-link' onClick={() => this.handleLike('like', MInfo.UserId)}>Message</button> : 
                <button className='button is-light' disabled onClick={() => this.handleLike('unlike', MInfo.UserId)}>Message</button>
              }
              
              {/* <button className='button is-link'>Message</button> */}
              {/* <button className='button is-link'>Block</button>
              <button className='button is-link'>Report</button> */}
            </div>

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
