import React from "react";
import renderer from "react-test-renderer";

import { ProfileCard } from "../../components/ProfileCard";

describe("ProfileCard", () => {
  it("renders corectly", () => {
    const tree = renderer
      .create(
        <ProfileCard profileImageUrl={"myFakeImage.jpg"} premium={false} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
