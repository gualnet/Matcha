/* eslint-disable no-unused-vars */
// IMPORT
import React from 'react'
import axios from 'axios'
import MemberModal from '../components/SearchMemberModal/MemberModal.jsx'
import SearchPanel from '../components/SearchPanel/SearchPanel.jsx'

// ! Dev
import ReactJson from 'react-json-view'

// CSS
import './Search.scss'
/* eslint-enable no-unused-vars */

/* eslint-disable */
export default class Search extends React.Component {
  state = {
    TOJSON: undefined, // ! pour tests
    data: { 0: null },
    filters: {
      AgeMin: 18,
      AgeMax: 120,
      PopMin: -100,
      PopMax: 100,
      Gender: [false, false, false],//, false, false],
      Orientation: [false, false, false],//, false, false],
      Distance: 500
    },
    memberSelected: undefined
  }

  initData = () => {
    axios({
      method: 'POST',
      url: '/api/search/getAll'
    })
      .then((response) => {
        console.log('%c AXIOS response: ', 'color: green', response)
        this.setState({
          TOJSON: response.data,
          data: response.data
        })
      })
      .catch((error) => {
        console.error('%c AXIOS response: ', 'color: red', error)
      })
  }

  getChildGenderFilter = (childFilter = []) => {
    // console.log('getChildGenderFilter', childFilter)
    if (childFilter.length !== 3) {
      return
    }
    this.setState({
      filters: {
        ...this.state.filters,
        Gender: [...childFilter]
      }
    })
  }

  getChildOrientationFilter = (childFilter = []) => {
    // console.log('getChildOrientationFilter', childFilter)
    if (childFilter.length !== 3) {
      return
    }
    this.setState({
      filters: {
        ...this.state.filters,
        Orientation: [...childFilter]
      }
    })
  }

  getChildAgeFilter = (childAge = []) => {
    // console.log('getChildAgeFilter', childAge)
    if (childAge.length !== 2) {
      return
    }
    this.setState({
      filters: {
        ...this.state.filters,
        AgeMin: childAge[0],
        AgeMax: childAge[1]
      }
    })
  }

  getChildPopularityFilter = (childPopularity = []) => {
    // console.log('getChildPopularityFilter', childPopularity)
    if (childPopularity.length !== 2) {
      return
    }
    this.setState({
      filters: {
        ...this.state.filters,
        PopMin: childPopularity[0],
        PopMax: childPopularity[1]
      }
    })
  }

  getChildDistanceFilter = (distance = 555) => {
    // console.log('getChildDistanceFilter', childAge)
    if (distance === 555) {
      return
    }
    this.setState({
      filters: {
        ...this.state.filters,
        Distance: distance
      }
    })
  }

  displayEachMember = () => {
    const data = this.state.data
    if (data.result === undefined) {
      return
    }
    var arrMembers = []
    Object.entries(data.result).forEach(([key, obj]) => {
      console.log('THIS => ', this)
      console.log('DATA => ', 'key: ', key, 'value: ', obj)
      const critAge = (obj.Age < this.state.filters.AgeMax 
        && obj.Age > this.state.filters.AgeMin) ? true : false
      const critPop = (obj.Popularity < this.state.filters.PopMax 
        && obj.Popularity > this.state.filters.PopMin) ? true: false
      const critDist = (obj.Distance < this.state.filters.Distance) ? true : false

      if (critAge &&  critPop && critDist) {
        arrMembers.push(
          <div className='card ' key={key} onClick={this.showMemberModal}>
            <figure className='image is-256x256' key={key}>
            {
              obj.MainPic === undefined &&
              <img src={`${obj.PicPath}`} key={key}></img>
            }
            </figure>
  
            <div id='dispDist'><img className='image is-16x16' src='/assets/icons/geoloc.svg' />{`${obj.Distance}km`} - {`${obj.Login}`} - {`${obj.Age}`} </div>
  
          </div>
        )
      }
    })
    return (arrMembers)
  }

  showMemberModal = (event) => {
    // event.persist()
    // console.log('showMemberModal: ', event)
    // console.log('showMemberModal: ', event._targetInst.key)
    const modal = document.getElementsByClassName('modal')[0]
    if (modal === undefined) {
      // console.log('%c Modal not found', 'color: red', modal)
      return
    }

    this.collectTargetPictures(this.state.data.result[event._targetInst.key], event._targetInst.key)
    // console.log('%c Modal found', 'color: green', modal)
    modal.className = 'modal is-visible'
  }

  collectTargetPictures = (targetData, targetId = -1) => {
    // console.log('collectTargetPictures')
    if (targetId === -1) {
      return
    }

    const dataToSend = {
      uid: this.props.userContext.uid,
      token: this.props.userContext.token
    }
    axios({
      method: 'POST',
      url: `/api/picture/${this.state.data.result[targetId].UserId}`,
      data: dataToSend
    })
      .then((response) => {
        console.log('%c AXIOS response: ', 'color: green', response.data.result)

        this.setState({
          memberSelected: {
            ...targetData,
            pictures: response.data.result.picsAddr
          }
        })
      })
      .catch((error) => {
        console.error('%c AXIOS response: ', 'color: red', error)
      })
  }

  getFilteredData = () => {
    const dataToSend = {
      uid: this.props.userContext.uid,
      token: this.props.userContext.token,
      filters: this.state.filters
    }
    console.log('%c getFilteredData: ', 'color: cyan;', dataToSend)
    axios({
      method: 'POST',
      url: '/api/search/getFiltered',
      data: dataToSend
    })
      .then((response) => {
        console.log('%c AXIOS response: ', 'color: green', response.data)

        this.setState({
          TOJSON: response.data,
          dataFromSrv: response.data, // data received from server
          data: response.data // data filtered on user side
        })
      })
      .catch((error) => {
        console.error('%c AXIOS response: ', 'color: red', error)
      })
  }

  render () {
    return (
      <div className='gridWrapper' id='searchWrapper'>

        <div id='tests'>
        <ReactJson src={this.props} name='props' collapsed='1'/>
        <ReactJson src={this.state} name='state' collapsed='1'/>
        {/* <ReactJson src={this.state.data} collapsed='1'/> */}
        {/* {
          this.state.TOJSON != null &&
          <ReactJson src={this.state.TOJSON} name='' collapsed='1'/>
        } */}
        </div>

        <SearchPanel
          initData={this.initData}
          parentStateFilters={this.state.filters}
          getFilteredData={this.getFilteredData}
          setParentGender={this.getChildGenderFilter}
          setParentOrientation={this.getChildOrientationFilter}
          setParentAge={this.getChildAgeFilter}
          setParentPopularity={this.getChildPopularityFilter}
          setParentDistance={this.getChildDistanceFilter}
          userContext={this.props.userContext}
          pic2={this.getPictures}
        ></SearchPanel>

        <div className='container' id='memberPres'>
          {this.displayEachMember()}

          <MemberModal
            userContext={this.props.userContext}
            memberInfo={this.state.memberSelected}
          ></MemberModal>

        </div>
      </div>
    )
  }
}
