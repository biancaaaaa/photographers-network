import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// svg's
import { StarSVG } from "../svg/StarSVG";
import JobOffertURL from "../../svg/job-offerts.svg";
import BillingInfoURL from "../../svg/billing-informations.svg";
import PayoutPhoURL from "../../svg/payout-photographer.svg";
import PayoutComURL from "../../svg/payout companies.svg";
import SearchPhotoURL from "../../svg/search-photographer.svg";
import CreateJobURL from "../../svg/create-job-offerts.svg";
import DashboardURL from "../../svg/dashboard.svg";
import ProfileURL from "../../svg/profile.svg";

const links = {
  photographer: [
    {
      to: "dashboard",
      txt: "DASHBOARD",
      svg: <img src={DashboardURL} className="nav-aside-icon gb-icon-medium gb-icon-white-opacity-50" alt="dashboard" />
    },
    {
      to: "jobs",
      txt: "JOB OFFERTS",
      svg: <img src={JobOffertURL} className="nav-aside-icon gb-icon-medium gb-icon-white-opacity-50" alt="job-offer" />
    },
    {
      to: "ProfileEdit",
      txt: "PROFILE SETTINGS",
      svg: <img src={ProfileURL} className="nav-aside-icon gb-icon-medium gb-icon-white-opacity-50" alt="profile-edit" />
    },
    {
      to: "dashboard/billing-information",
      txt: "BILLING INFORMATION",
      svg: <img src={BillingInfoURL} className="nav-aside-icon gb-icon-medium gb-icon-white-opacity-50" alt="billing-info" />
    },
    {
      to: "dashboard/payout/photographer",
      txt: "PAY OUT",
      svg: <img src={PayoutPhoURL} className="nav-aside-icon gb-icon-medium gb-icon-white-opacity-50" alt="payout" />
    }
  ],
  company: [
    {
      to: "dashboard",
      txt: "DASHBOARD",
      svg: <img src={DashboardURL} className="nav-aside-icon gb-icon-medium gb-icon-white-opacity-50" alt="dashboard"/>
    },
    {
      to: "search-photographers",
      txt: "SEARCH PHOTOGRAPHERS",
      svg: <img src={SearchPhotoURL} className="nav-aside-icon gb-icon-medium gb-icon-white-opacity-50" alt="search"/>
    },
    {
      to: "createJob",
      txt: "CREATE JOB OFFERT",
      svg: <img src={CreateJobURL} className="nav-aside-icon gb-icon-medium gb-icon-white-opacity-50" alt="create-job"/>
    },
    {
      to: "jobs",
      txt: "JOB OFFERTS",
      svg: <img src={JobOffertURL} className="nav-aside-icon gb-icon-medium gb-icon-white-opacity-50" alt="job-offers" />
    },
    {
      to: "ProfileEdit",
      txt: "PROFILE SETTINGS",
      svg: <img src={ProfileURL} className="nav-aside-icon gb-icon-medium gb-icon-white-opacity-50" alt="profile"/>
    },
    {
      to: "dashboard/billing-information",
      txt: "BILLING INFORMATION",
      svg: <img src={BillingInfoURL} className="nav-aside-icon gb-icon-medium gb-icon-white-opacity-50" alt="billing" />
    },
    {
      to: "dashboard/payout/company",
      txt: "PAY OUT",
      svg: <img src={PayoutComURL} className="nav-aside-icon gb-icon-medium gb-icon-white-opacity-50" alt="payout"/>
    }
  ]
};

export const GbNavAside = ({ expanded, user, signOutUser, expandHandler }) => (
  <div
    className={`gb-nav-aside gb-background-black ${
      expanded ? "translated" : ""
    }`}
  >
    <div className="nav-aside-content">
      {user.uid ? (
        <GbNavAsideUserOn
          expandHandler={expandHandler}
          user={user}
          signOutUser={signOutUser}
        />
      ) : (
        <ul className="nav-aside-content-top">
          <li onClick={expandHandler} className="nav-aside-top-list-item">
            <Link to="/signIn" className="nav-aside-link gb-text-white">
              <StarSVG classes="nav-aside-icon gb-icon-medium gb-icon-white-opacity-50" />
              <h5 className="gb-text-uppercase gb-text-white gb-title-tiny gb-text-uppercase">
                Sign in
              </h5>
            </Link>
          </li>
        </ul>
      )}
    </div>
  </div>
);

const GbNavAsideUserOn = ({ expandHandler, user, signOutUser }) => (
  <React.Fragment>
    <ul className="nav-aside-content-top">
      {links[user.type].map((el, idx) => (
        <li
          key={new Date().getTime() + idx}
          className="nav-aside-top-list-item"
          onClick={expandHandler}
        >
          <Link to={`/${el.to}`} className="nav-aside-link gb-text-white">
            {el.svg}
            <h5 className="gb-text-uppercase gb-text-white gb-title-tiny gb-text-uppercase">
              {el.txt}
            </h5>
          </Link>
        </li>
      ))}
    </ul>

    <div className="nav-aside-content-bottom line-top">
      <div onClick={expandHandler} className="content-left">
        <h2
          onClick={signOutUser}
          className="left-link gb-text-uppercase gb-text-white gb-title-tiny"
        >
          SIGN OUT
        </h2>
        <p className="left-link gb-label gb-text-white-opacity-50">
          {user.type === "photographer"
            ? user.firstName + " " + user.lastName
            : user.companyName}
        </p>
      </div>
      <div onClick={expandHandler} className="content-right">
        <Link to={`/profile/${user.uid}`} className="profile-link">
          <img
            className="gb-avatar gb-avatar-medium"
            src={user.profileImageUrl}
            alt="avatar"
          />
        </Link>
      </div>
    </div>
  </React.Fragment>
);

GbNavAside.propTypes = {
  expanded: PropTypes.bool.isRequired,
  user: PropTypes.object,
  signOutUser: PropTypes.func.isRequired
};
