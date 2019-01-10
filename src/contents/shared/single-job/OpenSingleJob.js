import React from "react";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { isLoaded, firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import LoadingPage from "../../../components/LoadingPage";
import OpenSingleJobPhotographer from "../../photographer/single-job/OpenSingleJobPhotographer";
import OpenSingleJobCompany from "../../company/single-job/OpenSingleJobCompany";
import { JobDescription } from "../../../components/single-job/JobDescription";

class OpenSingleJob extends React.Component {
  render() {
    let { jobsData, user } = this.props;
    const jobId = this.props.match.params.jobid;

    // job data is not loaded
    if (!isLoaded(jobsData)) return <LoadingPage />;
    // job does not exist
    if (!jobsData[jobId])
      return (
        <div className="single-job-view section-content">
          Job does not seem to exist anymore.
        </div>
      );

    const jobData = { ...jobsData[jobId], jobId: jobId };

    if (jobData.status !== "open")
      return <Redirect to={`/progress-job/${this.props.match.params.jobid}`} />;

    return (
      <React.Fragment>
        <JobDescription {...jobData} />
        {user.type === "photographer" ? (
          <OpenSingleJobPhotographer
            userApplied={jobData.userApplied}
            isDeclinedPhotographer={jobData.isDeclinedPhotographer}
            jobId={jobId}
            user={user}
            jobData={jobData}
          />
        ) : (
          <OpenSingleJobCompany
            jobData={jobData}
            jobId={jobId}
            downPayment={false}
            {...this.props}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.firebase.profile,
  jobsData: state.firestore.data.jobOffers
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect(ownProps => {
    const id = ownProps.match.params.jobid;
    return [
      {
        collection: "jobOffers",
        doc: id
      }
    ];
  })
)(OpenSingleJob);
