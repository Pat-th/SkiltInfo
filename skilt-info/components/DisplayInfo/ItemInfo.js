import React from 'react';
import { StyleSheet, Text, View, Clipboard, ToastAndroid, Vibration } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from "../../Constants/Colors";

const ItemInfo = props => {

    const longPressHandler = async () => {
        console.log("Long press!");
        await Clipboard.setString(props.id + " " + props.value);
        ToastAndroid.show("Kopiert til utklippstavle", ToastAndroid.SHORT);
        Vibration.vibrate(30);
    }

    return(
        <View>
            <View style={styles.card}>
                <View style={styles.lines}></View>
                <TouchableOpacity onLongPress={() => longPressHandler()}>
                    <View>
                        <Text style={styles.title}>{props.id}</Text>
                        <Text style={styles.value}>{props.value}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.line}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        //Shadow props only work on IOS
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        borderColor: "black",
    },
    title: {
        fontSize: 18
    },
    line: {
        borderBottomColor: "#a38e8c",
        borderBottomWidth: .8,
        marginLeft: 18,
        marginRight: 18,
    }
});

export default ItemInfo;