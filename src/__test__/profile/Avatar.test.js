import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { Avatar } from "../../components/Avatar";

describe("Avatar", () => {
  it("matches the snapshot", () => {
    const tree = renderer
      .create(
        <Avatar
          userImageUrl="image.jpg"
          classes="premium user-avatar"
          profileLink="user1"
          premium={true}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("does not show premium mark for users that are not premium", () => {
    const shallowAvatar = shallow(
      <Avatar
        userImageUrl="image.jpg"
        classes="premium user-avatar"
        profileLink="user1"
        premium={false}
      />
    );

    expect(shallowAvatar.find(".premium-flag").length).toEqual(0);
  });

  it("does show premium mark for premium users", () => {
    const shallowAvatar = shallow(
      <Avatar
        userImageUrl="image.jpg"
        classes="premium user-avatar"
        profileLink="user1"
        premium={true}
      />
    );

    expect(shallowAvatar.find(".premium-flag").length).toEqual(1);
  });
});
