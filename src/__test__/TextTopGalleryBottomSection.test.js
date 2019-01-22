import React from "react";
import { TextTopGalleryBottomSection } from "../components/home/TextTopGalleryBottomSection";
import { shallow } from "enzyme";

describe("TextTopGalleryBottomSection tests", () => {
  const shallowRender = props =>
    shallow(<TextTopGalleryBottomSection {...props} />);

  it("always renders a div.section-text", () => {
    const el = shallowRender({ header: "Just test" });
    expect(el.find("div.section-text").length).toBe(1);
  });

  it("header text value matches the value passed", () => {
    const el = shallowRender({ header: "Just test" });
    expect(el.find(".section-header").text()).toBe("Just test");
  });

  describe("paragraph passed", () => {
    const paragraphProp = "My test paragraph";
    const el = shallowRender({ header: "Just test", paragraph: paragraphProp });

    it("display once a paragraph with class of section-paragraph", () => {
      expect(el.find("p.section-paragraph").length).toBe(1);
    });

    it("has the same text value as the prop passed", () => {
      expect(el.find("p.section-paragraph").text()).toBe(paragraphProp);
    });
  });

  describe("children passed", () => {
    const MyMockComponent = <div className="mock" />;
    const el = shallowRender({
      header: "Just test",
      children: MyMockComponent
    });
    it("render the children if passed", () => {
      expect(el.find("div.mock").length).toBe(1);
    });
  });

  describe("optional props not passed", () => {
    const el = shallowRender({ header: "Just test" });

    it("does not render the paragraph", () => {
      expect(el.find("p.section-paragraph").length).toBe(0);
    });
  });
});
