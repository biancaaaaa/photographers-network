import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { isLoaded, isEmpty, firestoreConnect } from "react-redux-firebase";

import { PhotographersList } from "../../../components/PhotographersList";
import { SearchInput } from "../../../components/form/SearchInput";

class SearchPhotographers extends Component {
  state = {
    searchedValue: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  search = e => {
    e.preventDefault();
  };

  render() {
    let { photographers } = this.props;
    const { searchedValue } = this.state;

    if (!isLoaded(photographers)) {
      return <h2>Loading.... Photographers data!</h2>;
    }

    if (isEmpty(photographers)) {
      return <h2>No photographers could be found!</h2>;
    }

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
          <PhotographersList list={photographers} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  photographers: state.firestore.ordered.photographers
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
