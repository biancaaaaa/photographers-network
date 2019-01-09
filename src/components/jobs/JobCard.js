import React from "react";
import {Link} from "react-router-dom";

const options = {year: 'numeric', month: 'long', day: 'numeric'};

export const JobCard = ({id, title, location, startDate, description, priceAmount, insuranceAmount, moreLink, editBtn}) => (
  <li key={id}>
    <div className="information-container">
      <Link to={`/progress-job/${id}`}>
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
    </div>
    <b>{Number(priceAmount) + Number(insuranceAmount || 0)} €</b>
  </li>
);