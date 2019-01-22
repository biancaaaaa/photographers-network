import React from "react";
import { connect } from "react-redux";

import { ProfileEditView } from "./ProfileEditView";
import { updateUserInfo } from "../../../redux/actions/profile-action";
import { actionReset } from "../../../redux/actions/generalLoadingErrorSucces-actions";

class ProfileEdit extends React.Component {
  state = {
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    locationPlaceholder: this.props.locationString,
    detailedAddress: null,
    companyName: this.props.companyName
  };

  /**
   * Updates state to the current value of a certain target.
   * @param e
   */
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * Updates user.
   * @param e
   */
  updateUser = e => {
    e.preventDefault();
    let { firstName, lastName, detailedAddress, companyName } = this.state;
    const {
      type,
      updateUserData,
      history,
      homeAddressId,
      allLocations
    } = this.props;

    updateUserData(
      firstName,
      lastName,
      detailedAddress,
      companyName,
      type,
      homeAddressId,
      allLocations
    ).then(() => history.push("/dashboard"));
  };

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     firstName: nextProps.firstName,
  //     lastName: nextProps.lastName,
  //     companyName: nextProps.companyName,
  //     photoURL: nextProps.photoURL,
  //     location: nextProps.location
  //   });
  // }

  componentWillUnmount() {
    this.props.actionReset();
  }

  render() {
    const { type, uid, photoURL } = this.props;
    return (
      <ProfileEditView
        updateUserHandler={this.updateUser}
        changeHandler={this.handleChange}
        type={type}
        uid={uid}
        photoURL={photoURL}
        {...this.state}
      />
    );
  }
}

const mapStateToProps = state => {
  const userData = state.firebase.profile;
  // get the home location
  const allLocations = userData.locations;
  let locationString = "";
  let homeAddressId = "";
  for (let key in allLocations) {
    // when found, break the loop
    const thisAdress = allLocations[key];
    if (thisAdress.home) {
      locationString = `${thisAdress.streetName} ${
        thisAdress.streetNumber ? thisAdress.streetNumber : ""
      }, ${thisAdress.city}, ${thisAdress.country}`;
      homeAddressId = key;
      break;
    }
  }

  return {
    allLocations: allLocations,
    firstName: userData.firstName,
    lastName: userData.lastName,
    location: userData.location,
    homeAddressId: homeAddressId,
    locationString: locationString,
    photoURL: userData.profileImageUrl,
    type: userData.type,
    companyName: userData.companyName,
    uid: state.firebase.auth.uid
  };
};

const mapDispatchToProps = dispatch => ({
  updateUserData: (
    firstName,
    lastName,
    detailedAddress,
    companyName,
    type,
    homeAddressId,
    allLocations
  ) =>
    dispatch(
      updateUserInfo(
        firstName,
        lastName,
        detailedAddress,
        companyName,
        type,
        homeAddressId,
        allLocations
      )
    ),
  actionReset: () => dispatch(actionReset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEdit);
