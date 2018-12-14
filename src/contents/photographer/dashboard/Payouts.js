import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {isLoaded, firestoreConnect} from "react-redux-firebase";
import LoadingPage from "../../../components/LoadingPage";
import {JobCard} from "../../../components/jobs/JobCard";

class Payouts extends React.Component {
  render() {
    const {match, jobOffers, profile, auth} = this.props;

    if (profile.type !== match.params.type) return <Redirect to={`payout/${profile.type}`}/>;
    if (!isLoaded(jobOffers)) return <LoadingPage/>;

    const jobs = jobOffers.filter(job => job.photographer.uid === auth.uid);
    // get the sum of all payouts
    let total = 0;
    jobs.forEach(job => {
      total += Number(job.priceAmount)
    });

    return (
      <div>
        {
          match.params.type === "photographer" ?
            <React.Fragment>
              <ul className="paymentList">
                {
                  jobs.map(job =>
                    <JobCard key={job.id} {...job}/>
                  )
                }
              </ul>
              <div className="black-yellow-box">
                <span className="uppercase light">Total</span>
                <b>{total} € </b>
              </div>
            </React.Fragment> : <div className="dashboard-container">Company!</div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  jobOffers: state.firestore.ordered.jobOffers,
  profile: state.firebase.profile,
  auth: state.firebase.auth
});

export default compose(
  firestoreConnect(props => [
    {
      collection: "jobOffers",
      where: [["payout", "==", false], ["status", "==", "closed"]]
    }]
  ),
  connect(mapStateToProps)
)(Payouts);