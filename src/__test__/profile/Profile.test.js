import React from "react";

import { Profile } from "../../contents/shared/profile/Profile";
import { shallow } from "enzyme";
import { ProfileCard } from "../../components/ProfileCard";
import { ProfileContent } from "../../contents/shared/profile/ProfileContent";

describe("Profile tests", () => {
  const match = { params: { uid: "fakeid" } }; //the match prop is needed always, so it takes the uid from the link query param
  const shallowRender = props => shallow(<Profile match={match} {...props} />);

  test("Profile it is defined", () => {
    const shallowProfile = shallowRender();
    expect(shallowProfile).toBeDefined();
  });

  describe("it is showing loading correctly", () => {
    const shallowProfile = shallowRender();
    it("shows it if the profileData is not loaded", () => {
      shallowProfile.setProps({ profileData: undefined });
      expect(shallowProfile.find(".loading").length).toBe(1);
    });

    it("shows is if this person data is not loaded", () => {
      const match = { params: { uid: "fakeid" } };
      shallowProfile.setProps({
        profileData: { fakeid: undefined },
        match
      });

      expect(shallowProfile.find(".loading").length).toBe(1);
    });
  });

  it("shows 'no data found' correctly", () => {
    const shallowProfile = shallowRender();
    const match = { params: { uid: "fakeid" } };
    shallowProfile.setProps({
      profileData: { fakeid: null },
      match
    });

    expect(shallowProfile.find(".no-data").length).toBe(1);
  });

  describe("renders correctly with all the props passed", () => {
    //A mock of the props that it will take in a real case;
    let mockProps = {
      match: { params: { uid: "otherUser" } },
      profileData: {
        otherUser: {
          firstName: "z",
          lastName: "z",
          hireable: true,
          locations: {
            "123azE": {
              city: "S",
              country: "Z",
              streetName: "A",
              streetNumber: "83"
            }
          },
          premium: true,
          portfolio: [],
          profileImageUrl: "img.jpg",
          type: "photographer",
          uid: "otherUser"
        }
      },
      currentUserData: {
        firstName: "z",
        lastName: "z",
        hireable: true,
        locations: {
          "123azE": {
            city: "S",
            country: "Z",
            streetName: "A",
            streetNumber: "83"
          }
        },
        premium: true,
        portfolio: [],
        profileImageUrl: "img.jpg",
        type: "photographer",
        uid: "fakeid"
      },
      currentUserId: "fakeid",
      finishedJobs: 0
    };
    let shallowProfile = shallowRender(mockProps);

    it("renders once a ProfileCard", () => {
      expect(shallowProfile.find(ProfileCard).length).toBe(1);
    });

    it("renders once a ProfileContent", () => {
      expect(shallowProfile.find(ProfileContent).length).toBe(1);
    });

    it("pass down correct otherUser prop", () => {
      expect(
        shallowProfile.find(ProfileContent).get(0).props.otherUser
      ).toEqual(true);
    });
  });
});
