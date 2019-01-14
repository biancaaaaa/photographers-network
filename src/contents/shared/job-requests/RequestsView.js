import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {isLoaded, firestoreConnect} from "react-redux-firebase";
import {JobCard} from "../../../components/jobs/JobCard";
import LoadingPage from "../../../components/LoadingPage";

const RequestsView = ({ jobs, profile, auth, type }) => {
  if (!isLoaded(jobs)) return <LoadingPage/>;
  // filter jobs to return only job requests
  // filter jobs to return only requests for company or photographer
  let jobRequests = jobs.filter(job => profile.type === 'company' ?
    job.company.uid === auth.uid : job.photographer.uid === auth.uid);
  jobRequests = jobRequests.filter(job => job.status === type);
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

const mapStateToProps = state => {
  const type = state.firebase.profile.type;
  const store =  state.firestore.ordered;
  return ({
    jobs: type === 'company' ? store.companyRequests : store.photographerRequests,
    profile: state.firebase.profile,
    auth: state.firebase.auth
  });
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: "jobRequests",
      where: ['company.uid', '==', props.auth.uid],
      storeAs: 'companyRequests'
    },
    {
      collection: 'jobRequests',
      where: ['photographer.uid', '==', props.auth.uid],
      storeAs: 'photographerRequests'
    }
  ])
)(RequestsView);