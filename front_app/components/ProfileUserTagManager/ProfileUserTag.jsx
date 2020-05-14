/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

// CSS
import './ProfileUserTag.scss'
/* eslint-enable no-unused-vars */

class ProfileUserTag extends Component {
  state = {
    sportTags: [],
    hobbyTag: [],
    numInterests: -1
  }

  /**
   * Construct tags label
   * @param tags
   * @returns Array contains the jsx code of all the tags
   */
  createCheckbox (tags = []) {
    console.log('CALL createCheckbox')

    const UsrInterest = this.props.userContext.userData.Interest.split(',')
    let checkboxArr = []

    for (let index in tags) {
      checkboxArr.push(
        <div className='control' key={`${index}`}>
          <div className='tags has-addons' key={`${index}`}>

            <span
              className={(UsrInterest.includes(index) ? 'tag is-primary' : 'tag')}
              key={`${index}`}
              id='sportTagElem'
              onClick={(e) => this.handleTagClick(e, index)}>
              {` ${tags[index]}`}
            </span>

            {
              (UsrInterest.includes(index)
                ? <span className="tag is-delete" onClick={(e) => this.unselectTag(e, index)}></span> : '')
            }
          </div>
        </div>
      )
    }
    return (checkboxArr)
  }

  async getAllTags () {
    const fetchRep = await window.fetch(`/api/tags/${this.props.userContext.uid}/${this.props.userContext.token}`)
    if (fetchRep.ok) {
      var fetchedData = await fetchRep.json()
      // console.log('getAllTags fetch rep: ', fetchedData)
    }

    var sportArr = []
    var hobbyArr = []
    for (let key in fetchedData.result) {
      let subObj = fetchedData.result[key]

      if (subObj.Category === 'sport') {
        sportArr.push(subObj.Name)
      }
      if (subObj.Category === 'hobby') {
        hobbyArr.push(subObj.Name)
      }
    }
    // console.log('sportArr: ', sportArr)
    this.setState({
      sportTags: sportArr,
      hobbyTag: hobbyArr
    })
  }

  async unselectTag (event, index) {
    index = Number(index)
    console.log('%c Unselect tag ', 'color: red', { event, index })
    const oldInterest = this.props.userContext.userData.Interest
    console.log('oldInterest: ', { oldInterest })

    // const newInterest = Array(oldInterest).splice(1, (oldInterest.indexOf(index)))
    let newInterest = []
    oldInterest.split(',').map((val, id) => { newInterest[id] = Number(val) })
    // console.log('newInterest: ', {newInterest}, newInterest.indexOf(index))
    newInterest.splice(newInterest.indexOf(index), 1)
    newInterest = String(newInterest)
    console.log('newInterest: ', { newInterest })
    this.props.userContext.setState({
      userData: {
        ...this.props.userContext.userData,
        Interest: newInterest
      }
    })

    let newUserData = this.props.userContext.userData
    newUserData.Interest = newInterest
    let dataToSend = {
      uid: this.props.userContext.uid,
      token: this.props.userContext.token,
      userData: { ...newUserData }
    }
    await this.sendData(dataToSend)
  }

  async handleTagClick (event, index) {
    console.log('handleClick props ', this.props)
    console.log('handleClick key: ', index)

    const oldInterest = this.props.userContext.userData.Interest
    if (oldInterest.split(',').length >= 5) {
      console.log('Trop d\'interets selectionne')
      return (false)
    }
    let newInterest = ''
    console.log('oldInterest: ', oldInterest, 'len:', oldInterest.length)

    if (oldInterest.length !== 0) {
      newInterest = oldInterest.concat(`,${index}`)
    } else {
      newInterest = `${index}`
    }
    console.log('newInterest: ', { newInterest })
    this.props.userContext.setState({
      userData: {
        ...this.props.userContext.userData,
        Interest: newInterest
      }
    })

    let newUserData = this.props.userContext.userData
    newUserData.Interest = newInterest
    let dataToSend = {
      uid: this.props.userContext.uid,
      token: this.props.userContext.token,
      userData: { ...newUserData }
    }

    await this.sendData(dataToSend)
  }

  /**
   * @returns: (int) the number of interest in the userData.Interest array
  **/
  getNumberOfInterests () {
    const interest = this.props.userContext.userData.Interest
    // console.log('interest-->', interest)
    if (interest === '' || interest === undefined) {
      // console.log('Num to 0..')
      return (0)
    } else {
      const splitted = interest.split(',')
      // console.log('splitted', splitted)
      return (splitted.length)
    }
  }

  async sendData (dataToSend) {
    try {
      let response = await window.fetch(`/api/user/profil`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      })

      if (response.ok) {
        // console.log('response: ', response)
        let responseData = await response.json()
        console.log('responseData: ', responseData)
      } else {
        console.log('Server Response Error: ',
          response.status, ' - ', response.statusText)
      }
    } catch (error) {
      console.log('Error fetch request: ', error)
    }
  }

  componentWillMount () {
    this.getAllTags()
  }

  render () {
    console.log('%c ProfileUserTag RENDER: ', 'color: orange;', { ...this.props }, { ...this.state })
    return (
      <div className='container' id='userTargWrapper'>
        <h4 className='title is-4'>TAGS</h4>
        {/* <div className='section' id='userTargWrapper'> */}

        <div className='container'>
          <div className='column'>

            <h5 className='title is-5'
              id='titleSport'
              onClick={(e) => this.handleTitleClick(e)}>
              <i className='fas fa-plus is-tiny is-left' id='sportIconPlus'> SPORT {this.getNumberOfInterests()}/5 </i>
              <i className='fas fa-minus is-tiny is-left' id='sportIconMinus'> SPORT {this.getNumberOfInterests()}/5 </i>
            </h5>
          </div>
          <div className='tags' id='sportTags'>
            {this.createCheckbox(this.state.sportTags)}
          </div>
        </div>

      </div>
    )
  }

  handleTitleClick (event) {
    console.log('handleTitleClick:', event.target)
    // console.log('handleTitleClick:', event.target)
    // console.log('handleTitleClick:', event.target.parentNode.parentNode)

    const sportTagsElem = document.getElementById('sportTags')
    const sportIconPlus = document.getElementById('sportIconPlus')
    const sportIconMinus = document.getElementById('sportIconMinus')

    // console.log('elem.style.height:', elem.style.height)
    if (sportTagsElem.style.height === '0vh' || !sportTagsElem.style.height) {
      sportTagsElem.style.height = '50vh'

      sportIconPlus.style.opacity = '0'
      sportIconMinus.style.opacity = '100'

      // sportIconPlus.style.display = 'none'
      // sportIconMinus.style.display = 'initial'
    } else if (sportTagsElem.style.height === '50vh') {
      sportTagsElem.style.height = '0vh'

      sportIconPlus.style.opacity = '100'
      sportIconMinus.style.opacity = '0'

      // sportIconPlus.style.display = 'initial'
      // sportIconMinus.style.display = 'none'
    }
  }
}

export default ProfileUserTag
