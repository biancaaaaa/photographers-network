import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {isLoaded, firestoreConnect} from "react-redux-firebase";
import {JobCard} from "../../../components/jobs/JobCard";
import LoadingPage from "../../../components/LoadingPage";

const ApprovedRequests = ({ jobs, profile, auth }) => {
  if (!isLoaded(jobs)) return <LoadingPage/>;
  // filter jobs to return only job requests
  let jobRequests = jobs.filter(job => job.sentTo && job.sentTo !== null);
  // filter jobs to return only requests for company or photographer
  jobRequests = jobRequests.filter(job => profile.type === 'company' ?
    job.companyId === auth.uid : job.sentToId === auth.uid);
  return (
    <ul className="paymentList white-container dashboard-container">
      {
        jobRequests.length > 0 ?
        jobRequests.map(job =>
        <JobCard key={job.id}
                  {...job}
                  showPhotographer={profile.type === 'company'}
                  showCompany={profile.type === 'photographer'}
         />
        ) :
        <div>No requests.</div>
      }
    </ul>
  );
};

const mapStateToProps = state => ({
  jobs: state.firestore.ordered.jobOffers,
  profile: state.firebase.profile,
  auth: state.firebase.auth
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "jobOffers"
    }
  ])
)(ApprovedRequests);