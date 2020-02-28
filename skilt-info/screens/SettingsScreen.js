import React, {useEffect, useState} from 'react';
import {
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
    AsyncStorage,
    FlatList,
} from 'react-native';
import Collapsed from "../components/Collapsed";
import SettingsFilters from "../components/SettingsFilters";


const SettingsScreen = props => {
    let filters = ['hei', 'ho'];
    const [data, setData] = useState([]);


    const read = require("../settings/filters.json");
    if (AsyncStorage.getItem('filters') == null) {
        AsyncStorage.setItem('filters', JSON.stringify(read));
    }


    useEffect(() => {
        getData();
    }, [filters]);

    const getData = async () => {
        filters = [];
        let storage = await AsyncStorage.getItem('filters');
        let parse = await JSON.parse(storage);
        for (var i = 2; i < parse.filters.length; i++) {
            filters.push(
                parse.filters[i]
            );
        }
        setData(filters);
    };


    const fillArray = () => {
        return (
            <View>
            <View><TouchableOpacity><Text>Enkel</Text></TouchableOpacity></View>
            <View><TouchableOpacity><Text>Avansert</Text></TouchableOpacity></View>
                <FlatList
                    data={data}
                    renderItem={({item}) => {
                        return (
                            <SettingsFilters
                                deleteButton={() => deleteFilter(item)}
                                sendToEdit={item}
                                Text={item}
                                editButton={() =>  props.navigation.navigate('Rediger Filter', {toEdit: item})}
                            />)}}
                            />
            <View>
                <TouchableOpacity onPress={() => goToAddNew()}>
                    <Text>Legg til nytt filter</Text>
                    <Image source={require('../images/plus.png')} style={styles.plusicon}/>
                </TouchableOpacity>
            </View>
        </View>)
    };


    const goToAddNew = () => {
        props.navigation.navigate('Nytt Filter')
    };

    const deleteFilter = async (filterGettingDeleted) => {
      filters = [];
        const filter = await AsyncStorage.getItem('filters');
        let string = [await JSON.parse(filter)];

        let index = string[0].filters.indexOf(filterGettingDeleted);

        if(index > -1){
            string[0].filters.splice(index, 1);
        }
        let stringify = JSON.stringify(string);
        let split = stringify.substring(1, stringify.length-1);
        await AsyncStorage.setItem('filters', split);
        await AsyncStorage.removeItem(filterGettingDeleted);
        for (var i = 2; i < string[0].filters.length; i++) {
            filters.push(
                string[0].filters[i]
            );
        }
        setData(filters);
    };


    return (
        <View>
            <ScrollView>
                <Collapsed
                    titleOfCollapsible={"Filter"}
                    contentOfCollapsible={fillArray()}
                />
                <View style={styles.container}>
                    <Text style={styles.headerText}>Nattmodus</Text>
                    <Switch style={styles.switchbutton}/>
                </View>
                <Button onPress={async () => await AsyncStorage.getItem('filters', (err, res) => console.log(res))}
                        title={"fetch"}/>
                <Button onPress={async () => {
                    await AsyncStorage.clear();
                    AsyncStorage.setItem('filters', JSON.stringify(read))
                }} title={"slett alt"}/>
                <Button onPress={() => console.log(data)} title={"data"}/>
            </ScrollView>
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

export default SettingsScreen;