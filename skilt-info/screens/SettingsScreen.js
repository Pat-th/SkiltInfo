import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from "../Constants/Colors"

const SettingsScreen = props => {
    return(
        <View style={styles.container}>
            <View>
                <Text>This is the settings screen!</Text>
            </View>
        </View>
    );
};

SettingsScreen.navigationOptions = () => {
    headerTitle: 'Camera'
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
});

export default SettingsScreen;