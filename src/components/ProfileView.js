import React from "react";
import { ProfileCard } from "./ProfileCard";
import { LinkLists } from "./LinkLists";
import { PhotographerContent } from "../contents/photographer/profile/PhotographerContent";
import CompanyContent from "../contents/company/profile/CompanyContent";

export const ProfileView = ({
  isOtherUser,
  thisProfileData,
  pageLinks,
  siggnedInUser
}) => (
  <div className="profile">
    <ProfileCard {...thisProfileData} siggnedInUser={siggnedInUser}>
      {thisProfileData.displayName}
    </ProfileCard>
    <div className="profile-content">
      <LinkLists
        links={pageLinks}
        txtClasses="gb-text-black-opacity-30 gb-subtitle-medium"
        liClasses="footer-nav-item"
      />
    </div>

    {thisProfileData.type === "photographer" ? (
      <PhotographerContent
        photographerData={thisProfileData}
        isOtherUser={isOtherUser}
      />
    ) : (
      <CompanyContent isOtherUser={isOtherUser} />
    )}
  </div>
);
