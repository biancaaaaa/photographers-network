import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {DashboardHeader} from "./DashboardHeader";
import {NavFooterWrapper} from "../../containers/NavFooterWrapper";
import MyJobOffers from '../../containers/MyJobOffers';
import AppliedJobs from "../../containers/AppliedJobs";


const DashboardView = ({user, type, linkHandler, activeComponent, headerLinks, loading}) => {

  let currentComponent = '';

  switch (activeComponent) {
    case "Home":
      currentComponent = type === "photographer" ?
        (<Link to='/jobs' className="gb-btn gb-btn-medium gb-btn-primary">Search for jobs</Link>) :
        (<Link to='../createJob' className="gb-btn gb-btn-medium gb-btn-primary">Create job offer</Link>)
      ;
      break;
    case "Applied Jobs":
      currentComponent = (<AppliedJobs user={user} loading={loading}/>);
      break;
    case "My Jobs":
      currentComponent = (<MyJobOffers user={user} loading={loading} />);
      break;
    default:
      currentComponent = (<div>No fitting component!</div>);
      break;
  }

  return (
    <div>
      <DashboardHeader type={type} links={headerLinks} uid={user.uid}
                       linkHandler={linkHandler}>
        Welcome {user.displayName}!
      </DashboardHeader>
      {currentComponent}
    </div>
  );
};

export const DashboardViewWithNav = NavFooterWrapper(DashboardView);

DashboardView.propTypes = {
  user: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  linkHandler : PropTypes.func,
  activeComponent : PropTypes.string,
  headerLinks : PropTypes.array,
}