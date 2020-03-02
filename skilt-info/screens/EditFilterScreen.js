import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, AsyncStorage, ScrollView} from 'react-native';
import FilterSwitches from "../components/FilterSwitches";

const EditFilterScreen = props => {
    const [metadata, setMetadata] = useState(false);
    const [skiltnummer, setSkiltnummer] = useState(false);
    const [ansikt, setAnsikt] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const saveEdit = async () => {
        let settings = {metadata:  metadata,
            egenskaper:
                {AnsiktssideRettetMot: ansikt,
                    Skiltnummer: skiltnummer},

        };
        let string = await JSON.stringify(settings);
        await AsyncStorage.setItem(props.navigation.state.params.toEdit, string).then(props.navigation.goBack())
    };


    const getData = async () =>{
        let storage = await AsyncStorage.getItem(props.navigation.state.params.toEdit);
        let parse = await JSON.parse(storage);
        if(parse.metadata === true){
            setMetadata(true)
        }

        if(parse.egenskaper.Skiltnummer === true){
            setSkiltnummer(true)
        }
        if(parse.egenskaper.AnsiktssideRettetMot === true){
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