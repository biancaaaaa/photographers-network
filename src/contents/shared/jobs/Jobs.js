import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { fetchJobs } from "../../../redux/actions/jobs-action";

import { JobsView } from "../../../components/JobsView";
import LoadingPage from "../../../components/LoadingPage";

import { firestoreConnect } from "react-redux-firebase";

const Jobs = ({ jobOfferts }) => {
  const content = !isLoaded(jobOfferts) ? (
    "Loading"
  ) : isEmpty(jobOfferts) ? (
    "Todo list is empty"
  ) : (
    <h2>Hello</h2>
  );

  return (
    <div className="z" style={{ marginTop: 200 }}>
      <Link to="/random-page">Random page</Link>
      <h2>{content}</h2>
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    jobOfferts: state.firestore.data.jobOfferts
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "jobOfferts"
    }
  ])
)(Jobs);

/*

import React from "react";
import { connect } from "react-redux";
import { fetchJobs } from "../../../redux/actions/jobs-action";

import { JobsView } from "../../../components/JobsView";
import LoadingPage from "../../../components/LoadingPage";

class Jobs extends React.Component {
  state = {
    searchValue: "",
    locationsFilter: [],
    typesFilter: []
  };

  /
   * When the component mounts, check to see if there are some parameters to filter in the link
   * if there are , fetch from the DB just that data, if not fetch all the jobs data
   * Populate types/locations with data from our jobs, to make the filter panel later
   * /
  componentDidMount() {
   this.props.fetchJobs();
 }

 inputChangeHandler = e => {
   this.setState({
     [e.target.name]: e.target.value
   });
 };

 /**
  * When a checkbox is clicked depending if it is true or not ,
  * it either take the value out of the speicifc array or adds it, in the state.
  * /
 checkboxChangeHandler = e => {
   const el = e.target;
   const boxFor = el.dataset.for;
   const val = el.dataset.value;
   if (el.checked) {
     this.setState(prevState => ({
       [boxFor]: [...prevState[boxFor], val]
     }));
   } else {
     const valIdx = this.state[boxFor].indexOf(val);
     this.setState(prevState => ({
       [boxFor]: [
         ...prevState[boxFor].slice(0, valIdx),
         ...prevState[boxFor].slice(valIdx + 1)
       ]
     }));
   }
 };

 filterJobs(
   jobsArr,
   searchValue,
   locationsFilter = false,
   typesFilter = false
 ) {
   return jobsArr.filter(el => {
     if (
       searchValue &&
       el.title.toLowerCase().indexOf(searchValue.toLowerCase()) < 0
     )
       return false;
     if (locationsFilter && !locationsFilter.includes(el.location))
       return false;
     if (typesFilter && !typesFilter.includes(el.type)) return false;
     return true;
   });
 }

 render() {
   let { searchValue, locationsFilter, typesFilter } = this.state;

   const { jobsLoading, error, jobsData, locations, types } = this.props;

   let jobsList = this.filterJobs(
     [...jobsData],
     searchValue,
     locationsFilter.length > 0 && locationsFilter,
     typesFilter.length > 0 && typesFilter
   );

   return (
     <div className="jobs-page">
       <div className="header">
         <div className="overlay" />
         <h2>Jobs</h2>
       </div>
       {jobsLoading ? (
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
       )}
     </div>
   );
 }
}

const mapStateToProps = state => {
 const j = state.allJobs;
 return {
   jobsLoading: j.jobsLoading,
   error: j.error,
   jobsData: Object.values(j.jobsData || {}).filter(
     job => job.status === "open" && !job.private
   ),
   locations: j.availableJobLocations,
   types: j.availableJobTypes
 };
};

const mapDispatchToProps = dispatch => ({
 fetchJobs: () => dispatch(fetchJobs())
});

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(Jobs);
*/
