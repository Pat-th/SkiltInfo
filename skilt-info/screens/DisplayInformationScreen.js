import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage, Button, ActivityIndicator } from 'react-native';

import ListLevel from "../components/DisplayInfo/ListLevel"
import ItemInfo from "../components/DisplayInfo/ItemInfo"

const DisplayInformationScreen = props => {
    const [info, setInfo] = useState([]);
    const [error, setError] = useState(false);

    const read = async result => {
        let fetch = await AsyncStorage.getItem('standard');
        let storage = await AsyncStorage.getItem(fetch);
        let parse = await JSON.parse(storage);
        console.log(fetch);
        console.log(parse);

        if(parse.metadata === true){
            addItem("Start Dato", result.metadata.startdato);
            addItem("Sist Modifisert", result.metadata.sist_modifisert);
            addItem("Navn", result.metadata.type.navn);
            addItem("id", result.metadata.type.id);
        } if(parse.egenskaper.AnsiktssideRettetMot === true) {
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === 1894){
                    addItem("verdi", result.egenskaper[i].verdi);
                    addItem('datatype', result.egenskaper[i].datatype);
                    addItem('enum_id', result.egenskaper[i].enum_id);
                    addItem('navn', result.egenskaper[i].navn);
                    break;
                }
            }
        }
    };


    async function fetchData(){
        const result = props.navigation.state.params.result;
        await read(result);
    }

    const createSimpleView = result => {
        if(typeof result === "undefined"){
            setError(true);
        }else{
            addItem("ID", result.id);
            addItem("Direkte Link", result.href);
            addItem("Start Dato", result.metadata.startdato);
            addItem("Sist Modifisert", result.metadata.sist_modifisert);
        }
    };

    const addItem = (id, value) => {
        setInfo(item => [
          ...item,
          { id: id, value: value }]);
      };

    useEffect(() => {
        fetchData();
    }, []);

    if(error){
        return(
            <View style={styles.errorContainer}>
                <Text>Vi fant desverre ingen passende skilt på denne strekningen</Text>
            </View>
        )
    }

    return(
        <View>
        <FlatList style={styles.list1}
             keyExtractor={(item, index) => item.id}
             data={info}
             renderItem={itemData => <ItemInfo id={itemData.item.id + ":"} value={itemData.item.value}/>} 
          />
          <Button title={'test'} onPress={() => read()}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
      list1: {
        margin: 10
      },
      loadingSpinner: {
          alignSelf: "center"
      },
      errorContainer: {
          flex: 1
      }
});

export default DisplayInformationScreen;