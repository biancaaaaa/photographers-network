import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import {BrowserRouter as Router} from "react-router-dom";
import {PhotographerList} from '../contents/company/dashboard/PhotographerList';
import {Photographer} from "../contents/company/dashboard/Photographer";

import makeUser from "./mockUser";

describe("Photographer tests", () => {
  let photographer = makeUser({type: "photographer"});
  const shallowRender = () => shallow(<PhotographerList photographers={[photographer]}/>);

  describe("renders correctly with one photographer passed", () => {
    const shallowPhotographerList = shallowRender();
    it("renders one photographer", () => {
      expect(shallowPhotographerList.find(Photographer).length).toBe(1);
    });

    it("renders right content of photographer", () => {
      const tree = renderer
        .create(
          <Router>
            <Photographer
              {...photographer}
            />
          </Router>
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe("renders loading correctly", () => {
    const shallowPhotographerList = shallowRender();
    shallowPhotographerList.setProps({photographers: undefined});
    it("shows loading, when data is undefined", () => {
      expect(shallowPhotographerList.find(".loading").length).toBe(1);
    });
  });

  describe("renders empty list correctly", () => {
    const shallowPhotographerList = shallowRender();
    shallowPhotographerList.setProps({photographers: null});
    it("shows element for no photographers", () => {
      expect(shallowPhotographerList.find(".no-data").length).toBe(1);
    });
  });
});
