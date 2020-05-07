import React from "react";
import renderer from "react-test-renderer";

import ItemInfo from "../components/DisplayInfo/ItemInfo";

describe("<ItemInfo />", () => {
    it("Has 2 children", () => {
        const tree = renderer.create(<ItemInfo />).toJSON();
        expect(tree.children.length).toBe(2);
    });
    it('Renders correctly', () => {
        const tree = renderer.create(<ItemInfo />).toJSON();
        expect(tree).toMatchSnapshot();
      });
   });