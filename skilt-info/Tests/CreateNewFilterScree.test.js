import React from "react";
import renderer from "react-test-renderer";

import CreateNewFilterScreen from "../screens/CreateNewFilterScreen";

describe("<CreateNewFilterScreen />", () => {
    it("Has 1 child", () => {
        const tree = renderer.create(<CreateNewFilterScreen />).toJSON();
        expect(tree.children.length).toBe(1);
    });
    it('Renders correctly', () => {
        const tree = renderer.create(<CreateNewFilterScreen />).toJSON();
        expect(tree).toMatchSnapshot();
      });
   });