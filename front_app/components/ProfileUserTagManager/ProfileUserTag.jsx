/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

// CSS
import './ProfileUserTag.scss'
/* eslint-enable no-unused-vars */

/* eslint-disable */

class ProfileUserTag extends Component {
  state = {
    sportTags: [],
    hobbyTag: [],
    numInterests: -1
  }

  createCheckbox (tags = []) {
    console.log('CALL createCheckbox')
    // console.log('CALL createCheckbox', this)
    let UsrInterest = this.props.userContext.userData.Intersest
    UsrInterest = UsrInterest.split(',')
    console.log('UsrInterest: ', {UsrInterest})
    let checkboxArr = []

    for (let index in tags) {
      checkboxArr.push(
        <div className='control'>
          <div className='tags has-addons'>
            <span
              // className='tag'
              className={
                (UsrInterest.includes(index) ? 'tag is-primary' : 'tag')
              }
              key={`${index}`}
              id='sportTagElem'
              onClick={(e) => this.handleTagClick(e, index)}>
              {`  ${tags[index]}`}
            </span>
            {(UsrInterest.includes(index) ? <span class="tag is-delete"></span> : '')}
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

  async handleTagClick (event, index) {
    console.log('handleClick props ', this.props)
    console.log('handleClick key: ', index)

    const oldIntersest = this.props.userContext.userData.Intersest
    if (oldIntersest.split(',').length > 5) {
      console.log('Trop d\'interets selectionne')
      return (false)
    }
    let newIntersest = ''
    console.log('oldIntersest: ', oldIntersest, 'len:', oldIntersest.length)

    if (oldIntersest.length !== 0) {
      newIntersest = oldIntersest.concat(`${index},`)
    } else {
      newIntersest = `${index},`
    }
    console.log('newIntersest: ', {newIntersest})
    this.props.userContext.setState({
      userData: {
        ...this.props.userContext.userData,
        Intersest: newIntersest
      }
    })
    // this.setNumberOfInterests(newIntersest)


    // TEST de l'envoi 
    let newUserData = this.props.userContext.userData
    newUserData.Intersest = newIntersest
    let dataToSend = {
      uid: this.props.userContext.uid,
      token: this.props.userContext.token,
      userData: { ...newUserData }
    }
    try {
      let response = await window.fetch(`/api/user/profil`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      })

      if (response.ok) {
        console.log('response: ', response)
        let responseData = await response.json()
        console.log('responseData: ', responseData)
        // window.location.reload()
      } else {
        console.log('Server Response Error: ',
          response.status, ' - ', response.statusText)
      }
    } catch (error) {
      console.log('Error fetch request: ', error)
    }
  }

//   /**
//    * @returns: (int) the number of interest in the userData.Interest array
//   **/
//  setNumberOfInterests (interest) {
//   const num = interest.split(',').length - 1
//   this.setState({
//     numInterests: num
//   })
// }

  componentWillMount () {
    this.getAllTags()
  }



  render () {
    console.log('%c ProfileUserTag RENDER: ', 'color: orange;', { ...this.props }, { ...this.state })
    return(
      <div className='container' id='userTargWrapper'>
        <h4 className='title is-4'>TAGS</h4>
        {/* <div className='section' id='userTargWrapper'> */}

          <div className='container'>
          <div className='column'>

            <h5 className='title is-5'
              id='titleSport'
              onClick={(e) => this.handleTitleClick(e)}>
              <i className='fas fa-plus is-tiny is-left' id='sportIconPlus'> SPORT {`${this.props.userContext.userData.Intersest.split(',').length - 1}`}/5 </i>
              <i className='fas fa-minus is-tiny is-left' id='sportIconMinus'> SPORT {`${this.props.userContext.userData.Intersest.split(',').length - 1}`}/5 </i>
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
