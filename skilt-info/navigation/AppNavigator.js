import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack"
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";

import CameraScreen from "../screens/CameraScreen";
import HelpScreen from "../screens/HelpScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DisplayInformationScreen from "../screens/DisplayInformationScreen";

import Colors from "../Constants/Colors"

const stackNavigator = createStackNavigator({
    Kamera : CameraScreen,
    VisInfo: DisplayInformationScreen
});

const TabNavigator = createBottomTabNavigator({
    Innstillinger: {
        screen: SettingsScreen,
        navigationOptions: {
            tabBarIcon: <Feather name="settings" size={35}></Feather>
        }
    },
    Kamera: {
        screen: stackNavigator,
        navigationOptions: {
            tabBarIcon: <AntDesign name="camerao" size={35}></AntDesign>
        }
    },
    Hjelp: {
        screen: HelpScreen,
        navigationOptions: {
            tabBarIcon: <MaterialIcons name="help-outline" size={35}></MaterialIcons>
        }
    }
},
{   initialRouteName: "Kamera",
    tabBarOptions: {
        activeTintColor: Colors.secondaryColor,
        inactiveBackgroundColor: Colors.primaryColor,
        inactiveTintColor: Colors.accentColor,
        activeBackgroundColor: Colors.primaryColor,
        showIcon: true,
        showLabel: false
    }
});

export default createAppContainer(TabNavigator);