import React, {useState, useEffect} from 'react';
import {StyleSheet, Switch, Text, View, Button, TextInput, AsyncStorage, Alert, ScrollView} from 'react-native';
import FilterSwitches from "../components/FilterSwitches";
import CreateNewFilterScreen from "./CreateNewFilterScreen";

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
        Metadata();
        Skiltnummer();
        AnsiktssideRettetMot();
        return settings;
    };

    const saveEdit = async () => {
        let object = await createArray();
        let string = await JSON.stringify(object);
        console.log(string)
        //let split = string.substring(1, string.length-1);
        await AsyncStorage.setItem(props.navigation.state.params.toEdit, string)
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