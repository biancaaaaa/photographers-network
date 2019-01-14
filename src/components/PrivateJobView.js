import React from "react";
import {Link} from "react-router-dom";
import DownPayment from "../contents/company/single-job/DownPayment";

import ProgressSingleJobPhotographer from '../contents/photographer/single-job/ProgressSingleJobPhotographer';

export const PrivateJobView = props => {
  const {
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
    status,
    user,
    photographer,
    downPaymentAmountStatus,
    successfulPaymentHandler
  } = props;
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
          Company:{" "}
          <Link to={`/profile/${company.uid}`}>{company.companyName}</Link>{" "}
        </p>
        <p>
          Photographer:{" "}
          <Link to={`/profile/${photographer.uid}`}>{photographer.firstName} {photographer.lastName}</Link>{" "}
        </p>
        <div className="accept-reject-buttons">
          {
            user.type === 'photographer' ?
              <React.Fragment>
                {
                  status === 'pending' ?
                  <React.Fragment>
                    <div
                      className="accpet-button gb-btn gb-btn-medium gb-btn-primary gb-btn-white"
                      onClick={() => acceptJobReq(jobId, title, company.uid)}
                    >
                      Accept Request
                    </div>
                    <div
                      className="reject-button gb-btn gb-btn-medium gb-btn-primary gb-btn-white"
                      onClick={() => rejectJobReq(jobId, title, company.uid, status)}
                    >
                      Reject Request
                    </div>
                  </React.Fragment> :
                    <ProgressSingleJobPhotographer jobDescription={props} jobId={jobId}/>
                }
              </React.Fragment> :
              <React.Fragment>
                {
                  status === 'pending' &&
                  <h2>Waiting for answer of photographer.</h2>
                }
                {
                  status === 'rejected' &&
                  <h2>Photographer rejected your job request.</h2>
                }
                {
                  status === 'approved' &&
                  <div>
                    <h2>Photographer approved your job request.</h2>
                    {
                      downPaymentAmountStatus === 'none' ?
                        <DownPayment
                          description={
                            <React.Fragment>
                              <h3>Make down payment</h3>
                              <p>
                                Please make your down payment simply by pressing the PayPal
                                button in order to accept{" "}
                                <Link to={`/profile/${photographer.uid}`}>
                                  {`${photographer.firstName} ${
                                    photographer.lastName
                                    }`}
                                </Link>{" "}
                                as your photographer for your job request.
                              </p>
                            </React.Fragment>
                          }
                          price={priceAmount}
                          paymentHandler={() => successfulPaymentHandler(jobId)}
                        /> :
                        <p>Waiting for photographer to submit his work.</p>
                    }
                  </div>
                }
              </React.Fragment>
          }
        </div>
      </div>
    </div>
  );
};
