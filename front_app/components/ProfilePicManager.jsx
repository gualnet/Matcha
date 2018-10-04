
/* eslint-disable no-unused-vars */
// IMPORT
import React, { Component } from 'react'

import GVARS from '../utils/globalVars'
// css
import { css } from '../assets/scss/components/ProfilePicManager.scss'

/* eslint-enable no-unused-vars */

const NO_PIC_ADDR = 'https://images.unsplash.com/photo-1453814235491-3cfac3999928?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f05da4077424625439e156f87d204797&auto=format&fit=crop&w=1350&q=80'

export default class ProfilePicManager extends Component {
  constructor () {
    super()
    this.state = {
      otherPicsAddr: [
        // 'https://images.unsplash.com/photo-1518303381723-e97614db478d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8d14ee16b2c958aa50777528bce69253&auto=format&fit=crop&w=1050&q=80', 'https://images.unsplash.com/photo-1517544845501-bb7810f64d76?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjM3Njd9&s=31461f5d664c628c0cbc1ed89d37a34a&auto=format&fit=crop&w=1051&q=80', 'https://images.unsplash.com/photo-1517976547714-720226b864c1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=079d92b0c69a30c1185678b154acd74a&auto=format&fit=crop&w=1350&q=80', 'https://images.unsplash.com/photo-1504192010706-dd7f569ee2be?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bbcd4b9aebd1b25d4f79a1fc24094b6a&auto=format&fit=crop&w=1051&q=80'
      ],
      mainPicAddr: '',
      pic2Upload: ''
    }
  }

  /* eslint-disable */
  async deletePic (event) {
    console.log('deletePic: ', event.target.id)
    // console.log('deletePic: ', event.target.parentElement)
    // console.log('deletePic: ', event.target.parentElement.childNodes[1].src)
    const rmSrc = event.target.parentElement.childNodes[1].src
    if (rmSrc === NO_PIC_ADDR) {
      return
    }
    if (rmSrc === this.state.mainPicAddr) {
      this.setState({
        ...this.state,
        mainPicAddr: ''
      })
    } else {
      let newArr = this.state.otherPicsAddr
      for (let i = 0; i < 5; i++) {
        if (rmSrc === this.state.otherPicsAddr[i]) {
          newArr[i] = ''
          this.setState({
            ...this.state,
            otherPicsAddr: newArr
          })
          break
        }
      }
    }

    const imgName = rmSrc.replace('http://localhost:8880', '')
    let dataToSend = {
      token: this.props.userContext.token,
      rmPic: imgName
    }
    const fetchRep = await window.fetch('http://localhost:8880/api/picture',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      })
    if (fetchRep.ok) {
      this.getUserPics()
    }
    
