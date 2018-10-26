
/* eslint-disable no-unused-vars */

// IMPORT
import React, { Component } from 'react'
import GVARS from '../../utils/globalVars'

// css
import './ProfilePicManager.scss'

/* eslint-enable no-unused-vars */

const NO_PIC_BG = 'https://images.unsplash.com/photo-1537037124419-bdc2fa27f648?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e8f0934c701f8f1a35b3229d1001a0e8&auto=format&fit=crop&w=1350&q=80'

export default class ProfilePicManager extends Component {
  constructor () {
    super()
    this.state = {
      otherPicsAddr: [],
      mainPicAddr: '',
      pic2Upload: ''
    }
  }

  async deletePic (event) {
    console.log('deletePic: ', event.target.id)
    let rmSrc = event.target.parentElement.childNodes[1].style.backgroundImage
    rmSrc = rmSrc.replace('url("http://localhost:8880', '').replace('")', '')
    console.log('source to rm: ', rmSrc)
    if (rmSrc === NO_PIC_BG) {
      console.log('deletePic: NO ACTION')
      return
    }
    if (rmSrc === this.state.mainPicAddr) {
      this.setState({
        mainPicAddr: ''
      })
    } else {
      let newArr = this.state.otherPicsAddr
      for (let i = 0; i < 5; i++) {
        if (rmSrc === this.state.otherPicsAddr[i]) {
          newArr[i] = ''
          this.setState({
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
    const fetchRep = await window.fetch('/api/picture',
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
    console.log('deletePic: ', imgName)
  }

  handleTopPicClick (event, key) {
    // console.log('handleTopPicClick', event.target.id)
    const otherElem = document.getElementById(event.target.id)
    const mainElem = document.getElementById('picTopMain')
    const oldMainImgUrl = mainElem.style.backgroundImage.replace('url("', '').replace('")', '')
    const newMainImgUrl = otherElem.style.backgroundImage.replace('url("', '').replace('")', '')

    if (newMainImgUrl === NO_PIC_BG) {
      // avoid changing the main to a background image
      return
    }

    mainElem.style.backgroundImage = 'url("'.concat(newMainImgUrl, '")')
    otherElem.style.backgroundImage = 'url("'.concat(oldMainImgUrl, '")')

    // changement dans le state
    let newOtherPicsAddr = this.state.otherPicsAddr
    newOtherPicsAddr[key] = this.state.mainPicAddr
    this.setState({
      otherPicsAddr: newOtherPicsAddr,
      mainPicAddr: newMainImgUrl
    })

    // changement en base
    let dataToSend = {
      token: this.props.userContext.token,
      mainPicName: newMainImgUrl.replace('http://localhost:8880', '')
    }

    window.fetch('/api/picture', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    }).then((response) => {
      if (response.ok) {
        console.log('New main picture set')
      }
    })
  }

  async uploadNewPicture (event) {
    // console.log('CALL uploadNewPicture.. ', event)

    const files = document.getElementById('input-uplPic').files
    const file = files[0]
    /* eslint-disable-next-line */
    const reader = new FileReader()
    reader.onload = (e) => {
      const isMain = (this.state.mainPicAddr.length === 0) ? 0 : 1
      console.log('%c TEST IS MAIN: ', 'color: cyan', isMain)
      let dataToSend = {
        IsMain: isMain,
        rawData: e.target.result,
        token: this.props.userContext.token
      }
      window.fetch(`/api/picture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      }).then((response) => {
        if (response.ok) {
          return (response.json())
        }
      }).then((respData) => {
        if (respData.success) {
          let newOtherPicsAddr = this.state.otherPicsAddr
          newOtherPicsAddr.push(respData.newPicAddr)
          this.setState({
            otherPicsAddr: newOtherPicsAddr
          })
          this.getUserPics()
        }
      })
    }
    reader.readAsDataURL(file)
  }

  // TODO refacto des fetch -> pas besoin du premier fetch pour auth l'utilisateur depuis la mep de verifCreds dans le back
  async getUserPics () {
    // console.log('CALL getUserPics.. ')

    const dataToSend = {
      token: this.props.userContext.token
    }
    const fetchRsp = await window.fetch(`/api/picture/userpics`,
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
    }

    // extract all pics address into picsAddrArr
    const mainPicNum = Number((rspData.result.mainPicNum < 0 ||
    rspData.result.mainPicNum > 4) ? 0 : rspData.result.mainPicNum)
    let picsAddrArr = []
    let mainPicAddr = NO_PIC_BG
    let j = 0
    for (let i = 0; i < 5; i++) {
      if (i !== mainPicNum && rspData.result.picsAddr[i] !== undefined) {
        picsAddrArr[j] = GVARS.backendURL.concat(rspData.result.picsAddr[i])
        j++
      } else if (i === mainPicNum && rspData.result.picsAddr[i] !== undefined) {
        mainPicAddr = GVARS.backendURL.concat(rspData.result.picsAddr[i])
      } else {
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

  displayUserPics () {
    // console.log('CALL displayUserPics: ')
    // for the main
    const mainPicElem = document.getElementById('picTopMain')
    mainPicElem.style.backgroundImage = `url('${this.state.mainPicAddr}')`
    // for the others
    let otherPicElem = []
    otherPicElem[0] = document.getElementById('picTop-1-1')
    otherPicElem[1] = document.getElementById('picTop-2-1')
    otherPicElem[2] = document.getElementById('picTop-1-2')
    otherPicElem[3] = document.getElementById('picTop-2-2')
    // console.log('otherPicElem: ', otherPicElem)
    for (let i = 0; i < otherPicElem.length; i++) {
      if (this.state.otherPicsAddr[i] !== undefined) {
        otherPicElem[i].style.backgroundImage = `url(${this.state.otherPicsAddr[i]})`
      }
      if (this.state.otherPicsAddr[i] === undefined) {
        otherPicElem[i].style.backgroundImage = `url(${NO_PIC_BG})`
      }
    }
    // console.log('END displayUserPics')
  }

  componentWillMount () {
    this.getUserPics()
  }

  componentDidUpdate () {
    this.displayUserPics()
  }

  render () {
    // console.log('ProfilePicManager RENDER: ', this.state)
    return (
      <div className='section' id='ProfilePicManagerSection'>
        <div className='columns'>

          <div className='column' id='col1-1'>

            <figure className='image is-256x256' id='figureTopMain'>
              <button className="delete is-small" id='deleteMain'
                onClick={(e) => this.deletePic(e)}>
              </button>
              <img className='image' id='picTopMain'>
              </img>
            </figure>

          </div>
        </div>

        <div className='columns is-mobile'>
          <div className='column' id='col2-1'>

            <figure className='image is-256x256' id='figureTop-1-1'>
              <button className="delete is-small"
                onClick={(e) => this.deletePic(e)}>
              </button>
              <img className='image' id='picTop-1-1'
                onClick={(e) => this.handleTopPicClick(e, 0)}>
              </img>
            </figure>

            <figure className='image is-256x256' id='figureTop-1-2'>
              <button className="delete is-small"
                onClick={(e) => this.deletePic(e)}>
              </button>
              <img className='image' id='picTop-1-2'
                onClick={(e) => this.handleTopPicClick(e, 2)}>
              </img>
            </figure>

          </div>

          <div className='column' id='col2-2'>

            <figure className='image is-256x256' id='figureTop-2-1'>
              <button className="delete is-small"
                onClick={(e) => this.deletePic(e)}>
              </button>
              <img className='image' id='picTop-2-1'
                onClick={(e) => this.handleTopPicClick(e, 1)}>
              </img>
            </figure>

            <figure className='image is-256x256' id='figureTop-2-2'>
              <button className="delete is-small"
                onClick={(e) => this.deletePic(e)}>
              </button>
              <img className='image' id='picTop-2-2'
                onClick={(e) => this.handleTopPicClick(e, 3)}>
              </img>
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
