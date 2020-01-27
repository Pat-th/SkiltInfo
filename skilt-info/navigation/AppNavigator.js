import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import CameraScreen from "../screens/CameraScreen";
import HelpScreen from "../screens/HelpScreen";
import SettingsScreen from "../screens/SettingsScreen";

const TabNavigator = createBottomTabNavigator({
    Kamera: CameraScreen,
    Innstillinger: SettingsScreen,
    Hjelp: HelpScreen
});

export default createAppContainer(TabNavigator);