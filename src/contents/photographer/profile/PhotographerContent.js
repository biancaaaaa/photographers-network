import React from "react";
import { PortofolioGallery } from "../../../components/PortofolioGallery";
import { PropTypes } from "prop-types";
import { HireButton } from "../../../components/HireButton";
import { Link } from "react-router-dom";
import { ReviewBox } from "../../../components/profile/ReviewBox";

export const PhotographerContent = ({
  reviews,
  photographerData,
  siggnedInUser: signedInUser,
  uid,
  finishedJobs,
  hireable
}) => (
  <React.Fragment>
    <div className="flex-container-space">
      <div>
        <span className="big-num">{finishedJobs}</span>
        <span className="light-blue">
          Jobs <br />
          done
        </span>
      </div>
      <Link
        to={`/finished-jobs/${uid}`}
        className="gb-btn gb-btn-small gb-btn-primary gb-btn-white"
      >
        See the projects
      </Link>
    </div>
    {photographerData.portfolio && photographerData.portfolio.length > 0 && (
      <React.Fragment>
        <h2 className="black-header-portfolio">Portfolio</h2>
        <PortofolioGallery photosList={photographerData.portfolio} />
      </React.Fragment>
    )}
    {hireable && signedInUser.type === "company" && (
      <div className="pink-box">
        <p>
          There, between rolling hills and the Apennine mountains in the Mugello
          valley.
        </p>
        <HireButton
          classes="hire-button"
          photographerData={photographerData}
          siggnedInUser={signedInUser}
          uid={uid}
          photographerName={`${photographerData.firstName} ${
            photographerData.lastName
          }`}
        />
      </div>
    )}
    {reviews[0] && (
      <div className="relative-container">
        <Link className="absolute-content" to={`/reviews/${uid}`} />
        <ReviewBox
          title="Last review"
          userImageURL={reviews[0].authorData.profileImageUrl}
          name={reviews[0].authorData.companyName}
          quote={reviews[0].message}
        />
      </div>
    )}
  </React.Fragment>
);

PhotographerContent.propTypes = {
  photographerData: PropTypes.object.isRequired
};
