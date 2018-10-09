import React from 'react';
import fire from '../config/Fire';
import queryString from 'query-string';
import { JobsView } from '../components/JobsView';
import LoadingPage from '../components/LoadingPage';
import {NavFooterWrapper} from '../containers/NavFooterWrapper';

class Jobs extends React.Component {
	state = {
		loading: true,
		jobs: [],
		searchValue: '',
		locationsFilter: [],
		typesFilter: [],
	}
 
	componentDidMount() {
		const searchQuerry = queryString.parse(this.props.location.search);
		const requests = fire.database().ref('requests');

		if (Object.keys(searchQuerry).length != 0) {
			requests
				.orderByChild(Object.keys(searchQuerry)[0])
				.equalTo(Object.values(searchQuerry)[0])
				.once('value', (snap) => {
					this.setState({
						jobs: Object.values(snap.val() || {}),
						loading: false
					})
				})
		} else {
			requests.once('value', (snap) => {
				let response = Object.values(snap.val());
				let locations = [];
				let types = [];

				response.forEach(el => {
					if (locations.indexOf(el.location) < 0) locations.push(el.location);
					if (types.indexOf(el.type) < 0) types.push(el.type);
				})

				this.setState({
					locations: locations,
					types: types,
					jobs: Object.values(snap.val() || {}),
					loading: false,
				})

			})
		}
	}

	inputChangeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	checkboxChangeHandler = (e) => {
		const el = e.target;
		const boxFor = el.dataset.for;
		const val = el.dataset.value;
		if (el.checked) {
			this.setState((prevState) => ({
				[boxFor]: [...prevState[boxFor], val]
			}))
		} else {
			const valIdx = this.state[boxFor].indexOf(val);
			this.setState((prevState) => ({
				[boxFor]: [...prevState[boxFor].slice(0, valIdx), ...prevState[boxFor].slice(valIdx + 1)]
			}))
		}
	}

	filterJobs(jobsArr, searchValue, locationsFilter = false, typesFilter = false) {
		return jobsArr.filter((el) => {
			if (searchValue && el.title.toLowerCase().indexOf(searchValue.toLowerCase()) < 0) return false;
			if (locationsFilter && !locationsFilter.includes(el.location)) return false;
			if (typesFilter && !typesFilter.includes(el.type)) return false;
			return true;
		})
	}

	render() {
		let { loading, jobs: jobsList, searchValue, locations, types, locationsFilter, typesFilter } = this.state;


		jobsList = this.filterJobs(jobsList, searchValue, locationsFilter.length > 0 && locationsFilter, typesFilter.length > 0 && typesFilter)


		return (
			<div className='jobs-page'>
				<div className='header'>
					<div className='overlay'/>
					<h2>Jobs</h2>
				</div>
				{
					loading ? (
						<LoadingPage />
					) : (
							<JobsView
								jobsList={jobsList}
								searchValue={searchValue}
								changeHandler={this.inputChangeHandler}
								locations={locations}
								types={types}
								checkboxChangeHandler={this.checkboxChangeHandler}
							/>
						)
				}
			</div>
		)
	}
}

export const JobsWithFooter = NavFooterWrapper(Jobs);