import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View, Button, AsyncStorage, Image,} from 'react-native';
import Colors from "../Constants/Colors"
import Collapsed from "../components/Collapsed";

const SettingsScreen = props => {
    let filters = ['hei', 'ho'];
    const [data, setData] = useState([]);


    const read = require("../settings/filters.json");
    if(AsyncStorage.getItem('filters') == null){
        AsyncStorage.setItem('filters', JSON.stringify(read));
    }


    useEffect(() => {
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
        getData();
    }, []);

    useEffect(() => {
        props.navigation.addListener(
            'didFocus',
            payload => {const updateData = async () => {
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
            updateData();
            },
        [])
    });

    const fillArray = () => {
        return(<View>
            <View><TouchableOpacity><Text>Enkel</Text></TouchableOpacity></View>
            <View><TouchableOpacity><Text>Enkel</Text></TouchableOpacity></View>
            {data.map((info, i) => <View style={styles.container} key={i}><TouchableOpacity><Text key={i} style={styles.content}>{info}</Text></TouchableOpacity><Button title={'Slett'}/><Button  onPress={() => console.log(data[i])} title={"Verdi"}/></View>)}
            <View><TouchableOpacity onPress={() => goToAddNew()}><Text>Legg til nytt filter</Text><Image source={require('../images/plus.png')} style={styles.icons}/></TouchableOpacity></View>
        </View>)
    };

    const goToAddNew = () => {
        props.navigation.navigate('NyttFilter')
    };

    return(
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
            <Button onPress={async () => await AsyncStorage.getItem('filters', (err, res) => console.log(res))} title={"fetch"}/>
            <Button onPress={async () => {await AsyncStorage.clear(); AsyncStorage.setItem('filters', JSON.stringify(read))}} title={"slett alt"}/>
            </ScrollView>
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
        position: 'absolute',
        right: 20,
    },
    icons: {
        height: 15,
        width: 15,
        position: 'absolute',
        right: 10,
    }

});

export default SettingsScreen;