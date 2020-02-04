import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const DisplayInformationScreen = props => {
    const [data, setData] = useState("")
    const [hasErrors, setHasErrors] = useState(false);


    async function fetchData(){
        const res = await fetch("http://24d0f727.ngrok.io/?id=85404247");
        res
        .json()
        .then(res => setData(res))
        .catch(err => setHasErrors(true));
    }

    useEffect(() => {
        fetchData();
    })


    
    getData = () => {
        console.log(data);
    }

    return(
        <View style={styles.container}>
            <Text>This is the DisplayInformationScreen!</Text>
            <Button title="Get data" onPress={() => getData()}></Button>
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