import React, {useEffect, useState} from 'react';
import {AsyncStorage, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Alert, TextInput, Picker} from 'react-native';
import Collapsed from "../components/Collapsed";
import SettingsFilters from "../components/SettingsFilters";
import Colors  from "../Constants/Colors"


const SettingsScreen = props => {
    let filters = ['hei', 'ho'];
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState('Enkel');
    const [radius, setRadius] = useState('500');
    const [selectedSign, setSelectedSign] = useState("7644");


    useEffect(() => {
        getData();
    }, [filters]);

    useEffect(()=> {
        setStates();
    },[]);

    const setStates = async () => {
        let distance = await AsyncStorage.getItem('radius');
        setRadius(distance);
        let signType = await AsyncStorage.getItem('signType');
        setSelectedSign(signType);
    };

    const getData = async () => {
        filters = [];
        let getFilters = await AsyncStorage.getItem('filters');
        let result = await JSON.parse(getFilters);
        if(result.filters.length > 3) {
            for (let i = 3; i < result.filters.length; i++) {
                filters.push(
                    result.filters[i]
                );
            }
        }
        let standard = await AsyncStorage.getItem('standard');
        await setSelected(standard);
        setData(filters);
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
        const getFilters = await AsyncStorage.getItem('filters');
        let parseFilters = await JSON.parse(getFilters);

        let index = parseFilters.filters.indexOf(filterGettingDeleted);

        if (index > -1) {
            parseFilters.filters.splice(index, 1);
        }
        let stringifyFilters = JSON.stringify(parseFilters);
        await AsyncStorage.setItem('filters', stringifyFilters);
        await AsyncStorage.removeItem(filterGettingDeleted);
        for (let i = 3; i < parseFilters.filters.length; i++) {
            filters.push(
                parseFilters.filters[i]
            );
        }
        if(filterGettingDeleted === selected){
            await setFilter('Enkel')
        }
        setData(filters);
    };

    const saveRadius = async () => {
      await AsyncStorage.setItem('radius', radius);
        let storagedRadius = await AsyncStorage.getItem('radius');
        Alert.alert(
          'Du har gjort en endring!',
          'Du har endret radius til: ' + storagedRadius,
          [{text: 'OK', onPress: () => console.log(storagedRadius)}]

      )
    };

    const saveSignType = async signValue => {
        setSelectedSign(signValue);
        console.log(signValue);
        await AsyncStorage.setItem('signType', signValue, (err, res) => console.log(res));
    };

    const onChangeTextInput = (text) => {
        if (/^\d+$/.test(text) || text === '') {
            setRadius(text);
        }
    };

    const fillArray = () => {
        return (
            <View>
                <View style={styles.textbox}><TouchableOpacity style={{backgroundColor: selected === 'Enkel' ? Colors.accentColor1 : 'transparent', borderRadius: 10,}}
                                        onPress={() => setFilter('Enkel')}><Text
                    style={styles.content}>Enkel</Text></TouchableOpacity></View>
                <View style={styles.textbox}><TouchableOpacity style={{backgroundColor: selected === 'Avansert' ? Colors.accentColor1 : 'transparent', borderRadius: 10,}}
                                        onPress={() => setFilter('Avansert')}><Text
                    style={styles.content}>Avansert</Text></TouchableOpacity></View>
                <View style={styles.textbox}><TouchableOpacity style={{backgroundColor: selected === 'Fullstendig' ? Colors.accentColor1 : 'transparent', borderRadius: 10,}}
                                        onPress={() => setFilter('Fullstendig')}><Text
                    style={styles.content}>Fullstendig</Text></TouchableOpacity></View>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => {
                        return (
                            <SettingsFilters
                                selectorStyle={{backgroundColor: selected === item ? Colors.accentColor1 : 'transparent', borderRadius: 10}}
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
                <View style={styles.textbox}>
                    <TouchableOpacity onPress={() => goToAddNew()}>
                        <Text style={styles.content}>Legg til nytt filter</Text>
                        <Image source={require('../images/plus.png')} style={styles.plusicon}/>
                    </TouchableOpacity>
                </View>
            </View>)
    };

    return (
        <View style={styles.bigContainer}>
            <Collapsed
                TitleStyle={styles.headerText}
                titleOfCollapsible={"Filter"}
                contentOfCollapsible={fillArray()}
                viewStyle={{padding: 5}}
            />
            <View style={styles.container}>
                <Text style={styles.headerText}>Radius</Text>
                <View style={styles.radiusgroup}>
                    <TextInput
                    underlineColorAndroid='transparent'
                    keyboardType={'numeric'}
                    value={radius.toString()}
                    style={styles.radiusinput}
                    onChangeText={onChangeTextInput}/>
                    <TouchableOpacity style={styles.save} onPress={() => saveRadius()}><Image source={require('../images/save.png')} style={styles.saveicon}/></TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.headerText}>Skilttype</Text>
                <Picker
                    selectedValue={selectedSign}
                    style={{ height: 50, width: 150, position: "absolute", right: 10 }}
                    onValueChange={(signValue) => saveSignType(signValue)}
                >
                    <Picker.Item label="Forkjørsveg" value="7644" />
                    <Picker.Item label="Vikeplikt" value="7642" />
                    <Picker.Item label="Gangfelt" value="7705" />
                </Picker>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    content: {
        padding: 5,
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
        height: 20,
        width: 20,
        position: 'absolute',
        right: 10,
        marginTop: 4
    },
    saveicon: {
        height: 25,
        width: 25,
        marginTop: 3
    },
    save: {
        margin: 10,
        height: 30,
        width: 50,
        alignItems: 'center'
    },
    textbox: {
        margin: 3,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
    },
    radiusgroup: {
        position: 'absolute',
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    radiusinput: {
        fontSize: 24,
        width: 60,
        borderBottomColor: "#a38e8c",
        borderBottomWidth: 0.8,
        textAlign: 'center',
        height: 30,
    },
    bigContainer: {
        margin: 10
    }
});

export default SettingsScreen;