import React from "react";
import { ReviewBox } from "../components/profile/ReviewBox";
import { shallow } from "enzyme";
import { ArrowSVG } from "../components/svg/ArrowSVG";
import { Avatar } from "../components/label/Avatar";

describe("ReviewBox tests", () => {
  const defaultProps = {
    title: "title",
    userImageURL: "userImageUrl",
    name: "name",
    quote: "quote"
  };

  const shallowRender = props =>
    shallow(<ReviewBox {...defaultProps} {...props} />);

  it("is defined", () => {
    const shallowReviewBox = shallowRender();
    expect(shallowReviewBox.find(".review-box")).toBeDefined();
  });

  it("renders the Avatar with the correct image url", () => {
    const imageUrl = "testimage.jpg";
    const shallowReviewBox = shallowRender({ userImageURL: imageUrl });

    expect(shallowReviewBox.find(Avatar).get(0).props.userImageUrl).toEqual(
      imageUrl
    );
  });

  describe("it always renders", () => {
    const shallowReviewBox = shallowRender();
    it("renders once a arrowSvg", () => {
      expect(shallowReviewBox.find(ArrowSVG).length).toBe(1);
    });

    it("renders once a Avatar", () => {
      expect(shallowReviewBox.find(Avatar).length).toBe(1);
    });

    describe("with the text matching the props", () => {
      shallowReviewBox.setProps({ name: "Test Name" });
      it("render the name corectly", () => {
        expect(shallowReviewBox.find("h3.review-author-name").text()).toBe(
          "Test Name"
        );
      });

      shallowReviewBox.setProps({ title: "Test Title" });
      it("render the title corectly", () => {
        expect(shallowReviewBox.find("h2.review-box-title").text()).toBe(
          "Test Title"
        );
      });

      shallowReviewBox.setProps({ quote: "Test Quote" });
      it("render the quote corectly", () => {
        expect(shallowReviewBox.find(".review-author-quote").text()).toBe(
          `“Test Quote”`
        );
      });
    });
  });
});
