import React from "react";
import {Link} from "react-router-dom";
import {Avatar} from "../Avatar";

const options = {year: 'numeric', month: 'long', day: 'numeric'};

export const JobCard = ({id, status, title, location, startDate, description, priceAmount, insuranceAmount, company, moreLink, editBtn, applyBtn, photographer, showPhotographer, showCompany}) => {
  let link = '';
  if (status === 'progress') link = `/progress-job/${id}`;
  else if (status === 'open') link = `/open-job/${id}`;
  else link = `/private/job/${id}`;
  return (
    <li key={id}>
      <div className="information-container">
        <Link to={link}>
          <h2 className="uppercase">{title}</h2>
        </Link>
        <p>
          <span className="medium-black-bold">{location.city}</span>
          <span className="small-grey-bold">{new Date(startDate).toLocaleString("en-US", options)}</span>
        </p>
        <p className="description">{description}</p>
        {moreLink &&
        <Link className="gb-btn gb-btn-small gb-btn-primary gb-btn-white pink-border"
              to={`/progress-job/${id}`}>More
        </Link>
        }
        {
          editBtn &&
          <Link className="gb-btn gb-btn-small gb-btn-primary gb-btn-white pink-border"
                to={`/progress-job/${id}`}>Edit
          </Link>
        }
        {
          applyBtn &&
          <Link className="gb-btn gb-btn-small gb-btn-primary gb-btn-white pink-border"
                to={`/open-job/${id}`}>Apply
          </Link>
        }
        {
          (showPhotographer || showCompany) &&
          <div className="gb-display-flex user-info">
            <Avatar userImageUrl={showPhotographer ? photographer.profileImageUrl : company.profileImageUrl}/>
            <div className="user-info-desc">
              <h2 className="uppercase">{showPhotographer ? 'Photographer' : 'Company'}</h2>
              <p className="bold-info">{showPhotographer ? `${photographer.firstName} ${photographer.lastName}` : company.companyName}</p>
            </div>
          </div>
        }
      </div>
      <b>{Number(priceAmount) + Number(insuranceAmount || 0)} €</b>
    </li>
  );
};