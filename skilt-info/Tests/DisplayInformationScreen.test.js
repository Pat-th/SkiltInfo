import React from "react";
import renderer from "react-test-renderer";

import DisplayInformationScreen from "../screens/DisplayInformationScreen";

describe("<DisplayInformationScreen />", () => {
    it("has 1 child", () => {
        const tree = renderer.create(<DisplayInformationScreen />).toJSON();
        expect(tree.children.length).toBe(1);
    });
    it('renders correctly', () => {
        const tree = renderer.create(<DisplayInformationScreen />).toJSON();
        expect(tree).toMatchSnapshot();
      });
   });