import React, {useState} from 'react';
import {ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View, Button, AsyncStorage,} from 'react-native';
import Colors from "../Constants/Colors"
import Collapsed from "../components/Collapsed";

const SettingsScreen = props => {
    const read = require("../settings/filters.json");
    if(AsyncStorage.getItem('filters') == null){
        AsyncStorage.setItem('filters', JSON.stringify(read));
    }
    let filters = ['hei', 'ho'];

    async function setStorage(){
        let storage = await AsyncStorage.getItem('filters');
        let parse = await JSON.parse(storage);
        for (var i in parse.filters) {
            filters.push(
                parse.filters[i]
            );
        }
        console.log(filters);
        return filters;
    }

    return(
        <View>
            <Collapsed
                titleOfCollapsible={"Filter"}
                contentOfCollapsible={filters.map((info, i) => <View style={styles.container} key={i}><TouchableOpacity><Text key={i} style={styles.content}>{info}</Text></TouchableOpacity><Button  onPress={() => console.log(filters[i])} title={"Verdi"}/></View>)}
            />
            <Text style={styles.headerText}>Nattmodus</Text><Switch style={styles.switchbutton}/>
            <Button onPress={() => props.navigation.navigate('NyttFilter')} title={"Neste"}/>
            <Button onPress={async () => await AsyncStorage.getItem('filters', (err, res) => console.log(res))} title={"fetch"}/>
            <Button onPress={async () => {await AsyncStorage.clear(); AsyncStorage.setItem('filters', JSON.stringify(read))}} title={"slett alt"}/>
            <Button onPress={() => console.log(filters)} title={"array"}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
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
        left: 100,
    },

});

export default SettingsScreen;