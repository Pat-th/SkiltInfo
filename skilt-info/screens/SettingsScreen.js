import React, {useEffect, useState} from 'react';
import {AsyncStorage, Button, FlatList, Image, StyleSheet, Switch, Text, TouchableOpacity, View, Alert,} from 'react-native';
import Collapsed from "../components/Collapsed";
import SettingsFilters from "../components/SettingsFilters";


const SettingsScreen = props => {
    let filters = ['hei', 'ho'];
    const [data, setData] = useState([]);
    const [dark, setDark] = useState(false);
    const [selected, setSelected] = useState('Enkel');

    const read = require("../settings/filters.json");
    const enkel = require("../settings/enkel.json");
    const avansert = require("../settings/avansert.json");
    const fullstendig = require("../settings/fullstendig.json");

    useEffect(() => {
        getData();
    }, [filters]);

    const getData = async () => {
        filters = [];
        await firstRun();
        let storage = await AsyncStorage.getItem('filters');
        let parse = await JSON.parse(storage);
        if(parse.filters.length > 3) {
            for (var i = 3; i < parse.filters.length; i++) {
                filters.push(
                    parse.filters[i]
                );
            }
        }
        setData(filters);
    };

    const firstRun = async () => {
        await AsyncStorage.getItem('filters', (err, res) => {
            if (res == null){
                AsyncStorage.setItem('filters', JSON.stringify(read));
            }});

        await AsyncStorage.getItem('standard', (err, res) => {
            if(res == null) {
                AsyncStorage.setItem('standard', 'Enkel');
        }});

        await AsyncStorage.getItem('Enkel', (err, res) => {
            if(res == null) {
                AsyncStorage.setItem('Enkel', JSON.stringify(enkel));
            }});

        await AsyncStorage.getItem('Avansert', (err, res) => {
            if(res == null) {
                AsyncStorage.setItem('Avansert', JSON.stringify(avansert));
            }});

        await AsyncStorage.getItem('Fullstendig', (err, res) => {
            if(res == null) {
                AsyncStorage.setItem('Fullstendig', JSON.stringify(fullstendig));
            }});
        let standard = await AsyncStorage.getItem('standard');
        await setSelected(standard);
    };

    const setFilter = async filter => {
        await AsyncStorage.setItem('standard', filter);
        setSelected(filter);
    };

    const goToAddNew = () => {
        props.navigation.navigate('Nytt Filter')
    };

    const deleteAlert = filterGettingDeleted => {
        Alert.alert(
            'Sletting av filter',
            'Er du sikker du vil slette dette filteret?'    ,
            [{text: 'Avbryt', style: 'cancel'},
                {text: 'SLETT', onPress: () => deleteFilter(filterGettingDeleted)}]
        )

    };

    const deleteFilter = async (filterGettingDeleted) => {
        filters = [];
        const filter = await AsyncStorage.getItem('filters');
        let string = await JSON.parse(filter);

        let index = string.filters.indexOf(filterGettingDeleted);

        if (index > -1) {
            string.filters.splice(index, 1);
        }
        let stringify = JSON.stringify(string);
        //let split = stringify.substring(1, stringify.length - 1);
        await AsyncStorage.setItem('filters', stringify);
        await AsyncStorage.removeItem(filterGettingDeleted);
        for (var i = 3; i < string.filters.length; i++) {
            filters.push(
                string.filters[i]
            );
        }
        if(filterGettingDeleted === selected){
            await setFilter('Enkel')
        }
        setData(filters);
    };

    const fillArray = () => {
        return (
            <View>
                <View><TouchableOpacity style={{backgroundColor: selected === 'Enkel' ? '#6e3b6e' : '#f9c2ff'}}
                                        onPress={() => setFilter('Enkel')}><Text
                    style={styles.content}>Enkel</Text></TouchableOpacity></View>
                <View><TouchableOpacity style={{backgroundColor: selected === 'Avansert' ? '#6e3b6e' : '#f9c2ff'}}
                                        onPress={() => setFilter('Avansert')}><Text
                    style={styles.content}>Avansert</Text></TouchableOpacity></View>
                <View><TouchableOpacity style={{backgroundColor: selected === 'Fullstendig' ? '#6e3b6e' : '#f9c2ff'}}
                                        onPress={() => setFilter('Fullstendig')}><Text
                    style={styles.content}>Fullstendig</Text></TouchableOpacity></View>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => {
                        return (
                            <SettingsFilters
                                selectorStyle={{backgroundColor: selected === item ? '#6e3b6e' : '#f9c2ff'}}
                                selector={() => setFilter(item)}
                                textStyle={styles.content}
                                deleteButton={() => deleteAlert(item)}
                                sendToEdit={item}
                                text={item}
                                editButton={() => props.navigation.navigate('Rediger Filter', {toEdit: item})}
                                extraData={selected}
                            />)
                    }}
                />
                <View>
                    <TouchableOpacity onPress={() => goToAddNew()}>
                        <Text>Legg til nytt filter</Text>
                        <Image source={require('../images/plus.png')} style={styles.plusicon}/>
                    </TouchableOpacity>
                </View>
            </View>)
    };

    return (
        <View>
            <Collapsed
                TitleStyle={styles.headerText}
                titleOfCollapsible={"Filter"}
                contentOfCollapsible={fillArray()}
            />
            <View style={styles.container}>
                <Text style={styles.headerText}>Nattmodus</Text>
                <Switch style={styles.switchbutton} onValueChange={() => setDark(!dark)} value={dark}/>
            </View>
            <Button onPress={async () => await AsyncStorage.getItem('filters', (err, res) => console.log(res))}
                    title={"fetch"}/>
            <Button onPress={async () => {
                await AsyncStorage.clear();
            }} title={"slett alt"}/>
            <Button onPress={() => AsyncStorage.getItem('standard', (err, res) => AsyncStorage.getItem(res, (err, result) => console.log(result)))}
                    title={"selected"}/>
        </View>
    )
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

});

export default SettingsScreen;