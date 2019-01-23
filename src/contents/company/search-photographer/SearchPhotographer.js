import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { isLoaded, isEmpty, firestoreConnect } from "react-redux-firebase";

import { PhotographersList } from "../../../components/PhotographersList";
import { SearchInput } from "../../../components/form/SearchInput";
import {FilterContainer} from "./FilterContainer";

class SearchPhotographers extends Component {
  state = {
    searchedValue: "",
    showSortItems: false,
    filters: [
      {
        name: 'nearest location',
        value: 'location',
        active: false
      },
      {
        name: 'landscape photographer',
        value: 'landscape',
        active: false
      },
      {
        name: 'portrait photographer',
        value: 'portrait',
        active: false
      }
    ]
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  search = e => {
    e.preventDefault();
  };

  /**
   * Toggles the container with available filters.
   */
  toggleSortContainer = () => {
    this.setState(prevState => ({
      showSortItems: !prevState.showSortItems
    }));
  };

  /**
   * Toggles filter active or inactive.
   *
   * @param id
   */
  toggleFilter = id => {
    let filters = [...this.state.filters];
    const index = filters.findIndex(filter => filter.value === id);
    console.log(index);
    filters[index].active = !filters[index].active;
    this.setState({filters, showSortItems: false});
  };

  /**
   * Applies filters to the photographers.
   *
   * @param photographers
   * @param activeFilters
   * @returns {*}
   */
  applyFilters(photographers, activeFilters) {
    if (activeFilters.length < 1) return photographers;
    const {profile} = this.props;
    const location = Object.values(profile.locations)[0];
    let filteredPhotographers = [];
    for (let i = 0; i < activeFilters.length; i++) {
      if (activeFilters[i].value === 'location') {
        const locationPgs = photographers.filter(pg => {
          const city = Object.values(pg.locations)[0].city;
          return city === location.city;
        });
        filteredPhotographers = [...filteredPhotographers, ...locationPgs];
      } else {
        filteredPhotographers = [...filteredPhotographers, ...photographers.filter(pg => pg.photographerType && pg.photographerType.toLowerCase() === activeFilters[i].value)];
      }
    }
    return [...new Set(filteredPhotographers)];
  }

  render() {
    let { photographers } = this.props;
    const { searchedValue, showSortItems, filters } = this.state;

    if (!isLoaded(photographers)) {
      return <h2>Loading.... Photographers data!</h2>;
    }

    if (isEmpty(photographers)) {
      return <h2>No photographers could be found!</h2>;
    }

    // get the active filters
    const activeFilters = filters.filter(filter => filter.active);
    // apply active filters to photographers array
    photographers = this.applyFilters(photographers, activeFilters);

    // look, if there is a search value
    if (searchedValue) {
      photographers = photographers.filter(el => {
        const regExp = new RegExp(`^${searchedValue}`, "i");
        return regExp.test(Object.values(el.locations)[0].city) ||
          regExp.test(el.firstName) ||
          regExp.test(el.lastName);
      });
    }

    return (
      <React.Fragment>
        <div className="red-bg">
          <div className="black-bg-header">
            <SearchInput
              name="searchedValue"
              value={this.state.searchedValue}
              placeholder="Search photographer"
              changeHandler={this.handleChange}
              searchHandler={this.search}
            />
          </div>
          <FilterContainer filters={filters}
                           activeFilters={activeFilters}
                           toggleFilterHandler={this.toggleFilter}
                           toggleSortContainer={this.toggleSortContainer}
                           showSortItems={showSortItems}
          />
          <PhotographersList list={photographers} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  photographers: state.firestore.ordered.photographers,
  profile: state.firebase.profile
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "users",
      where: [["type", "==", "photographer"]],
      storeAs: "photographers"
    }
  ])
)(SearchPhotographers);
