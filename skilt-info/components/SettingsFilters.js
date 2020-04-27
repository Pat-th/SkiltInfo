import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Colors from "../Constants/Colors"

const SettingsFilters = props => {
    return (
        <View style={styles.textbox}>
            <TouchableOpacity onPress={props.selector} style={props.selectorStyle}>
                <Text style={props.textStyle}>{props.text}</Text>
            </TouchableOpacity>
            <View style={styles.buttongrp}>
                <TouchableOpacity onPress={props.deleteButton} title={"Verdi"} style={styles.delete}>
                    <Image source={require('../images/delete.png')} style={styles.deleteicon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.editButton} style={styles.edit}>
                    <Image source={require('../images/edit.png')} style={styles.editicon}/>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({

    deleteicon: {
        height: 20,
        width: 20,
        alignSelf: 'center',
        marginTop: 2
    },
    editicon: {
        height: 20,
        width: 20,
        alignSelf: 'center',
        marginTop: 2
    },
    delete: {
        height: 25,
        width: 40,
        backgroundColor: Colors.primaryColor1,
        borderRadius: 5, 
        marginTop: 2
    },
    edit: {
        height: 25,
        width: 40,
        backgroundColor: 'rgb(41,150,255)',
        marginStart: 10,
        borderRadius: 5,
        marginTop: 2
    },
    buttongrp: {
        position: 'absolute',
        right: 10,
        flexDirection: 'row',
    },
    textbox: {
        margin: 3,
        borderWidth: 1,
        borderRadius: 10,
    },

});
export default SettingsFilters;