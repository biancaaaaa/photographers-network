import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {Avatar} from "../../../components/label/Avatar";

export const Photographer = ({profileImageUrl, firstName, lastName, locations, description, uid, showHireBtn}) => (
  <li className="user-li-card">
    <div className="gb-display-flex">
      <Avatar userImageUrl={profileImageUrl}/>
      <div>
        <h1 className="uppercase">{firstName} {lastName}</h1>
        <h4 className="small-heading">{Object.values(locations)[0].city}</h4>
      </div>
    </div>
    <p className="description">
      {description}
    </p>
    <Link className="gb-btn gb-btn-small gb-btn-primary gb-btn-white pink-border"
          to={`/profile/${uid}`}>
      Profile
    </Link>
    {
      showHireBtn &&
      <Link className="gb-btn gb-btn-small gb-btn-primary gb-btn-white pink-border"
            to={`/profile/${uid}`}>
        Hire
      </Link>
    }
  </li>
);

Photographer.propTypes = {
  profileImageUrl: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  description: PropTypes.string,
  locations: PropTypes.object.isRequired,
  uid: PropTypes.string.isRequired
};