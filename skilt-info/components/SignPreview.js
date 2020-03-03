import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const SignPreview = props => {

    const onPressHandler = () => {
        props.navigation.navigate("Data", { result: props.signItem, image: props.image });
        props.cancel();
    }

    return(
        <View style={styles.itemStyle}>
            <TouchableOpacity onPress={() => onPressHandler()}>
                <Text>{props.id}</Text>
                <Text>{props.oppsettingsdato}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemStyle: {
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "#ccc",
        borderColor: "black",
        borderWidth: 1
      }
});

export default SignPreview;