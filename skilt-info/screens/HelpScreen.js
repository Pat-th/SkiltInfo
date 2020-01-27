import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HelpScreen = props => {
    return(
        <View style={styles.container}>
            <Text>This is the help screen!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
});

export default HelpScreen;