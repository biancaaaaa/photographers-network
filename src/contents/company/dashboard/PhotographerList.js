import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {isLoaded, isEmpty, firestoreConnect} from "react-redux-firebase";
import {Photographer} from "./Photographer";

export const PhotographerList = ({photographers, profile}) => {
  if (!isLoaded(photographers))
    return <p className="dashboard-container loading">Loading...</p>;
  if (isEmpty(photographers))
    return <p className="dashboard-container no-data">No photographers</p>;
  const ownLocation = Object.values(profile.locations)[0];
  const photographersNear = photographers.filter(photographer =>
    Object.values(photographer.locations)[0].city === ownLocation.city);
  return (
    <ul>
      {
        photographers.map(photographer =>
          <Photographer key={photographer.id} {...photographer}/>
        )
      }
    </ul>
  );
};

const mapStateToProps = state => ({
  photographers: state.firestore.ordered.photographers,
  profile: state.firebase.profile
});

export default compose(
  firestoreConnect([
    {
      collection: "users",
      where: [["type", "==", "photographer"]],
      storeAs: "photographers"
    }
  ]),
  connect(mapStateToProps)
)(PhotographerList);