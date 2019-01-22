import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";

import makeUser from "../mockUser";
import { shallow } from "enzyme";
import { ProfileContent } from "../../contents/shared/profile/ProfileContent";

describe("ProfileContent", () => {
  let currentUserData = makeUser({ type: "photographer" });

  let currentUserId = currentUserData.uid;
  let otherUser = false;
  let finishedJobs = 0;
  let thisProfileData = makeUser({ type: "photographer", uid: "aaa" });
  const shallowRender = props =>
    shallow(
      <ProfileContent
        thisProfileData={thisProfileData}
        currentUserData={currentUserData}
        currentUserId={currentUserId}
        otherUser={otherUser}
        finishedJobs={finishedJobs}
        {...props}
      />
    );

  // it("renders corectly", () => {
  //   const tree = renderer
  //     .create(
  //       <Router>
  //         <ProfileContent
  //           thisProfileData={thisProfileData}
  //           currentUserData={currentUserData}
  //           currentUserId={currentUserId}
  //           otherUser={otherUser}
  //           finishedJobs={finishedJobs}
  //         />
  //       </Router>
  //     )
  //     .toJSON();

  //   expect(tree).toMatchSnapshot();
  // });

  describe("renders correctly the profile name", () => {
    it("shows correctly for photographers", () => {
      const shallowElPhotographer = shallowRender();
      expect(shallowElPhotographer.find(".profile-name").text()).toBe(
        thisProfileData.firstName + " " + thisProfileData.lastName
      );
    });

    it("shows correctly for companies", () => {
      const companyData = {
        ...currentUserData,
        type: "company",
        companyName: "Z.co",
        firstName: null,
        lastName: null
      };
      const shallowElCompany = shallowRender({
        thisProfileData: companyData
      });
      expect(shallowElCompany.find(".profile-name").text()).toBe(
        companyData.companyName
      );
    });
  });

  describe("shows correctly the hireButton", () => {
    let currentUserData = makeUser({ type: "company" });

    it("shows it if all conditions are filled", () => {
      const photographerData = makeUser({
        type: "photographer",
        hireable: true
      });
      const shallowElement = shallowRender({
        thisProfileData: photographerData,
        currentUserData: currentUserData
      });

      expect(shallowElement.find("HireButton").length).toEqual(1);
    });

    describe("does not show it if", () => {
      it("is not a photographer profile", () => {
        const thisProfileData = makeUser({
          type: "company"
        });
        const shallowElement = shallowRender({
          thisProfileData: thisProfileData,
          currentUserData: currentUserData
        });

        expect(shallowElement.find("HireButton").length).toEqual(0);
      });

      it("current user is not a company", () => {
        currentUserData = makeUser({ type: "photographer" });

        const thisProfileData = makeUser({
          type: "photographer"
        });

        const shallowElement = shallowRender({
          thisProfileData: thisProfileData,
          currentUserData: currentUserData
        });

        expect(shallowElement.find("HireButton").length).toEqual(0);
      });

      it("this profile user is a photographer but has hireable=false", () => {
        thisProfileData = makeUser({ type: "photographer", hireable: false });

        const shallowElement = shallowRender({
          thisProfileData: thisProfileData,
          currentUserData: currentUserData
        });

        expect(shallowElement.find("HireButton").length).toEqual(0);
      });
    });
  });

  describe("shows correctly the edit profile button", () => {
    const shallowElement = shallowRender();

    it("does not show it, if is another user profile", () => {
      shallowElement.setProps({ otherUser: true });
      expect(shallowElement.find("#edit-profile-link").length).toEqual(0);
    });

    it("does show it, if it is your own profile", () => {
      shallowElement.setProps({ otherUser: false });
      expect(shallowElement.find("#edit-profile-link").length).toEqual(1);
    });
  });

  describe("shows correctly aditional informations for company/photographer", () => {
    it("shows correctly for photographer profile", () => {
      const thisProfileData = makeUser({ type: "photographer" });
      const shallowElement = shallowRender({
        thisProfileData: thisProfileData
      });

      expect(shallowElement.find("PhotographerContent").length).toEqual(1);
    });

    it("shows correctly for company profile", () => {
      const thisProfileData = makeUser({ type: "company" });
      const shallowElement = shallowRender({
        thisProfileData: thisProfileData
      });

      expect(shallowElement.find(".company-details").length).toEqual(1);
      expect(shallowElement.find("PhotographerContent").length).toEqual(0);
    });
  });
});
