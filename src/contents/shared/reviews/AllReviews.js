import React from 'react';
import {ReviewBox} from "../../../components/profile/ReviewBox";
import {connect} from "react-redux";
import {compose} from "redux";
import {isLoaded, firestoreConnect} from "react-redux-firebase";
import LoadingPage from "../../../components/LoadingPage";

const AllReviews = ({reviews}) => {
  if (!isLoaded(reviews)) return <LoadingPage/>;
  return (
    <div className="section-content with-padding">
      <h1>All Reviews</h1>
      {
        reviews.map(review =>
          <ReviewBox title={review.jobName}
                     userImageURL={review.authorData.profileImageUrl}
                     name={review.authorData.companyName}
                     quote={review.message}
                     key={review.id}
          />
        )
      }
    </div>
  );
};

const mapStateToProps = state => ({
  reviews: state.firestore.ordered.reviews
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: "reviews",
      where: ["receiverData.uid", "==", props.match.params.uid]
    }
  ])
)(AllReviews);