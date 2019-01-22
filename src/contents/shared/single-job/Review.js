import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {addNewReview} from "../../../redux/actions/review-action";
import {compose} from "redux";
import {isLoaded, firestoreConnect} from "react-redux-firebase";
import LoadingPage from "../../../components/LoadingPage";
import {addNewNotification} from "../../../redux/actions/notifications-action";

class Review extends React.Component {
  state = {
    message: ''
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  /**
   * Saves new review into the database, adds notification
   * and redirects user to job.
   *
   * @param e
   * @param job
   * @param jobId
   */
  handleSubmit = (e, job, jobId) => {
    e.preventDefault();
    const {message} = this.state;
    const {user} = this.props;
    // assign review data
    const company = {...job.company, uid: job.companyId};
    const isCompany = user.type === "company";
    const authorData = isCompany ? company : job.photographer;
    const receiverData = isCompany ? job.photographer : company;
    // add review
    this.props.addReview(message, jobId, job.title, authorData, receiverData);
    // add notification
    const notification = {
      title: `${
        isCompany ? company.companyName : 
          `${job.photographer.firstName} ${job.photographer.lastName}`
        } gave you a review for ${job.title}.`,
      link: `/progress-job/${jobId}`,
      read: false,
      createdAt: new Date().getTime(),
      recipientUserId: isCompany ? job.photographer.uid : company.uid
    };
    this.props.addNotification(notification);
    // redirect
    this.props.history.replace(`/progress-job/${jobId}`);
  };

  render() {
    const {match, jobsData, user} = this.props;
    if (!isLoaded(jobsData)) return <LoadingPage/>;
    const jobId = match.params.jobid;
    const job = jobsData[jobId];
    //TODO: redirect to job, if review was already written
    return (
      <div className="single-job-view section-content with-padding">
        <form onSubmit={e => this.handleSubmit(e, job, jobId)}>
          <h2>Write review</h2>
          <p>Enter your review for
            {
              user.type === "photographer" ?
                <Link to={`/profile/${job.companyId}`}> {job.company.companyName} </Link> :
                <Link to={`/profile/${job.photographer.uid}`}>
                  {` ${job.photographer.firstName} ${job.photographer.lastName}  `}
                </Link>
            }
            here. This review will be public.</p>
          <textarea placeholder="Type in your review"
                    className="grey-textarea"
                    name="message"
                    value={this.state.message}
                    onChange={this.handleChange}
          />
          <input className="gb-btn gb-btn-medium gb-btn-primary" type="submit" value="Submit Review"/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  jobsData: state.firestore.data.jobOffers,
  user: state.firebase.profile,
  auth: state.firebase.auth
});

const mapDispatchToProps = dispatch => ({
  addReview: (message, jobId, jobTitle, authorData, receiverData) =>
    dispatch(addNewReview(message, jobId, jobTitle, authorData, receiverData)),
  addNotification: notification => dispatch(addNewNotification(notification))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [
    {
      collection: "jobOffers",
      doc: props.match.params.jobid
    },
    {
      collection: "reviews",
      where: [
        ["jobId", "==", props.match.params.jobid],
        ["authorData.uid", "==", props.auth.uid]
      ]
    }
  ])
)(Review);