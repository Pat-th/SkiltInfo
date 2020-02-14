import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

import ListLevel from "../components/DisplayInfo/ListLevel"
import ItemInfo from "../components/DisplayInfo/ItemInfo"

const DisplayInformationScreen = props => {
    const [info, setInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    async function fetchData(){
        //Needs new link every time server restarts, create link with ngrok
        console.log("Fetching data...");
        setIsLoading(true)
        const res = await fetch("http://213ce56d.ngrok.io/?lat=63.400854&lon=10.395050&id=7644");
        const result = await res.json();
        console.log("Complete!")
        setIsLoading(false);
        createSimpleView(result);
    }

    const createSimpleView = result => {
        addItem("ID", result[0].id);
        addItem("Direkte Link", result[0].href);
        addItem("Start Dato", result[0].metadata.startdato);
        addItem("Sist Modifisert", result[0].metadata.sist_modifisert);
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