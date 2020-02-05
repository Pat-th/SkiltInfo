import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

import ListLevel from "../components/DisplayInfo/ListLevel"
import ItemInfo from "../components/DisplayInfo/ItemInfo"

const DisplayInformationScreen = props => {
    const [info, setInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    async function fetchData(){
        //Needs new link every time server restarts, create link with ngrok
        console.log("Fetching");
        setIsLoading(true)
        const res = await fetch("https://7e6a9218.ngrok.io/?id=85404247");
        const result = await res.json();
        setIsLoading(false);
        createSimpleView(result);
    }

    const createSimpleView = result => {
        addItem("ID", result.id);
        addItem("Direkte Link", result.href);
        addItem("Start Dato", result.metadata.startdato);
        addItem("Sist Modifisert", result.metadata.sist_modifisert);
        console.log(result.metadata.startdato)
    }

    const addItem = (id, value) => {
        setInfo(item => [
          ...item,
          { id: id, value: value }]);
      }

    useEffect(() => {
        fetchData();
    }, [])

    const ListView = props => {
        if(isLoading){
            return(
                <View style={styles.loadingSpinner}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }else{
            return(
                <FlatList style={styles.list1}
                     keyExtractor={(item, index) => item.id}
                     data={info}
                     renderItem={itemData => <ItemInfo id={itemData.item.id + ":"} value={itemData.item.value}/>} 
                  />
            );
        }
    }

    return(
        <View style={styles.container}>
            <ListView></ListView>
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
      }
});

export default DisplayInformationScreen;