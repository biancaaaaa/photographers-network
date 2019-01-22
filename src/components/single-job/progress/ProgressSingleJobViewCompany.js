import React from 'react';
import {Link} from "react-router-dom";
import {SubmittedWork} from "./SubmittedWork";

export const ProgressSingleJobViewCompany = ({companySent, companyReceived, jobId, acceptedApplicant, deliveryStatus, submittedWork, acceptWorkHandler, downloadHandler, acceptedWork}) => (
  <React.Fragment>
    {
      (
        deliveryStatus && deliveryStatus === "delivered" ?
          (
            acceptedWork ?
              <React.Fragment>
                <h3>
                  Job closed. You accepted submitted work
                  of
                  <Link to={`/profile/${acceptedApplicant.uid}`}>
                    {` ${acceptedApplicant.firstName} ${acceptedApplicant.lastName}`}
                  </Link>.
                  {
                    companySent && companyReceived ?
                      <p>Both reviews were submitted.</p> :
                    companySent ?
                      <p>You have submitted you review, but you haven't received one yet.</p> :
                      <React.Fragment>
                        Click here to write a review:
                        <Link to={`/review/${jobId}`} className="gb-btn gb-btn-medium gb-btn-primary">Write review</Link>
                      </React.Fragment>
                  }
                </h3>
              </React.Fragment>
              :
              <SubmittedWork
                pictures={submittedWork}
                acceptWorkHandler={acceptWorkHandler}
                downloadHandler={downloadHandler}
              />
          ) :
          <div><h3>Photographer: </h3><p>{`${acceptedApplicant.firstName} ${acceptedApplicant.lastName}`}</p></div>
      )
    }
  </React.Fragment>
);