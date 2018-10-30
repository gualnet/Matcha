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
      Gender: [false, false, false],//, false, false],
      Distance: 0
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
      // console.log('DATA => ', 'key: ', key, 'value: ', obj)
      arrMembers.push(
        <div className='card ' key={key} onClick={this.showMemberModal}>
          <figure className='image is-256x256' key={key}>
          {
            obj.MainPic === undefined &&
            <img src={`${obj.PicPath}`} key={key}></img>
          }
          {
            // ! pour test (click on get all data btn)
            obj.MainPic !== undefined &&
            <img src={`${obj.MainPic}`} key={key}></img>
          }
          </figure>

          {`${obj.Login}`} - {`${obj.FirstName}`} {`${obj.LastName}`} - {`${obj.Age}`}

        </div>
      )
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

    this.setState({
      memberSelected: this.state.data.result[event._targetInst.key]
    })

    // console.log('%c Modal found', 'color: green', modal)
    modal.className = 'modal is-visible'
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
          data: response.data
        })
      })
      .catch((error) => {
        console.error('%c AXIOS response: ', 'color: red', error)
      })
  }

  render () {
    return (
      <div className='gridWrapper' id='searchWrapper'>

        <ReactJson src={this.props} collapsed='1'/>
        {/* <ReactJson src={this.state.data} collapsed='1'/> */}
        {/* {
          this.state.TOJSON != null &&
          <ReactJson src={this.state.TOJSON} name='' collapsed='1'/>
        } */}

        <SearchPanel
          initData={this.initData}
          parentStateFilters={this.state.filters}
          getFilteredData={this.getFilteredData}
          setParentGender={this.getChildGenderFilter}
          setParentAge={this.getChildAgeFilter}
          setParentDistance={this.getChildDistanceFilter}
          userContext={this.props.userContext}
        ></SearchPanel>

        <div className='container' id='memberPres'>
          {this.displayEachMember()}

          {/* {
            this.state.data.result != undefined &&
            <ReactJson src={this.state.data.result[2]}></ReactJson>
          } */}

          <MemberModal
            userContext={this.props.userContext}
            memberInfo={this.state.memberSelected}
          ></MemberModal>

        </div>

      </div>
    )
  }
}