    // for (let i = 0; i < this.state.)
    // const imgName = rmSrc.replace('http://localhost:8880/public/', '')
    console.log('deletePic: ', imgName)
  }

  initBottomPicsPosition () {
    let elemsPicBottom = []
    elemsPicBottom[0] = document.getElementById('picBottom-1-1')
    elemsPicBottom[1] = document.getElementById('picBottom-2-1')
    elemsPicBottom[2] = document.getElementById('picBottom-1-2')
    elemsPicBottom[3] = document.getElementById('picBottom-2-2')
    // console.log('elems: ', elemsPicBottom)
    let elemsPicTop = []
    elemsPicTop[0] = document.getElementById('picTop-1-1')
    elemsPicTop[1] = document.getElementById('picTop-2-1')
    elemsPicTop[2] = document.getElementById('picTop-1-2')
    elemsPicTop[3] = document.getElementById('picTop-2-2')
    // console.log('elems: ', elemsPicTop)
    // let PicTopheight = elemsPicTop[0].offsetHeight
    // console.log('PicTopheight: ', PicTopheight)

    for (let i = 0; i < 4; i++) {
      elemsPicBottom[i].style.top = `-${elemsPicTop[0].offsetHeight}px`
      // elemsPicBottom[i].style.top = `-${PicTopheight}px`
      elemsPicBottom[i].setAttribute('src', NO_PIC_ADDR)
    }

  }

  handleTopPicClick (event, key) {
    console.log('handleTopPicClick', event.target)
    console.log('handleTopPicClick', event.target.id)

    const selectedPic = event.target.src
    let newOtherPicsAddr = this.state.otherPicsAddr
    newOtherPicsAddr[key] = this.state.mainPicAddr

    this.setState({
      otherPicsAddr: newOtherPicsAddr,
      mainPicAddr: selectedPic
    })
  }

  async uploadNewPicture (event) {
    // console.log('CALL uploadNewPicture.. ', event.dataTransfer)
    // console.log('CALL uploadNewPicture.. ', event)
    // console.log('CALL uploadNewPicture.. ', event.target)
    // console.log('CALL uploadNewPicture.. ', event.target.value)

    const files = document.getElementById('input-uplPic').files
    const file = files[0]
    // console.log('FILES: ', files)
    // console.log('Uploaded: ', file)
    // photoCanvas.setAttribute('src', window.URL.createObjectURL(file))
    /* eslint-disable-next-line */
    const reader = new FileReader()
    reader.onload = (e) => {
      // const rawPicData = e.target.result
      // console.log('BLOB: ', e.target.result)
      let dataToSend = {
        rawData: e.target.result,
        token: this.props.userContext.token
      }
      const fetchRep = window.fetch(`http://localhost:8880/api/picture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      })
      if (fetchRep.ok) {
        this.getUserPics()
      }
    }
    reader.readAsDataURL(file)
  }

  async getUserPics () {
    console.log('CALL getUserPics.. ')

    const dataToSend = {
      token: this.props.userContext.token
    }
    const fetchRsp = await window.fetch(`http://localhost:8880/api/picture/userpics`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      }
    )
    if (fetchRsp.ok) {
      var rspData = await fetchRsp.json()
      console.log('Server Response: ', rspData)
    }

    // extract all pics address into picsAddrArr
    const mainPicNum = Number((rspData.result.mainPicNum < 0 ||
    rspData.result.mainPicNum > 4) ? 0 : rspData.result.mainPicNum)
    let picsAddrArr = []
    let mainPicAddr = NO_PIC_ADDR
    let j = 0
    for (let i = 0; i < 5; i++) {
      if (i !== mainPicNum && rspData.result.picsAddr[i] !== undefined) {
        picsAddrArr[j] = GVARS.backendURL.concat(rspData.result.picsAddr[i])
        j++
      } else if (i === mainPicNum && rspData.result.picsAddr[i] !== undefined) {
        mainPicAddr = GVARS.backendURL.concat(rspData.result.picsAddr[i])
      } else {
        // picsAddrArr[j] = NO_PIC_ADDR
        picsAddrArr[j] = undefined
        j++
      }
    }

    if (rspData.success) {
      this.setState({
        otherPicsAddr: picsAddrArr,
        mainPicAddr: mainPicAddr
      })
    }
    // console.log('END getUserPics.. ', this.state)
  }

  componentWillMount () {
    this.getUserPics()
  }

  componentDidMount () {
    this.initBottomPicsPosition()
  }

  render () {
    console.log('ProfilePicManager RENDER: ', this.state)
    return (
      <div className='section' id='ProfilePicManagerSection'>
        <div className='columns'>

          <div className='column' id='col1-1'>
            <figure className='image is-256x256' id='figureTopMain'>

              <button className="delete is-small" id='deleteMain'
                onClick={(e) => this.deletePic(e)}
              ></button>
              <img className='image' id='picTopMain'
                src={this.state.mainPicAddr}>
              </img>

            </figure>
          </div>
        </div>
        <div className='columns is-mobile'>
          <div className='column' id='col2-1'>

            <figure className='image is-256x256' id='figureTop-1-1'>

              <button className="delete is-small"
                onClick={(e) => this.deletePic(e)}
              ></button>
              <img className='image' id='picTop-1-1'
                onClick={(e) => this.handleTopPicClick(e, 0)}
                src={this.state.otherPicsAddr[0]} >
              </img>

            </figure>
            <figure className='image is-256x256'>

              <img className='image' id='picBottom-1-1' ></img>

            </figure>
            <figure className='image is-256x256' id='figureTop-1-2'>

              <button className="delete is-small"
                onClick={(e) => this.deletePic(e)}
              ></button>
              <img className='image' id='picTop-1-2'
                onClick={(e) => this.handleTopPicClick(e, 1)}
                src={this.state.otherPicsAddr[1]} >
              </img>

            </figure>
            <figure className='image is-256x256'>

              <img className='image' id='picBottom-1-2' ></img>

            </figure>

          </div>
          <div className='column' id='col2-2'>

            <figure className='image is-256x256' id='figureTop-2-1'>

              <button className="delete is-small"
                onClick={(e) => this.deletePic(e)}
              ></button>
              <img className='image' id='picTop-2-1'
                onClick={(e) => this.handleTopPicClick(e, 2)}
                src={this.state.otherPicsAddr[2]} >
              </img>

            </figure>
            <figure className='image is-256x256'>
              <img className='image' id='picBottom-2-1' ></img>

            </figure>
            <figure className='image is-256x256' id='figureTop-2-2'>

              <button className="delete is-small"
                onClick={(e) => this.deletePic(e)}
              ></button>
              <img className='image' id='picTop-2-2'
                onClick={(e) => this.handleTopPicClick(e, 3)}
                src={this.state.otherPicsAddr[3]} >
              </img>

            </figure>
            <figure className='image is-256x256'>
              <img className='image' id='picBottom-2-2' ></img>

            </figure>

          </div>
        </div>

        <div className='columns is-mobile is-centered'>
          <form action='http://localhost:8880/api/picture' method='POST'>
            <div className='file has-name'>
              <label className='file-label'>
                <input className='file-input'
                  id='input-uplPic'
                  type='file' accept='image/*'
                  name='UplPic' defaultValue=''
                  onChange={(e) => this.uploadNewPicture(e)}
                />
                <span className='file-cta'>
                  <span className='file-icon'>
                    <i className='fas fa-upload'></i>
                  </span>
                  <span className='file-label'>
                    Choose a file…
                  </span>
                </span>
                <span className='file-name'>
                  Nom du file
                </span>
              </label>
            </div>
          </form>

        </div>
      </div>
    )
  }
}
