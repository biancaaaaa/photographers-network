import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import PropTypes from "prop-types";
import AvatarInput from "../../contents/shared/profile/AvatarInput";

export const DashboardHeader = ({
  children,
  links,
  linkHandler,
  type,
  profile,
  auth
}) => {
  let profilePath = `/profile/${auth.uid}`;
  return (
    <div>
      <div className="gb-card-7-wrapper">
        <div
          style={{ flexDirection: "column" }}
          className="gb-card-7-height gb-background-primary"
        >
          <AvatarInput uid={auth.uid} userAvatar={profile.photoURL} />
          <div className="card-7-shadow-overlay" />
          <div className="card-7-content">
            <h1 className="gb-title-xx-large gb-text-white gb-margin-bottom-40 gb-text-align-center">
              {children}
            </h1>
            <div className="gb-display-flex">
              {links.map((link, key) => {
                return (
                  <Button
                    key={key}
                    clickHandler={() => linkHandler(link.name, type)}
                    classes="gb-btn gb-btn-small gb-btn-outlined gb-margin-right-16"
                  >
                    {link.name}
                  </Button>
                );
              })}
              <Link
                to={profilePath}
                className="gb-btn gb-btn-small gb-btn-outlined gb-margin-right-16"
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardHeader.propTypes = {
  links: PropTypes.array,
  uid: PropTypes.string,
  linkHandler: PropTypes.func,
  type: PropTypes.string
};
