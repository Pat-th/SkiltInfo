import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput, AsyncStorage, Alert,} from 'react-native';
import FilterSwitches from "../components/FilterSwitches";

const CreateNewFilterScreen = props => {
    const [metadata, setMetadata] = useState(false);
    const [skiltnummer, setSkiltnummer] = useState(false);
    const [ansikt, setAnsikt] = useState(false);

    const [input, setInput] = useState('');

    async function createFilter() {
        let settings = {metadata:  metadata,
            egenskaper:
                {AnsiktssideRettetMot: ansikt,
                    Skiltnummer: skiltnummer},

        };
        let stringSettings = JSON.stringify(settings);
        console.log(stringSettings);
        const filter = await AsyncStorage.getItem('filters');
        let string = await JSON.parse(filter);
        console.log(string);
        if(string.filters.includes(input) || input === 'standard' || input === 'filters' || input === 'Enkel' || input === 'Avansert'){
            console.log('Dette filteret eksisterer allerede');
            Alert.alert(
                'Noe gikk galt!',
                'Et annet filter bruker dette navnet',
                [
                    {text: 'OK', onPress: () => console.log('OK PRESSED')}
                ],
            {cancelable: false},
            );
            return 'Dette filteret eksisterer allerede'
        }
        string.filters.push(input);
        let stringify = JSON.stringify(string);
        //let split = stringify.substring(1, stringify.length-1);
        await AsyncStorage.setItem('filters', stringify);
        await AsyncStorage.setItem(input, stringSettings).then(props.navigation.goBack());
    }

    return (
        <View>
            <Text>Navn:</Text><TextInput onChangeText={text => setInput(text)} value={input}/>
            <FilterSwitches metadata={metadata} ansikt={ansikt} skiltnummer={skiltnummer}
                            setMetadata={setMetadata} setAnsikt={setAnsikt} setSkiltnummer={setSkiltnummer}/>
            <Button title={"Lagre"} onPress={() =>createFilter()}/>
        </View>
    )
};

const style = StyleSheet.create({});

export default CreateNewFilterScreen;