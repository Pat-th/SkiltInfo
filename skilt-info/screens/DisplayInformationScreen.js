import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import LevelOne from "../components/DisplayInfo/LevelOne"

const DisplayInformationScreen = props => {
    const [data, setData] = useState("")
    const [hasErrors, setHasErrors] = useState(false);
    const [levelOneItems, setLevelOneItems] = useState();
    const [levelTwoObjects, setLevelTwoObjects] = useState([]);
    const [levelThreeObjects, setLevelThreeObjects] = useState([]);


    async function fetchData(){
        //Needs new link every time server restarts, create link with ngrok
        console.log("Fetching");
        const res = await fetch("http://8053823f.ngrok.io/?id=85404247");
        const result = await res.json();
        //console.log(result);
        setLevelOneItems(Object.keys(result));
        console.log(levelOneItems);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <View style={styles.container}>
            <Text>This is the DisplayInformationScreen!</Text>
            <Button title="Get data"></Button>
            <FlatList
                keyExtractor={(item, index) => index}
                data={levelOneItems}
                renderItem={({item}) => <Text>{item}</Text>} 
          />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
});

export default DisplayInformationScreen;