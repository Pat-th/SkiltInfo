import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, AsyncStorage, ScrollView} from 'react-native';
import FilterSwitches from "../components/FilterSwitches";
import * as Filter from '../functions/EditAndCreateFilter';

const EditFilterScreen = props => {
    const [metadata, setMetadata] = useState(false);
    const [skiltnummer, setSkiltnummer] = useState(false);
    const [ansikt, setAnsikt] = useState(false);

    let settings = [];


    useEffect(() => {
        getData();
    }, []);

    const createArray = () => {
        settings = [];
        Filter.Metadata(settings, metadata);
        Filter.Skiltnummer(settings, skiltnummer);
        Filter.AnsiktssideRettetMot(settings, ansikt);
        return settings;
    };

    const saveEdit = async () => {
        let object = await createArray();
        let string = await JSON.stringify(object);
        await AsyncStorage.setItem(props.navigation.state.params.toEdit, string).then(props.navigation.goBack())
    };


    const getData = async () =>{
        settings = [];
        let storage = await AsyncStorage.getItem(props.navigation.state.params.toEdit, (err, res) => {console.log(res)});
        let parse = await JSON.parse(storage);
        if(parse[0].metadata === true){
            setMetadata(true)
        }

        if(parse[1].Skiltnummer === true){
            setSkiltnummer(true)
        }
        if(parse[2].Ansiktsside === true){
            setAnsikt(true)
        }

    };

    return (
        <View>
            <ScrollView>
            <Text>{props.navigation.state.params.toEdit}</Text>
               <FilterSwitches metadata={metadata} ansikt={ansikt} skiltnummer={skiltnummer}
               setMetadata={setMetadata} setAnsikt={setAnsikt} setSkiltnummer={setSkiltnummer}/>
            </ScrollView>
            <Button onPress={() => saveEdit()} title={"Lagre endringer"}/>
        </View>
    )

};

const styles = StyleSheet.create({

}); export default EditFilterScreen;