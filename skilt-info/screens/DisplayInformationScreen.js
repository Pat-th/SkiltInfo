import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

import ListLevel from "../components/DisplayInfo/ListLevel"
import ItemInfo from "../components/DisplayInfo/ItemInfo"

const DisplayInformationScreen = props => {
    const [info, setInfo] = useState([]);
    const [error, setError] = useState(false);


    async function fetchData(){
        const result = props.navigation.state.params.result;
        createSimpleView(result);
    }

    const createSimpleView = result => {
        if(typeof result[0] === "undefined"){
            setError(true);
        }else{
            addItem("ID", result[0].id);
            addItem("Direkte Link", result[0].href);
            addItem("Start Dato", result[0].metadata.startdato);
            addItem("Sist Modifisert", result[0].metadata.sist_modifisert);
        }
    }

    const addItem = (id, value) => {
        setInfo(item => [
          ...item,
          { id: id, value: value }]);
      }

    useEffect(() => {
        fetchData();
    }, [])

    if(error){
        return(
            <View style={styles.errorContainer}>
                <Text>Vi fant desverre ingen passende skilt på denne strekningen</Text>
            </View>
        )
    }

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
      },
      errorContainer: {
          flex: 1
      }
});

export default DisplayInformationScreen;