import React from "react";
import {DashboardHeader} from "../../../components/dashboard/DashboardHeader";
import {Route, Redirect} from "react-router-dom";

import RequestsView from "./RequestsView";

class AllJobRequests extends React.Component {
  state = {
    links: [
      {
        name: 'Approved',
        link: '/all-job-requests/approved'
      },
      {
        name: 'Pending',
        link: '/all-job-requests/pending'
      },
      {
        name: 'Rejected',
        link: '/all-job-requests/rejected'
      }
    ]
  };

  render() {
    return (
      <React.Fragment>
        <DashboardHeader links={this.state.links}/>
        <Route exact path="/all-job-requests" render={props => <Redirect to={`/all-job-requests/approved`}/>}/>
        <Route exact path="/all-job-requests/approved" render={props => <RequestsView type="approved" {...props}/>}/>
        <Route exact path="/all-job-requests/pending" render={props => <RequestsView type="pending" {...props}/>}/>
        <Route exact path="/all-job-requests/rejected" render={props => <RequestsView type="rejected" {...props}/>}/>
      </React.Fragment>
    );
  }
}

export default AllJobRequests;