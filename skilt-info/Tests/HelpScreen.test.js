import React from "react";
import renderer from "react-test-renderer";

import HelpScreen from "../screens/HelpScreen";

describe("<HelpScreen />", () => {
    it("Has 1 child", () => {
        const tree = renderer.create(<HelpScreen />).toJSON();
        expect(tree.children.length).toBe(2);
    });
    it('Renders correctly', () => {
        const tree = renderer.create(<HelpScreen />).toJSON();
        expect(tree).toMatchSnapshot();
      });
   });