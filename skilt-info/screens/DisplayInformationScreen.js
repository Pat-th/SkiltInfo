import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

import ListLevel from "../components/DisplayInfo/ListLevel"
import ItemInfo from "../components/DisplayInfo/ItemInfo"

const DisplayInformationScreen = props => {
    const [info, setInfo] = useState([]);


    async function fetchData(){
        //console.log(props);
        const result = props.navigation.state.params.result;
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

    return(
        <FlatList style={styles.list1}
             keyExtractor={(item, index) => item.id}
             data={info}
             renderItem={itemData => <ItemInfo id={itemData.item.id + ":"} value={itemData.item.value}/>} 
          />
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