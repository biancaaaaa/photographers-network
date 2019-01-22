import React from "react";
import { shallow } from "enzyme";
import Home50hCard from "../components/Home50hCard";
import SignUp from "../contents/shared/sign-up/SignUp";
import renderer from "react-test-renderer";

describe("Home50hCard", () => {
  it("matches snapshot", () => {
    const tree = renderer
      .create(
        <Home50hCard
          backgroundUrl={"e.jpg"}
          titleContent="test title"
          paragraphContent="test paragraph"
          type="photographer"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("expanded state test", () => {
    describe("when is true", () => {
      const wrapper = shallow(
        <Home50hCard
          backgroundUrl={"e.jpg"}
          titleContent="test title"
          paragraphContent="test paragraph"
          type="photographer"
        />
      );
      wrapper.setState({
        expanded: true
      });
      it("renders the SignUp component", () => {
        expect(wrapper.find(SignUp).exists()).toBe(true);
      });
      it("adds the class, expanded to the main wrapper", () => {
        expect(
          wrapper.find(".gb-home-50h-card-wrapper").hasClass("expanded")
        ).toBe(true);
      });
    });

    describe("when is false", () => {
      const wrapper = shallow(
        <Home50hCard
          backgroundUrl={"e.jpg"}
          titleContent="test title"
          paragraphContent="test paragraph"
          type="photographer"
        />
      );
      wrapper.setState({
        expanded: false
      });
      it("does not render the SignUp component", () => {
        expect(wrapper.find(SignUp).exists()).toBe(false);
      });
      it("does not add the class, expanded to the main wrapper", () => {
        expect(
          wrapper.find(".gb-home-50h-card-wrapper").hasClass("expanded")
        ).toBe(false);
      });
    });
  });

  it("changes the state correctly", () => {
    const wrapper = shallow(
      <Home50hCard
        backgroundUrl={"e.jpg"}
        titleContent="test title"
        paragraphContent="test paragraph"
        type="photographer"
      />
    );

    wrapper.setState({ expanded: false });

    //test if the state is false
    expect(wrapper.state("expanded")).toBe(false);
    //call teh expandHandler, which should change the state to the oposite of what it is
    wrapper.instance().expandHandler();
    //check if the state have changed correctly
    expect(wrapper.state("expanded")).toBe(true);
  });
});

/*
  it("always render a round expand button", () => {
    const el = shallowRender();
    expect(el.find(RoundExpandButton).length).toBe(1);
  });

  describe("No props passed", () => {
    const el = shallowRender();
    it("does not render a header", () => {
      expect(el.find("h2.content-box-heading").length).toBe(0);
    });
    it("does not render a paragraph", () => {
      expect(el.find(".content-box-paragraph").length).toBe(0);
    });
  });

  describe("titleContent passed", () => {
    const headerProp = "My amazing Title";
    const el = shallowRender({ titleContent: headerProp });

    it("renders a header", () => {
      expect(el.find("h2.content-box-heading").length).toBe(1);
    });
    it("header has the speciffied value, from props", () => {
      expect(el.find("h2.content-box-heading").text()).toBe(headerProp);
    });
  });

  describe("paragraphContent passed", () => {
    const paragraphProp = "Hello there";
    const el = shallowRender({ paragraphContent: paragraphProp });

    it("renders the paragraph", () => {
      expect(el.find(".content-box-paragraph").length).toBe(1);
    });
    it("paragraph has the text value, from the props", () => {
      expect(el.find(".content-box-paragraph").text()).toBe(paragraphProp);
    });
  });
  */
