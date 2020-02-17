import React from "react";
import renderer from "react-test-renderer";

import CameraScreen from "../screens/CameraScreen";

describe("<CameraScreen />", () => {
    it("has 1 child", () => {
        const tree = renderer.create(<CameraScreen />).toJSON();
        expect(tree.children.length).toBe(1);
    });
    it('renders correctly', () => {
        const tree = renderer.create(<CameraScreen />).toJSON();
        expect(tree).toMatchSnapshot();
      });
   });