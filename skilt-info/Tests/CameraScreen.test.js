import React from "react";
import renderer from "react-test-renderer";

import CameraScreen from "../screens/CameraScreen";


jest.mock('react-navigation', () => ({
    withNavigation: Component => props => (
      <Component navigation={{ navigate: jest.fn() }} {...props} />
    ),
    withNavigationFocus: () => 'withNavigationFocus',
    SafeAreaView: ({ children }) => <>{children}</>,
  }));
  
  afterAll(() => {
    jest.restoreAllMocks();
  });

describe("<CameraScreen />", () => {
    it('Renders correctly', () => {
        const tree = renderer.create(<CameraScreen />).toJSON();
        expect(tree).toMatchSnapshot();
      });
   });