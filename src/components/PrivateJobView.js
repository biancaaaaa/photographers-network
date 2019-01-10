import React from "react";
import { Link } from "react-router-dom";

export const PrivateJobView = ({
  companyId,
  company,
  startDate,
  description,
  location,
  priceAmount,
  title,
  requestedSkill,
  acceptJobReq,
  rejectJobReq,
  jobId,
  status
}) => {
  return (
    <div className="red-bg">
      <h2 className="black-bg-header">{title}</h2>
    <div className="job-view-private dashboard-container white-container">
      <p>Description : {description}</p>
      <h2>Budget : {priceAmount} </h2>
      <h5>Type of photography : {requestedSkill} </h5>
      <p>
        Location : {location.city}, {location.country}
      </p>
      <p>Date : {new Date(startDate).toLocaleDateString()} </p>
      <p>
        Company :{" "}
        <Link to={`/profile/${companyId}`}>{company.companyName}</Link>{" "}
      </p>
      <div className="accept-reject-buttons">
        <div
          className="accpet-button gb-btn gb-btn-medium gb-btn-primary gb-btn-white"
          onClick={() => acceptJobReq(jobId, title, companyId)}
        >
          Accept Request
        </div>
        <div
          className="reject-button gb-btn gb-btn-medium gb-btn-primary gb-btn-white"
          onClick={() => rejectJobReq(jobId, title, companyId, status)}
        >
          Reject Request
        </div>
      </div>
    </div>
    </div>
  );
};
