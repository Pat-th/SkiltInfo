import React from "react";
import renderer from "react-test-renderer";

import MapSignPicker from "../components/MapSignPicker";

jest.mock('react-native-maps', () => {
    const { View } = require('react-native');
    const MockMapView = (props: any) => {
      return <View>{props.children}</View>;
    };
    const MockMarker = (props: any) => {
      return <View>{props.children}</View>;
    };
    return {
      __esModule: true,
      default: MockMapView,
      Marker: MockMarker,
    };
  });

describe("<MapSignPicker />", () => {
    it("Has 2 children", () => {
        const tree = renderer.create(<MapSignPicker />).toJSON();
        expect(tree.children.length).toBe(2);
    });
    it('Renders correctly', () => {
        const tree = renderer.create(<MapSignPicker />).toJSON();
        expect(tree).toMatchSnapshot();
      });
   });