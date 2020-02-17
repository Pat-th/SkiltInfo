import React from "react";
import renderer from "react-test-renderer";

import ItemInfo from "../components/DisplayInfo/ItemInfo";

describe("<ItemInfo />", () => {
    it("Has 1 child", () => {
        const tree = renderer.create(<ItemInfo />).toJSON();
        expect(tree.children.length).toBe(1);
    });
    it('Renders correctly', () => {
        const tree = renderer.create(<ItemInfo />).toJSON();
        expect(tree).toMatchSnapshot();
      });
   });