// IMPORT
/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import MemberModal from '../components/memberModal/MemberModal.jsx'

// Dev
import ReactJson from 'react-json-view'

// CSS
import './Search.scss'
/* eslint-enable no-unused-vars */

/* eslint-disable */
export default class Search extends React.Component {
	state = {
		data: { 0: null },
		searchParam: {
			Age: 18,
			Distance: 30,

		}
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

	render () {
		return (
			<div className='gridWrapper' id='searchWrapper'>

				{/* {
					this.state.data[0] !== null &&
					<ReactJson src={this.state} name='state.data' collapsed='2'/>
				} */}

					{/* Filtres
					Age (min max)
					Distance (max)
					Gender / interest
					Tags */}
					<aside className='menu' id='paramPanel'>
						<p className='menu-label'>MENU</p>
						<ul className='menu-list'>
							<li><a>Age : {this.state.searchParam.Age}</a></li>
							<input className='slider has-output'
							step='1' min='18' max='120'
							defaultValue='0' type='range'
							onChange={this.setWeight}>
							</input>

							<li><a>Distance : {this.state.searchParam.Distance}</a></li>
							{`>option indiferent<`}
							<input className='slider has-output'
							step='10' min='10' max='1000'
							defaultValue='0' type='range'
							onChange={this.setWeight}>
							</input>

							<li><a>Gender</a>
								<ul>
									<li><a>Gender01</a></li>
									<li><a>Gender02</a></li>
									<li><a>Gender03</a></li>
								</ul>
							</li>

							<li><a className=''>Tags</a>
								<ul>
									<li><a>?? Tag01 ??</a></li>
									<li><a>?? Tag02 ??</a></li>
									<li><a>?? Tag03 ??</a></li>
								</ul>
							</li>
						</ul>
						<button className='button is-link' onClick={this.initData}>Get Data..</button>
					</aside>


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
