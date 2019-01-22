import React from "react";
import { PropTypes } from "prop-types";

export const AvailableJobsToSendList = ({
  existingJobs,
  sendRequestHandler,
  reqSentLoading,
  backHandler
}) => (
  <React.Fragment>
    {!reqSentLoading && (
      <h2 className="send-job-offer-back" onClick={backHandler}>
        BACK
      </h2>
    )}
    {existingJobs.length === 0 ? (
      <h2>There are no jobs, at least no open jobs</h2>
    ) : reqSentLoading ? (
      <h2>Sending....</h2>
    ) : (
      <ul className="openjobslist">
        {existingJobs.map(el => (
          <li className="openjobitem" key={el.id}>
            <div className="job-infos">
              <h2 className="openjobtitle">{el.title}</h2>
              <p className="openjobtitle">{el.descrition}</p>
              <p className="openjoblocation">{el.location.city}</p>
              <p className="openjobprice">{el.priceAmount}£</p>
            </div>
            <div onClick={() => sendRequestHandler(el)} className="sendoffer">
              Send
            </div>
          </li>
        ))}
      </ul>
    )}
  </React.Fragment>
);

AvailableJobsToSendList.propTypes = {
  existingJobs: PropTypes.array.isRequired,
  sendRequestHandler: PropTypes.func.isRequired,
  reqSentLoading: PropTypes.bool.isRequired,
  backHandler: PropTypes.func.isRequired
};
