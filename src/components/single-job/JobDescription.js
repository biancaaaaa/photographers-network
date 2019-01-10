import React from "react";
import {Link} from "react-router-dom";
import {MyFancyMap} from "../../routes/map";

export const JobDescription = ({
                                 title,
                                 description,
                                 startDate,
                                 location,
                                 priceAmount,
                                 requestedSkill,
                                 company,
                                 companyId
                               }) => {
  const locationAddress = `${location.streetName}${
    location.streetNumber ? ` ${location.streetNumber}` : ""
    }, ${location.city}, ${location.country}`;
  return (
    <div className="red-bg">
      <h2 className="black-bg-header">{title}</h2>
      <div className="dashboard-container white-container">
        <p>Job Description: {description}</p>
        <hr/>
        <p>Job for the date of: {new Date(startDate).toLocaleDateString()}</p>
        <hr/>
        <p>Job in: {locationAddress}</p>
        <hr/>
        <p>Budget of: {priceAmount} €</p>
        <hr/>
        <p>
          Requested skill:{" "}
          <Link to={`../jobs?type=${requestedSkill}`}>{requestedSkill}</Link>
        </p>
        <hr/>
        <p>
          Posted by:{" "}
          <Link to={`../profile/${companyId}`}>{company.companyName}</Link>
        </p>
        <hr/>
        <MyFancyMap
          long={location.geolocation._long}
          lat={location.geolocation._lat}
        />
      </div>
    </div>
  );
};
