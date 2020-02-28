import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const SettingsFilters = props => {
    return(
        <View>
        <TouchableOpacity>
            <Text>{props.Text}</Text>
        </TouchableOpacity>
            <View style={styles.buttongrp}>
                <TouchableOpacity onPress={props.deleteButton} title={"Verdi"} style={styles.delete}>
                    <Image source={require('../images/delete.png')} style={styles.deleteicon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>  props.navigation.navigate('Rediger Filter', {toEdit: props.sendToEdit})} style={styles.edit}>
                    <Image source={require('../images/edit.png')} style={styles.editicon}/>
                </TouchableOpacity>
            </View>
        </View>
    )
    /*return (
        <View>
            {data.map((info, i) =>
                <View style={styles.container} key={i}>
                    <TouchableOpacity>
                        <Text key={i} style={styles.content}>{info}</Text>
                    </TouchableOpacity>
                    <View style={styles.buttongrp}>
                        <TouchableOpacity onPress={() => deleteFilter(data[i])} title={"Verdi"} style={styles.delete}>
                            <Image source={require('../images/delete.png')} style={styles.deleteicon}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>  props.navigation.navigate('Rediger Filter', {toEdit: data[i]})} style={styles.edit}>
                            <Image source={require('../images/edit.png')} style={styles.editicon}/>
                        </TouchableOpacity>
                    </View>
                </View>)}
            <View>
                <TouchableOpacity onPress={() => goToAddNew()}>
                    <Text>Legg til nytt filter</Text>
                    <Image source={require('../images/plus.png')} style={styles.plusicon}/>
                </TouchableOpacity>
            </View>
        </View>)*/
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 5,
    },
    content: {
        padding: 5,
        color: 'rgba(0,0,0,1)',
        textAlign: 'left',
    },
    headerText: {
        textAlign: 'left',
        fontSize: 24,
        fontWeight: '500',
        color: 'rgba(0,0,0,1)',
    },
    switchbutton: {
        width: 20,
        height: 15,
        position: 'absolute',
        right: 20,
    },
    plusicon: {
        height: 25,
        width: 25,
        position: 'absolute',
        right: 10,
    },
    deleteicon: {
        height: 30,
        width: 30,
        alignSelf: 'center'
    },
    editicon: {
        height: 30,
        width: 30,
        alignSelf: 'center'
    },
    delete: {
        height: 30,
        width: 60,
        backgroundColor: 'rgb(226,6,0)',
    },
    edit: {
        height: 30,
        width: 60,
        backgroundColor: 'rgb(41,150,255)',
        marginStart: 10,
    },
    buttongrp: {
        position: 'absolute',
        right: 10,
        flexDirection: 'row',
    },

});
export default SettingsFilters;