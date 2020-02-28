import React, {useState} from 'react';
import {StyleSheet, Switch, Text, View, Button, TextInput, AsyncStorage, Alert, ScrollView,} from 'react-native';
import FilterSwitches from "../components/FilterSwitches";

const CreateNewFilterScreen = props => {
    const [metadata, setMetadata] = useState(false);
    const [skiltnummer, setSkiltnummer] = useState(false);
    const [ansikt, setAnsikt] = useState(false);

    const [input, setInput] = useState('');

    let settings = [];

    function createArray(){
        settings = [];
        Metadata();
        Skiltnummer();
        AnsiktssideRettetMot();
        return settings;
    }

    async function newFilters() {
      const filter = await AsyncStorage.getItem('filters');
      let string = [await JSON.parse(filter)];
      if(string[0].filters.includes(input)){
          console.log('Dette filteret eksisterer allerede');
          return 'Dette filteret eksisterer allerede'
      }
      string[0].filters.push(input);
      let stringify = JSON.stringify(string);
      let split = stringify.substring(1, stringify.length-1);
      await AsyncStorage.setItem('filters', split);
    }

    async function createFilter() {
        let arr = await createArray();
        let json = await JSON.stringify(arr);
        const filter = await AsyncStorage.getItem('filters');
        let string = [await JSON.parse(filter)];
        if(string[0].filters.includes(input)){
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
            await AsyncStorage.setItem(input, json);
            await newFilters().then(props.navigation.goBack());

    }

    async function getFilter() {
        try {
            const get = await AsyncStorage.getItem(input);
            if(get !== null){
                console.log(get);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const Metadata = () => {
        if(metadata){
            settings.push({"metadata": true});
        } else {
            settings.push({"metadata": false});
        }
    };

    const GeometriPunkt = () => {
    };

    const Skiltnummer = () => {
        if(skiltnummer){
            settings.push({"Skiltnummer": true})
        } else {
            settings.push({"Skiltnummer": false})
        }
    };

    const AnsiktssideRettetMot = () => {
        if(ansikt){
            settings.push({"Ansiktsside": true})
        } else {
            settings.push({"Ansiktsside": false})
        }
    };



    const Oppsettingsdato = () => {
    };


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