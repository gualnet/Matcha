/* eslint-disable no-unused-vars */
// IMPORT
import React from 'react'
import Axios from 'axios'
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
    sortedList: undefined,
    filters: {
      AgeMin: 18,
      AgeMax: 120,
      PopMin: -100,
      PopMax: 100,
      Gender: [false, false, false], //, false, false],
      Orientation: [false, false, false], //, false, false],
      Distance: 500,
      Tags: []
    },
    memberSelected: undefined,
    tagList: []
  }

  componentWillMount () {
    Axios({
      method: 'GET',
      url: `/api/tags/${this.props.userContext.uid}/${this.props.userContext.token}`
    })
      .then((response) => {
        console.log('%c response ok: ', 'color: green', response)
        if (response.data.success) {
          // console.log('---> ', response.data.result)
          this.setState({
            tagList: response.data.result
          })
        } else {
          console.error('%c Get tag list from server returned: ', 'color: red', response.data.msg, response.data)
        }
      })
      .catch((error) => {
        console.error('%c error getting the tag list from server: ', 'color: red', error)
      })
  }

  initData = () => {
    Axios({
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

  getChildTagsFilter = (childTags = undefined) => {
    // console.log('getChildTagsFilter', childTags)
    if (childTags.length === undefined) {
      return
    }

    const tagRef = this.state.tagList
    let arrNbr = []
    Object.entries(tagRef).forEach((elem, key) => {
      if (childTags.includes(elem[1].Name)) {
        arrNbr.push(Number(elem[1].TagsId))
      }
    })

    this.setState({
      filters: {
        ...this.state.filters,
        Tags: arrNbr
      }
    })
  }

  displayEachMember = (data = {}) => {
    // console.log('displayEachMember', data)
    if (data === undefined) {
      return
    }
    var arrMembers = []
    // console.log('THIS => ', this)
    Object.entries(data).forEach(([key, obj]) => {
      // console.log('DATA => ', 'key: ', key, 'value: ', obj)
      const critAge = (obj.Age < this.state.filters.AgeMax && obj.Age > this.state.filters.AgeMin) ? true : false
      const critPop = (obj.Popularity < this.state.filters.PopMax && obj.Popularity > this.state.filters.PopMin) ? true: false
      // const critDist = (obj.Distance < this.state.filters.Distance) ? true : false
      const critDist = true // ! TEST
      // console.log(`critAge[${critAge}] && critPop[${critPop}] && critDist[${critDist}]`)
      if (critAge && critPop && critDist) {
        // console.log('displayEachMember crit ok for ', key)
        arrMembers.push(
          <div className='card ' key={key} onClick={this.showMemberModal}>
            <figure className='image is-256x256' key={key}>
              {
                obj.MainPic === undefined &&
                <img src={`${obj.PicPath}`} key={key}></img>
              }
            </figure>

            {/* <div id='dispDist'>{`${obj.Login}`} - {`${obj.Age}`} </div> */}

            {/* <div id='dispDist'><img className='image is-16x16' src='/assets/icons/geoloc.svg' />{`${obj.Distance}km`} - {`${obj.Login}`} - {`${obj.Age}`} </div> */}
          </div>
        )
      } else {
        // console.log('displayEachMember crit NOK for ', key)
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
    Axios({
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
    Axios({
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

  filterByTagsMatch = () => {
    // console.log(this.state.data.result)
    /* eslint-disable-next-line */
    if (this.state.data.result == undefined) {
      return
    }
    const data = this.state.data
    Object.entries(data.result).forEach(([key, obj]) => {

      var strInterest = obj.Interest
      if (obj.Interest.endsWith(',')) {
        strInterest = obj.Interest.slice(0, obj.Interest.length - 1)
      }

      // convertion de la string en array
      // recherche des occurences
      const arrInterest = strInterest.split(',').map((str) => Number(str))
      let count = 1
      arrInterest.forEach((elem) => {
        if (this.state.filters.Tags.includes(elem)) {
          count++
        }
      })
      obj.tagMatchCount = count
    })
    this.sortByNumberTagMatching()
  }

  sortByNumberTagMatching = () => {
    // console.log('sortByNumberTagMatching...')
    let data = this.state.data.result
    var arrData = []
    Object.entries(data).forEach((elem) => {
      if (elem[1].tagMatchCount > 0) {
        arrData.push(elem)
      }
    })

    arrData.sort((a, b) => {
      return (b[1].tagMatchCount - a[1].tagMatchCount)
    })

    let sortedDataObject = {}
    arrData.forEach((elem, id) => {
      sortedDataObject[id] = elem[1]
    })
    this.setState({
      sortedList: sortedDataObject
    })
  }

  componentDidUpdate (prevProps, prevState) {
    // console.log('prevState', prevState.filters.Tags, prevState.sortedList)
    // console.log('thisState', this.state.filters.Tags, this.state.sortedList)
    if (prevState.filters.Tags.length !== this.state.filters.Tags.length) {
      // console.log('display with sortedList')
      this.filterByTagsMatch()
    } else if (prevState.filters.Tags.length === 0 &&
    this.state.filters.Tags.length === 0 &&
    this.state.sortedList !== undefined) {
      this.setState({
        sortedList: undefined
      })
    } else {
    }
  }

  componentDidMount () {
    this.initData()
  }

  render () {
    return (
      <div className='gridWrapper' id='searchWrapper'>

        <div id='tests'>
          <ReactJson src={this.props.userContext.userData} name='state' collapsed='1'/>
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
          setParentTags={this.getChildTagsFilter}
          userContext={this.props.userContext}
          pic2={this.getPictures}
          TagList={this.state.tagList}
        ></SearchPanel>

        <div className='container' id='memberPres'>
          {/* <button className='button is-link' onClick={this.filterByTagsMatch}>filter by tags</button> */}

          {
            this.state.sortedList === undefined &&
            this.displayEachMember(this.state.data.result)
            // console.log('DISPLAY CAS 1')
          }
          {
            this.state.sortedList !== undefined &&
            this.displayEachMember(this.state.sortedList)
            // console.log('DISPLAY CAS 2')
          }

          <MemberModal
            userContext={this.props.userContext}
            memberInfo={this.state.memberSelected}
            tagList={this.state.tagList}
          ></MemberModal>
        </div>
      </div>
    )
  }
}
