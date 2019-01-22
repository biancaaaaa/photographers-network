// dependencies
import React from "react";
import {Route, Redirect} from "react-router-dom";
import PropTypes from "prop-types";

// components
import {DashboardHeader} from "./DashboardHeader";
import Payouts from "../../contents/photographer/dashboard/Payouts";
import RecentJobs from "../../contents/photographer/dashboard/RecentJobs";
import PhotographerList from "../../contents/company/dashboard/PhotographerList";

// contents
import UpcomingJobs from "../../contents/shared/dashboard/UpcomingJobs";
import BillingInformation from "../../contents/shared/dashboard/BillingInformation";

export const DashboardView = ({auth, type, linkHandler, headerLinks}) => {
  return (
    <React.Fragment>
      <DashboardHeader
        type={type}
        links={headerLinks}
        auth={auth}
        linkHandler={linkHandler}
      />
      <Route exact path="/dashboard" render={props => <Redirect to={`/dashboard/upcoming-jobs/${type}`}/>}/>
      <Route exact path="/dashboard/upcoming-jobs/:type(company|photographer)" render={props => <UpcomingJobs {...props}/>}/>
      <Route exact path="/dashboard/payout/:type(company|photographer)" render={props => <Payouts {...props}/>}/>
      <Route exact path="/dashboard/billing-information" render={props => <BillingInformation/>}/>
      <Route exact path="/dashboard/recent-jobs" render={props => <RecentJobs/>}/>
      <Route exact path="/dashboard/photographer" render={props => <PhotographerList/>}/>
    </React.Fragment>
  );
};

DashboardView.propTypes = {
  type: PropTypes.string.isRequired,
  linkHandler: PropTypes.func,
  activeComponent: PropTypes.string,
  headerLinks: PropTypes.array
};

