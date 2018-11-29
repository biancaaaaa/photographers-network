import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { isLoaded, isEmpty, firestoreConnect } from "react-redux-firebase";

import { JobsView } from "../../../components/JobsView";
import LoadingPage from "../../../components/LoadingPage";

class Jobs extends React.Component {
  state = {
    searchValue: "",
    locationsFilter: [],
    typesFilter: []
  };

  /* *
   * Update searchValue
   * */
  updateSearchValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /* *
   * Checkbox change handler, if checkbox is checked push it to the array
   * if not take it out of the array
   * */
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

  /* *
   * Filter the openJobs accordingly to what the user have checked,
   * typed in the search input.
   * */
  filterJobs = (
    jobsArr,
    searchValue,
    locationsFilter = false,
    typesFilter = false
  ) => {
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
  };

  render() {
    let { openJobs, locations, types } = this.props;
    openJobs = openJobs.filter(el => el.status === "open");
    const { searchValue, typesFilter, locationsFilter } = this.state;

    if (!isLoaded(openJobs)) {
      return <LoadingPage />;
    }

    if (isEmpty(openJobs)) {
      return <h2> No open jobs </h2>;
    }

    // Filter the openJobs using our method filterJobs , accordingly to what the user has selected/typed
    openJobs = this.filterJobs(
      [...openJobs],
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
        <JobsView
          jobsList={openJobs}
          searchValue={searchValue}
          changeHandler={this.updateSearchValue}
          locations={locations}
          types={types}
          checkboxChangeHandler={this.checkboxChangeHandler}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const openJobs = state.firestore.ordered.jobOffers || [];

  let types = [];
  let locations = [];

  /* If there are some jobs create a list with locations and requestedSkills so then we populate the
  filter list with them */
  if (openJobs.length > 0) {
    openJobs.forEach(el => {
      const [type, location] = [el.requestedSkill, el.location.city];
      if (types.indexOf(type) < 0) {
        types.push(type);
      }
      if (locations.indexOf(location) < 0) {
        locations.push(location);
      }
    });
  }

  return {
    openJobs: openJobs,
    types,
    locations
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "jobOffers",
      where: ["status", "==", "open"]
    }
  ])
)(Jobs);
