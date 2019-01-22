import React from "react";
import {Redirect} from "react-router-dom";
import LoadingPage from "../../../components/LoadingPage";
import {JobDescription} from "../../../components/single-job/JobDescription";
import ProgressSingleJobCompany from "../../company/single-job/ProgressSingleJobCompany";
import ProgressSingleJobPhotographer from "../../photographer/single-job/ProgressSingleJobPhotographer";
import {connect} from "react-redux";
import {isLoaded, firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

class ProgressSingleJob extends React.Component {
  componentDidMount() {
    // sets listener
    this.props.firestore.setListener({
      collection: "jobOffers",
      doc: this.props.match.params.jobid
    });
  }

  render() {
    const {jobsData, user, reviews, auth} = this.props;
    const jobId = this.props.match.params.jobid;

    // job data is not loaded
    if (!isLoaded(jobsData) || !isLoaded(reviews))
      return <LoadingPage/>;
    // job does not exist
    if (!jobsData[jobId])
      return <div className="single-job-view section-content">Job does not seem to exist anymore.</div>;
    const jobDescription = jobsData[jobId];
    // current user is not the photographer or company of the project
    if (jobDescription.photographer.uid !== auth.uid &&
        jobDescription.companyId !== auth.uid)
      return <Redirect to='/dashboard'/>;
    // job is not in progress
    if (jobDescription.status === "open")
      return <Redirect to={`/open-job/${jobId}`}/>;

    const submittedWork = Object.values(jobDescription.submittedWork || {});
    const allReviews = Object.values(reviews || {}).filter(review => review.jobId === jobId);
    const receivedBoth = allReviews.length === 2;
    // check if company has received a review
    const companyReceived = receivedBoth ||
      Boolean(allReviews[0] && allReviews[0].receiverData.companyName);
    // check if company has sent a review
    const companySent = receivedBoth ||
      Boolean(allReviews[0] && allReviews[0].authorData.companyName);
    return (
      <React.Fragment>
          <JobDescription {...jobDescription} />
          {user.type === "photographer" ? (
            <ProgressSingleJobPhotographer
              submittedWork={submittedWork}
              acceptedWork={jobDescription.status === "closed"}
              jobId={jobId}
              jobDescription={jobDescription}
              receivedBoth={receivedBoth}
              photographerReceived={!companyReceived}
            />
          ) : (
            <ProgressSingleJobCompany
              acceptedApplicant={jobDescription.photographer}
              submittedWork={submittedWork}
              jobId={jobId}
              jobDescription={jobDescription}
              user={user}
              companySent={companySent}
              companyReceived={companyReceived}
            />
          )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const firestore = state.firestore.data;
  return {
    auth: state.firebase.auth,
    user: state.firebase.profile,
    jobsData: firestore.jobOffers,
    reviews: firestore.reviews
  };
};

export default compose(
  connect(
    mapStateToProps
  ),
  firestoreConnect(props => [
    {
      collection: "jobOffers",
      doc: props.match.params.jobid
    },
    {
      collection: "reviews",
      where: [["jobId", "==", props.match.params.jobid]]
    }
  ])
)(ProgressSingleJob);
