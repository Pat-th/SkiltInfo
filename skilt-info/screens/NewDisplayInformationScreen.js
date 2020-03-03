import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, ShadowPropTypesIOS } from 'react-native';
import ItemInfo from "../components/DisplayInfo/ItemInfo"

const NewDisplayInformationScreen = props => {
    const [info, setInfo] = useState([]);
    const [error, setError] = useState(false);


    async function fetchData(){
        const result = props.navigation.state.params.result;
        createSimpleView(result);
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
        <View style={styles.container}>
            <View style={styles.topView}>
                <View style={styles.imageView}>
                    <Image style={styles.imageStyle} source={{uri: props.navigation.state.params.image.uri}}></Image>
                </View>
                <View style={styles.buttonView}>

                </View>
            </View>
            <View style={styles.bottomView}>
                <FlatList style={styles.list1}
                keyExtractor={(item, index) => item.id}
                data={info}
                renderItem={itemData => <ItemInfo id={itemData.item.id + ":"} value={itemData.item.value}/>} 
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      topView: {
          backgroundColor: "yellow",
          flex: 1,
          flexDirection: "row"
      },
      imageView: {
          backgroundColor: "#fff",
          flex: 1,
      },
      imageStyle: {
          flex: 1,
          borderRadius: 10,
          margin: 5,
          width: undefined, 
          height: undefined,
      },
      buttonView: {
          backgroundColor: "#fff",
          flex: 1
      },
      bottomView: {
          flex: 1,
          margin: 10
      }
});

export default NewDisplayInformationScreen;