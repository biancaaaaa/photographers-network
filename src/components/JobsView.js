import React from 'react';
import PropTypes from 'prop-types';
import {JobsList} from './JobsList';
import {Filters} from '../contents/shared/jobs/JobsFilters';

export const JobsView = ({ jobsList, searchValue, changeHandler, locations, types, checkboxChangeHandler }) => (
	<div className='job-page-inner'>
	<div className='job-filter-options'>
		<input
			type='text'
			value={searchValue}
			onChange={changeHandler}
			name='searchValue'
			placeholder='Search for a job..'
		/>
		{
		(types || locations) &&
		<Filters filters={[{types : types},{locations : locations}]} checkboxChangeHandler = {checkboxChangeHandler}/>
		}
	</div>
		{
			jobsList.length > 0 ? (
				<React.Fragment>
					<JobsList jobsList={jobsList} />
				</React.Fragment>
			) : (
					<h2>No jobs found.</h2>
				)
		}
	</div>
);


JobsView.propTypes = {
 jobsList : PropTypes.arrayOf(PropTypes.object).isRequired,
 searchValue : PropTypes.string,
 changeHandler : PropTypes.func.isRequired,
 locations : PropTypes.arrayOf(PropTypes.string),
 types : PropTypes.arrayOf(PropTypes.string),
 checkboxChangeHandler : PropTypes.func.isRequired,
}