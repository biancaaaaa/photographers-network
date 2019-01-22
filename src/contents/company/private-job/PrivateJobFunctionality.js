import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { PrivateJobView } from "../../../components/PrivateJobView";
import { isLoaded, isEmpty, firestoreConnect } from "react-redux-firebase";
import {
  acceptPrivateJobRequest,
  rejectPrivateJobRequest
} from "../../../redux/actions/photographer-actions";
import {setDownPaymentStatus} from "../../../redux/actions/company-actions";

const PrivateJobFunctionality = ({
  ownPrivateJobs,
  match,
  acceptJobReq,
  rejectJobReq,
  setDownPaymentStatus,
  user
}) => {
  const jobId = match.params.jobId;

  //Still loading for the data to load
  if (!isLoaded(ownPrivateJobs)) {
    return <h2>Loading...</h2>;
  }

  //After loading check to see if the job for this id exist
  if (!ownPrivateJobs || !ownPrivateJobs[jobId]) {
    return <h2>No job for this iD</h2>;
  }

  //No job for this id
  if (isEmpty(ownPrivateJobs[jobId])) {
    return <h2>There is not a job present for this id.</h2>;
  }

  //Show the private job infos
  const jobInfos = ownPrivateJobs[jobId];

  return (
    <PrivateJobView
      {...jobInfos}
      jobId={jobId}
      acceptJobReq={acceptJobReq}
      rejectJobReq={rejectJobReq}
      user={user}
      successfulPaymentHandler={setDownPaymentStatus}
    />
  );
};

const mapStateToProps = state => {
  const store = state.firestore.data;
  const type = state.firebase.profile.type;
  return ({
    user: state.firebase.profile,
    auth: state.firebase.auth,
    ownPrivateJobs: type === 'company' ?
      store.ownPrivateJobsCompany :
      store.ownPrivateJobsPhotographer
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  acceptJobReq: (jobId, title, companyId) =>
    dispatch(acceptPrivateJobRequest(jobId, title, companyId, ownProps.user)),
  rejectJobReq: (jobId, title, companyId, status) =>
    dispatch(
      rejectPrivateJobRequest(jobId, title, companyId, ownProps.user, status)
    ),
  setDownPaymentStatus: jobId => dispatch(setDownPaymentStatus(jobId))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [
    {
      collection: "jobRequests",
      where: [["company.uid", "==", props.auth.uid]],
      storeAs: "ownPrivateJobsCompany"
    },
    {
      collection: 'jobRequests',
      where: [['photographer.uid', '==', props.auth.uid]],
      storeAs: 'ownPrivateJobsPhotographer'
    }
  ])
)(PrivateJobFunctionality);
