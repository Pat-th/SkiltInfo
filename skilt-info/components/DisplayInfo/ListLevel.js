import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LevelOne = props => {
    return(
        <View style={styles.itemContainer}>
            <Text>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: "#ccc",
        borderColor: "black",
        borderWidth: 1
      }
});

export default LevelOne;