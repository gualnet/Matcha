// IMPORT
/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'

// Dev
import ReactJson from 'react-json-view'

// CSS
import './Search.scss'
/* eslint-enable no-unused-vars */

/* eslint-disable */
export default class Search extends React.Component {
	state = {
		data: { 0: null }
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
		Object.entries(data.result).forEach(
				([key, obj]) => {
					console.log("DATA => ", "key: ", key, "value: ", obj)
					arrMembers.push(
						<div className='card ' key={key}>
							<figure className='image is-256x256'>
								<img src={`${obj.MainPic}`}></img>
							</figure>

							{/* <div>{`${obj.LastName}`}</div>
							<div>{`${obj.Age}`}</div> */}
							{`${obj.LastName}`}
							{`${obj.Age}`}

						</div>
					)
					
				}	
			)

			return (arrMembers)
	}





	render () {
		return (
			<div className='constainer' id='searchWrapper'>
				<button className='button is=primary' onClick={this.initData}>Get Data..</button>

				{/* {
					this.state.data[0] !== null &&
					<ReactJson src={this.state} name='state.data' collapsed='2'/>
				} */}

				<div className='container' id='memberPres'>
					{this.displayEachMember()}
				</div>

			</div>
		)
	}
}
