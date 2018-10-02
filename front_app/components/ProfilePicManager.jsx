
/* eslint-disable no-unused-vars */
// IMPORT
import React, { Component } from 'react'

// css
import { css } from '../assets/scss/components/ProfilePicManager.scss'

/* eslint-enable no-unused-vars */

export default class ProfilePicManager extends Component {
  constructor () {
    super()
    this.state = {
      // otherPicsAddr: [null,null,null,null],
      otherPicsAddr: [
        'https://images.unsplash.com/photo-1518303381723-e97614db478d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8d14ee16b2c958aa50777528bce69253&auto=format&fit=crop&w=1050&q=80', 'https://images.unsplash.com/photo-1517544845501-bb7810f64d76?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjM3Njd9&s=31461f5d664c628c0cbc1ed89d37a34a&auto=format&fit=crop&w=1051&q=80', 'https://images.unsplash.com/photo-1517976547714-720226b864c1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=079d92b0c69a30c1185678b154acd74a&auto=format&fit=crop&w=1350&q=80', 'https://images.unsplash.com/photo-1504192010706-dd7f569ee2be?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bbcd4b9aebd1b25d4f79a1fc24094b6a&auto=format&fit=crop&w=1051&q=80'
      ],
      mainPicAddr: 'https://images.unsplash.com/photo-1520113412646-04fc68c0bc21?ixlib=rb-0.3.5&s=538cf28e775907317affd10bb5030af9&auto=format&fit=crop&w=1051&q=80',
      pic2Upload: ''
    }
  }

  initBottomPicsPosition () {
    let elemsPicBottom = []
    elemsPicBottom[0] = document.getElementById('picBottom-1-1')
    elemsPicBottom[1] = document.getElementById('picBottom-2-1')
    elemsPicBottom[2] = document.getElementById('picBottom-1-2')
    elemsPicBottom[3] = document.getElementById('picBottom-2-2')
    console.log('elems: ', elemsPicBottom)
    let elemsPicTop = []
    elemsPicTop[0] = document.getElementById('picTop-1-1')
    elemsPicTop[1] = document.getElementById('picTop-2-1')
    elemsPicTop[2] = document.getElementById('picTop-1-2')
    elemsPicTop[3] = document.getElementById('picTop-2-2')
    console.log('elems: ', elemsPicTop)
    let PicTopheight = elemsPicTop[0].offsetHeight
    console.log('PicTopheight: ', PicTopheight)

    for (let i = 0; i < 4; i++) {
      elemsPicBottom[i].style.top = `-${elemsPicTop[0].offsetHeight}px`
      // elemsPicBottom[i].style.top = `-${PicTopheight}px`
      elemsPicBottom[i].setAttribute('src', this.state.mainPicAddr)
    }

    // } catch (error) {
    //   console.error('Erreur initBottomPicsPosition: ', error)
    // }
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

  /* eslint-disable */
  async uploadNewPicture (event) {
    // console.log('CALL uploadNewPicture.. ', event.dataTransfer)
    console.log('CALL uploadNewPicture.. ', event)
    console.log('CALL uploadNewPicture.. ', event.target)
    console.log('CALL uploadNewPicture.. ', event.target.value)

    const files = document.getElementById('input-uplPic').files
    const file = files[0]
    const photoCanvas = document.getElementById('photo')
    // console.log('FILES: ', files)
    console.log('Uploaded: ', file)
    // photoCanvas.setAttribute('src', window.URL.createObjectURL(file))

    

    const reader = new FileReader()
    reader.onload = ((e) => {
      // const rawPicData = e.target.result
      // console.log('BLOB: ', e.target.result)
      let dataToSend = {
        rawData: e.target.result,
        token: this.props.userContext.token
      }

      window.fetch(`http://localhost:8880/api/picture/add`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      })
    })
    reader.readAsDataURL(file)

    // await window.fetch('Ma route sur addNewPicture', {
    //   method: 'PUT',
    //   header: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(rawPicData)
    // })

  }



  componentDidMount () {
    this.initBottomPicsPosition()
  }

  render () {
    console.log('ProfilePicManager RENDER: ')
    return (
      <div className='section' id='ProfilePicManagerSection'>
        <div className='columns'>

          <div className='column' id='col1-1'>
            <figure className='image is-256x256'>

              <img className='image' id='picTopMain'
                src={this.state.mainPicAddr}>
              </img>

            </figure>
          </div>
        </div>
          <div className='columns is-mobile'>
            <div className='column' id='col2-1'>

              <figure className='image is-256x256'>

              <img className='image' id='picTop-1-1' 
                onClick={(e) => this.handleTopPicClick(e, 0)}
                src={this.state.otherPicsAddr[0]} >
              </img>

            </figure>
            <figure className='image is-256x256'>

              <img className='image' id='picBottom-1-1' ></img>

            </figure>
            <figure className='image is-256x256'>

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

              <figure className='image is-256x256'>

              <img className='image' id='picTop-2-1' 
              onClick={(e) => this.handleTopPicClick(e, 2)}
              src={this.state.otherPicsAddr[2]} >
            </img>

            </figure>
            <figure className='image is-256x256'>
              <img className='image' id='picBottom-2-1' ></img>

            </figure>
            <figure className='image is-256x256'>

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
            {/* <button
            id='profilePicUpload'
            className='button is-small is-dark is-outlined'
            onClick={this.uploadNewPicture}
          >Upload new pic</button> */}
            <canvas id="photo"></canvas>
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
          </div>
      </div>
    )
  }
}
