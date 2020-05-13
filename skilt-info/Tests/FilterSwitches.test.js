import React from "react";
import renderer from "react-test-renderer";

import FilterSwitches from "../components/FilterSwitches";

describe("<FilterSwitches />", () => {
    it("Has 53 children", () => {
        const tree = renderer.create(<FilterSwitches />).toJSON();
        expect(tree.children.length).toBe(53);
    });
    it('Renders correctly', () => {
        const tree = renderer.create(<FilterSwitches />).toJSON();
        expect(tree).toMatchSnapshot();
      });
   });