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
    const [dark, setDark] = useState(false);
    const [selected, setSelected] = useState('Enkel');


    const read = require("../settings/filters.json");

    useEffect( () => {
        firstRun();
    },[]);

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

    const firstRun = async () => {
        if (await AsyncStorage.getItem('filters', res => res === null)) {
            await AsyncStorage.setItem('filters', JSON.stringify(read));
        }

        if (await AsyncStorage.getItem('standard', res => res === null)) {
            await AsyncStorage.setItem('standard', 'Enkel');
        }};

    const setFilter = async filter => {
        await AsyncStorage.setItem('standard', filter)
      setSelected(filter);
    };


    const fillArray = () => {
        return (
            <View>
            <View><TouchableOpacity style={{backgroundColor: selected === 'Enkel' ? '#6e3b6e' : '#f9c2ff' }} onPress={() => setFilter('Enkel')}><Text style={styles.content}>Enkel</Text></TouchableOpacity></View>
            <View><TouchableOpacity style={{backgroundColor: selected === 'Avansert' ? '#6e3b6e' : '#f9c2ff' }} onPress={() => setFilter('Avansert')}><Text style={styles.content}>Avansert</Text></TouchableOpacity></View>
                <FlatList
                    data={data}
                    renderItem={({item}) => {
                        return (
                            <SettingsFilters
                                selectorStyle={{backgroundColor: selected === item ? '#6e3b6e' : '#f9c2ff' }}
                                selector={() => setFilter(item)}
                                textStyle={styles.content}
                                deleteButton={() => deleteFilter(item)}
                                sendToEdit={item}
                                text={item}
                                keyExtractor={(item, index) => 'filter' + index}
                                editButton={() =>  props.navigation.navigate('Rediger Filter', {toEdit: item})}
                                extraData={selected}
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
                    AsyncStorage.setItem('filters', JSON.stringify(read))
                }} title={"slett alt"}/>
                <Button onPress={() => AsyncStorage.getItem('standard', (err, res) => console.log(res))} title={"selected"}/>
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