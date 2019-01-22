import React from "react";
import PropTypes from "prop-types";
import {StarSVG} from "./svg/StarSVG";

export const Avatar = ({ userImageUrl, classes, profileLink, premium }) => (
  <a className="profile-link" href={profileLink}>
    {premium && <div className="premium-flag"><StarSVG classes="gb-icon-medium gb-icon-fill-white"/></div>}
    <img src={userImageUrl} alt="avatar" className={`gb-avatar ${classes}`} />
  </a>
);

Avatar.propTypes = {
  userImageUrl: PropTypes.string.isRequired,
  classes: PropTypes.string,
  profileLink: PropTypes.string
};

Avatar.defaultProps = {
  classes: "gb-avatar-medium",
  profileLink: "#"
};
