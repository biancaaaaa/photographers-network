import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { isLoaded, isEmpty, firestoreConnect } from "react-redux-firebase";
import { sendPrivateRequestFromExistingJobs } from "../../../redux/actions/company-actions";

import { AvailableJobsToSendList } from "../../../components/private-job/AvailableJobsToSendList";

class HireMeExistingJobOffer extends React.Component {
  state = {
    loading: false,
    error: null
  };

  //Send one of the existing open jobs
  //as private request
  sendRequestHandler = jobData => {
    const { user, photographerData } = this.props;
    //set the loading to true
    this.setState({
      loading: true,
      error: null
    });
    this.props
      .sendPrivateJob(jobData, user, photographerData)
      .then(() => {
        //after the job has been updated, and notification sent
        this.setState({
          loading: false,
          succes: true,
          error: null
        });
      })
      .catch(err => {
        //if an error occur while sending private req
        this.setState({
          loading: false,
          succes: false,
          error: err
        });
      });
  };
  render() {
    const { user, ownOpenJobs, photographerId, backHandler } = this.props;

    if (!isLoaded(ownOpenJobs)) {
      return <h2>Loading..... Waint no spinner?</h2>;
    }
    if (isEmpty(ownOpenJobs)) {
      return <h2>There are no jobs, at least no open jobs</h2>;
    }
    return (
      <div className="asd">
        <AvailableJobsToSendList
          backHandler={backHandler}
          existingJobs={ownOpenJobs}
          sendRequestHandler={this.sendRequestHandler}
          reqSentLoading={this.state.loading}
          company={user}
          photographerId={photographerId}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.firebase.profile,
    ownOpenJobs: state.firestore.ordered.ownOpenJobs,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => ({
  sendPrivateJob: (jobData, company, photographerData) =>
    dispatch(
      sendPrivateRequestFromExistingJobs(jobData, company, photographerData)
    )
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [
    {
      collection: "jobOffers",
      where: [
        ["companyId", "==", props.auth.uid],
        ["status", "==", "open"],
        ["sentTo", "==", null]
      ],
      storeAs: "ownOpenJobs"
    }
  ])
)(HireMeExistingJobOffer);
