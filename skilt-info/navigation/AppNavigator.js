import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack"
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";

import CameraScreen from "../screens/CameraScreen";
import HelpScreen from "../screens/HelpScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DisplayInformationScreen from "../screens/DisplayInformationScreen";
import NewDisplayInformationScreen from "../screens/NewDisplayInformationScreen";

import Colors from "../Constants/Colors"
import CreateNewFilterScreen from "../screens/CreateNewFilterScreen";
import EditFilterScreen from "../screens/EditFilterScreen";

const stackNavigator = createStackNavigator({
    Kamera : CameraScreen,
    VisInfo: NewDisplayInformationScreen
});

const settingsNavigator = createStackNavigator({
    Innstillinger : SettingsScreen,
    'Nytt Filter' : CreateNewFilterScreen,
    'Rediger Filter' : EditFilterScreen,
});
const TabNavigator = createBottomTabNavigator({
    Innstillinger: {
        screen: settingsNavigator,
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