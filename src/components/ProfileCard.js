import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "./Avatar";

export const ProfileCard = ({ backgroundImg, profileImageUrl, premium }) => {
  return (
    <div className="gb-card-10-wrapper">
      <div className="profile-card" style={{ backgroundColor: "#002b41" }}>
        <div className="card-10-shadow-overlay" />
        <Avatar
          premium={premium}
          userImageUrl={
            profileImageUrl || "http://cdn.onlinewebfonts.com/svg/img_74993.png"
          }
          classes="profile-avatar gb-avatar-x-large"
        />
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  backgroundImg: PropTypes.string,
  type: PropTypes.string.isRequired,
  hireable: PropTypes.bool,
  uid: PropTypes.string.isRequired
};
