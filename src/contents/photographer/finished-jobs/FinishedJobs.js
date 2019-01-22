import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {isLoaded, firestoreConnect} from "react-redux-firebase";
import LoadingPage from "../../../components/LoadingPage";

const FinishedJobs = ({jobOffers}) => {
  if (!isLoaded(jobOffers)) return <LoadingPage/>;
  return (
    <div className="section-content with-padding">
      <h1>Finished jobs</h1>
      {
        jobOffers.map(job => (
          <div key={job.id}>{job.title}</div>
        ))
      }
    </div>
  );
};

const mapStateToProps = state => ({
  jobOffers: state.firestore.ordered.jobOffers
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: "jobOffers",
      where: [
        ["photographer.uid", "==", props.match.params.uid],
        ["status", "==", "closed"]
      ]
    }
  ])
)(FinishedJobs);