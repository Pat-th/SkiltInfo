import React, {useState} from 'react';
import {Text, View, Button, TextInput, AsyncStorage, Alert,} from 'react-native';
import FilterSwitches from "../components/FilterSwitches";

const CreateNewFilterScreen = props => {
    const [input, setInput] = useState('');
    const [metadata, setMetadata] = useState(false);
    const [skiltnummer, setSkiltnummer] = useState(false);
    const [ansikt, setAnsikt] = useState(false);



    const createFilter = async () =>  {
        let settings = {metadata:  metadata,
            egenskaper:
                {AnsiktssideRettetMot: ansikt,
                    Skiltnummer: skiltnummer},

        };
        let stringSettings = JSON.stringify(settings);
        const filter = await AsyncStorage.getItem('filters');
        let string = await JSON.parse(filter);
        if(input.length < 5 || input.length > 20){
            Alert.alert('Noe gikk galt!',
                'Navnet på filteret må være mellom 5 og 20 tegn!',
                [
                    {text: 'OK'}
                ],
                {cancelable: false},
                );
            return 'Navnet på filteret er ikke mellom 5 og 20 tegn.'
        }
        if(string.filters.includes(input) || input === 'standard' || input === 'filters' || input === 'Enkel' || input === 'Avansert'){
            console.log('Dette filteret eksisterer allerede');
            Alert.alert(
                'Noe gikk galt!',
                'Et annet filter bruker dette navnet',
                [
                    {text: 'OK'}
                ],
            {cancelable: false},
            );
            return 'Dette filteret eksisterer allerede'
        }
        string.filters.push(input);
        let stringify = JSON.stringify(string);
        await AsyncStorage.setItem('filters', stringify);
        await AsyncStorage.setItem(input, stringSettings).then(props.navigation.goBack());
    };

    return (
        <View>
            <Text>Navn:</Text><TextInput onChangeText={text => setInput(text)}
                                         value={input} placeholder={'Trykk her for å skrive inn navn på filter'}/>
            <FilterSwitches metadata={metadata} ansikt={ansikt} skiltnummer={skiltnummer}
                            setMetadata={setMetadata} setAnsikt={setAnsikt} setSkiltnummer={setSkiltnummer}/>
            <Button title={"Lagre"} onPress={() =>createFilter()}/>
        </View>
    )
};

export default CreateNewFilterScreen;