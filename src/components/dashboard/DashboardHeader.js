import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export const DashboardHeader = ({
  links
}) => {
  return (
    <div>
      <div className="gb-card-7-wrapper">
        <div
          style={{ flexDirection: "column" }}
          className="gb-card-7-height gb-background-primary"
        >
          <div className="card-7-shadow-overlay" />
          <div className="card-7-content full-width">
            <div className="gb-overflow-x-scroll">
              {links.map((link, key) => {
                return (
                  <NavLink
                    key={key}
                    to={link.link}
                    className="gb-btn gb-btn-small black-nav gb-margin-right-16"
                    activeClassName="gb-btn-outlined"
                  >
                    {link.name}
                  </NavLink>
                );
              })}
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
