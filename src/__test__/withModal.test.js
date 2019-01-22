import React from "react";
import { shallow, render } from "enzyme";
import WithModal from "../RenderProp/WithModal";

describe("WithModal tests", () => {
  it("renders corectly", () => {
    const shallowElement = shallow(
      <WithModal className="test-class" onClick={() => {}}>
        {() => <h2>Test</h2>}
      </WithModal>
    );

    expect(shallowElement.find("h2").text()).toBe("Test");
    expect(shallowElement.hasClass("test-class")).toBe(true);
  });

  describe("Toggeling the modal works correctly", () => {
    it("shows the modal correctly", () => {
      const shallowElement = shallow(
        <WithModal className="test-class">{() => <h2>Test</h2>}</WithModal>
      );
      shallowElement.find(".test-class").simulate("click");
      expect(shallowElement.state().showModal).toBe(true);
    });

    describe("closes the modal corectly, if we pass closeItemClass", () => {
      const shallowElement = shallow(
        <WithModal closeItemClass="close-btn" className="test-class">
          {() => (
            <div>
              <div className="close-btn">X</div>
              <h2>Hello</h2>
            </div>
          )}
        </WithModal>
      );
      shallowElement.setState({ showModal: true });

      it("does not close it , if we click somewhere else", () => {
        //by setting target classlist containst to false => e.target.classlist.contains('something') will be false
        //like we are clicking somewhere else
        shallowElement.find(".test-class").simulate("click", {
          target: { classList: { contains: () => false } }
        });
        expect(shallowElement.state().showModal).toBe(true);
      });

      it("does close it , if we click on the specified element", () => {
        shallowElement.find(".test-class").simulate("click", {
          target: { classList: { contains: () => true } }
        });
        expect(shallowElement.state().showModal).toBe(false);
      });
    });
  });
});
