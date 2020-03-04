import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack"
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

import CameraScreen from "../screens/CameraScreen";
import HelpScreen from "../screens/HelpScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NewDisplayInformationScreen from "../screens/NewDisplayInformationScreen";

import Colors from "../Constants/Colors"
import CreateNewFilterScreen from "../screens/CreateNewFilterScreen";
import EditFilterScreen from "../screens/EditFilterScreen";
import Icon from "react-native-ionicons";

const IconSize = 30;

const stackNavigator = createStackNavigator({
    Kamera : CameraScreen,
    Data: NewDisplayInformationScreen
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
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <MaterialCommunityIcons name="settings" size={IconSize} />
                : <MaterialCommunityIcons name="settings-outline" size={IconSize} />
             ),
             tabBarLabel: ({ focused }) => (
                 focused
                 ? <View style={styles.labelActive}><Text>Hei</Text></View>
                 : <View style={styles.labelInactive}><Text>på deg</Text></View>
             )
        }
    },
    Kamera: {
        screen: stackNavigator,
        navigationOptions: {
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <AntDesign name="camera" size={IconSize} />
                : <AntDesign name="camerao" size={IconSize} />
             )
        }
    },
    Hjelp: {
        screen: HelpScreen,
        navigationOptions: {
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <Ionicons name="ios-help-circle" size={IconSize} />
                : <Ionicons name="ios-help-circle-outline" size={IconSize} />
             )
        }
    }
},
{   initialRouteName: "Kamera",
    tabBarOptions: {
        //activeTintColor: Colors.primaryColor1,
        //inactiveBackgroundColor: Colors.secondaryColor1,
        inactiveTintColor: Colors.accentColor,
        activeBackgroundColor: Colors.primaryColor,
        showIcon: true,
        showLabel: true,
    }
});

const styles = StyleSheet.create({
    labelInactive: {
        flex: 1,
        alignContent: "center"
    },
    labelInactive: {
        flex: 1,
        alignContent: "center"
    }
});

export default createAppContainer(TabNavigator);