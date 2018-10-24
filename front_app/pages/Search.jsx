/* eslint-disable no-unused-vars */
// IMPORT
import React from 'react'
import axios from 'axios'
import MemberModal from '../components/SearchMemberModal/MemberModal.jsx'
import SearchPanel from '../components/SearchPanel/SearchPanel.jsx'

// Dev
import ReactJson from 'react-json-view'

// CSS
import './Search.scss'
/* eslint-enable no-unused-vars */

/* eslint-disable */
export default class Search extends React.Component {
	state = {
		TOJSON: undefined,
		data: { 0: null },
		filter: [false, false, false, false, false]
		
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

	getChildGenderFilter = (childFilter) => {
		console.log('getChildGenderFilter', childFilter)
		this.setState({
			filter: [...childFilter]
		})
	}

	displayEachMember = () => {
		const data = this.state.data
		if (data.result == undefined) {
			return
		}
		var arrMembers = []
		Object.entries(data.result).forEach(([key, obj]) => {
			console.log('DATA => ', 'key: ', key, 'value: ', obj)
			arrMembers.push(
				<div className='card ' key={key} onClick={this.showMemberModal}>
					<figure className='image is-256x256'>
						<img src={`${obj.MainPic}`}></img>
					</figure>

					{/* <div>{`${obj.LastName}`}</div>
					<div>{`${obj.Age}`}</div> */}
					{`${obj.Login}`} - {`${obj.FirstName}`} {`${obj.LastName}`} - {`${obj.Age}`}

				</div>
			)
		})
		return (arrMembers)
	}

	showMemberModal = () => {
		const modal = document.getElementsByClassName('modal')[0]
		if (modal == undefined) {
			console.log('%c Modal not found', 'color: red', modal)
			return
		}

		console.log('%c Modal found', 'color: green', modal)
		modal.className = 'modal is-visible'

	}

	getFilteredData = () => {
		const dataToSend = {
			uid: this.props.userContext.uid,
			token: this.props.userContext.token,
			filter: {
				gender: []
			}
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

					<ReactJson src={this.state.filter} name='' collapsed='1'/>
				{
					this.state.TOJSON != null &&
					<ReactJson src={this.state.TOJSON} name='' collapsed='1'/>
				}

				<SearchPanel 
					setParentFilter={this.getChildGenderFilter}
					parentStateFilter={this.state.filter}
					initData={this.initData}
					getFilteredData={this.getFilteredData}
				></SearchPanel>
					


				<div className='container' id='memberPres'>
					{this.displayEachMember()}

					{/* {
						this.state.data.result != undefined &&
						<ReactJson src={this.state.data.result[2]}></ReactJson>
					} */}

					<MemberModal></MemberModal>

				</div>

			</div>
		)
	}
}
