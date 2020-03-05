import React from "react";
import renderer from "react-test-renderer";

import SettingsScreen from "../screens/SettingsScreen";

describe("<SettingsScreen />", () => {
    it("Has 5 children child", () => {
        const tree = renderer.create(<SettingsScreen />).toJSON();
        expect(tree.children.length).toBe(5);
    });
    it('Renders correctly', () => {
        const tree = renderer.create(<SettingsScreen />).toJSON();
        expect(tree).toMatchSnapshot();
      });
   });