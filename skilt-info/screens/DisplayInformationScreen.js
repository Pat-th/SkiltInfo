import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DisplayInformationScreen = props => {
    return(
        <View style={styles.container}>
            <Text>This is the DisplayInformationScreen!</Text>
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

export default DisplayInformationScreen;