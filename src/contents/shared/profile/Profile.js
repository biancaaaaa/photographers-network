// dependencies
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

// components
import { ProfileCard } from "../../../components/ProfileCard";
import { ProfileContent } from "./ProfileContent";

export const Profile = ({
  match,
  profileData,
  currentUserData,
  currentUserId,
  finishedJobs,
  reviews
}) => {
  const profileId = match.params.uid;
  if (!isLoaded(profileData) || !isLoaded(reviews)) {
    return <h2 className="loading">Loading..</h2>;
  } else if (profileData && !isLoaded(profileData[profileId])) {
    return <h2 className="loading person-data-not-loaded">Loading...</h2>;
  }

  if (isEmpty(profileData[profileId])) {
    return <h2 className="no-data">No data for this id.</h2>;
  }

  const otherUser = currentUserId !== profileId;
  const thisProfileData = profileData[profileId];

  console.log(reviews);

  return (
    <div className="profile">
      <ProfileCard {...thisProfileData} siggnedInUser={currentUserData} />
      <ProfileContent
        thisProfileData={thisProfileData}
        currentUserData={currentUserData}
        currentUserId={currentUserId}
        otherUser={otherUser}
        finishedJobs={finishedJobs}
        reviews={reviews}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const jobOffers = state.firestore.ordered.jobOffers;
  return {
    profileData: state.firestore.data.users,
    currentUserData: state.firebase.profile,
    currentUserId: state.firebase.auth.uid,
    finishedJobs: jobOffers ? jobOffers.length : 0,
    reviews: state.firestore.ordered.reviews
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [
      {
        collection: `users`,
        doc: props.match.params.uid
      },
      {
        collection: "jobOffers",
        where: [
          ["photographer.uid", "==", props.match.params.uid],
          ["status", "==", "closed"]
        ]
      },
      {
        collection: "reviews",
        where: ["receiverData.uid", "==", props.match.params.uid]
      }
    ];
  })
)(Profile);
