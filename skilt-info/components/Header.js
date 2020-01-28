import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from "../Constants/Colors"

const Header = props => {
    return(
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 80,
        paddingTop: 36,
        backgroundColor: Colors.primaryColor,
        alignItems: "center",
        justifyContent: "center"
    },
    headerTitle: {
        color: Colors.accentColor,
        fontSize: 18
    }
});


export default Header;