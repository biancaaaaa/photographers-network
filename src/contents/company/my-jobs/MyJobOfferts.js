import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { isLoaded, isEmpty, firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import {JobCard} from "../../../components/jobs/JobCard";

const MyJobOfferts = ({ openJobs, inProgressJobs, closedJobs, allJobs }) => {
  if (!isLoaded(allJobs)) {
    return <h2>Loading...</h2>;
  }
  if (isEmpty(allJobs)) {
    return (
      <h2>
        You have no jobs posted yet, create your first{" "}
        <Link to="/createJob">here</Link>
      </h2>
    );
  }
  return (
    <div className="red-bg">
      <h2 className="black-bg-header">Your job offerts</h2>
      <ul className="paymentList white-container">
        {
          allJobs.map(job =>
            <JobCard key={job.id} {...job} moreLink={true} editBtn={true}/>
          )
        }
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  const allJobs = state.firestore.ordered.jobOffers || [];
  return {
    allJobs,
    openJobs: allJobs.filter(job => job.status === "open"),
    inProgressJobs: allJobs.filter(job => job.status === "in progress"),
    closedJobs: allJobs.filter(job => job.status === "closed"),
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: "jobOffers",
      where: [["companyId", "==", props.auth.uid]]
    }
  ])
)(MyJobOfferts);
