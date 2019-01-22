import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";

import makeUser from "../mockUser";
import { shallow } from "enzyme";
import { PhotographerContent } from "../../contents/photographer/profile/PhotographerContent";

describe("PhotographerContent", () => {
  const photographerData = makeUser({ type: "photographer" });
  const siggnedInUser = makeUser({ type: "company" });

  it("matches the snapshot", () => {
    const tree = renderer
      .create(
        <Router>
          <PhotographerContent
            reviews={[]}
            photographerData={photographerData}
            siggnedInUser={siggnedInUser}
            uid={photographerData.uid}
            finishedJobs={photographerData.finishedJobs}
            hireable={photographerData.hireable}
          />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  const shallowElement = shallow(
    <PhotographerContent
      reviews={[]}
      photographerData={photographerData}
      siggnedInUser={siggnedInUser}
      uid={photographerData.uid}
      finishedJobs={photographerData.finishedJobs}
      hireable={photographerData.hireable}
    />
  );

  it("renders the correct number of finishedJobs", () => {
    expect(shallowElement.find(".flex-container-space .big-num").text()).toBe(
      "0"
    );

    shallowElement.setProps({ finishedJobs: 10 });

    expect(shallowElement.find(".flex-container-space .big-num").text()).toBe(
      "10"
    );
  });

  describe("renders the portofolio correctly, ", () => {
    it("if the photographer have no portfolio data", () => {
      const newPhotographerData = makeUser({
        type: "photographer",
        portfolio: null
      });
      shallowElement.setProps({ photographerData: newPhotographerData });

      expect(shallowElement.find("PortofolioGallery").length).toBe(0);
    });

    it("shows it when photographer have a portfolio", () => {
      const newPhotographerData = makeUser({
        type: "photographer",
        portfolio: []
      });
      shallowElement.setProps({ photographerData: newPhotographerData });

      expect(shallowElement.find("PortofolioGallery").length).toBe(0);
    });

    it("shows nothing if the portfolio is empty", () => {
      const newPhotographerData = makeUser({
        type: "photographer",
        portfolio: ["img1.jpg", "img2.jpg"]
      });
      shallowElement.setProps({ photographerData: newPhotographerData });

      expect(shallowElement.find("PortofolioGallery").length).toBe(1);
    });
  });

  describe("renders the hire button correctly", () => {
    it("shows it , if photographer is hireable and the currentUser is a company", () => {
      const siggnedInUser = makeUser({ type: "company" });
      const photographer = makeUser({ type: "photographer", hireable: true });

      shallowElement.setProps({
        photographerData: photographer,
        siggnedInUser: siggnedInUser,
        hireable: true
      });

      expect(shallowElement.find("HireButton").length).toBe(1);
    });

    it("does not show it , if the photographer is not hireable", () => {
      const siggnedInUser = makeUser({ type: "company" });
      const photographer = makeUser({ type: "photographer", hireable: false });

      shallowElement.setProps({
        photographerData: photographer,
        siggnedInUser: siggnedInUser,
        hireable: false
      });

      expect(shallowElement.find("HireButton").length).toBe(0);
    });

    it("does not show it , if the currentUser is not a company", () => {
      const siggnedInUser = makeUser({ type: "photographer" });
      const photographer = makeUser({ type: "photographer", hireable: true });

      shallowElement.setProps({
        photographerData: photographer,
        siggnedInUser: siggnedInUser,
        hireable: true
      });

      expect(shallowElement.find("HireButton").length).toBe(0);
    });
  });

  describe("Review box", () => {
    it("does not render it , if ther are no reviews", () => {
      expect(shallowElement.find("ReviewBox").exists()).toBe(false);
    });

    it("does render it , if ther are reviews", () => {
      const shallowElementWithReviews = shallow(
        <PhotographerContent
          reviews={[
            {
              title: "Last review",
              authorData: {
                profileImageUrl: "j.jpg",
                companyName: "Test",
                quote: "Test"
              }
            }
          ]}
          photographerData={photographerData}
          siggnedInUser={siggnedInUser}
          uid={photographerData.uid}
          finishedJobs={photographerData.finishedJobs}
          hireable={photographerData.hireable}
        />
      );

      expect(shallowElementWithReviews.find("ReviewBox").exists()).toBe(true);
    });
  });
});

/*
  it("renders the link to project once", () => {
    expect(
      shallowElement.containsMatchingElement(
        <Link to="/dashboard">See the projects</Link>
      )
    ).toBe(true);
  });
*/

/*



*/
