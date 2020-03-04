import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Clipboard } from 'react-native';
import ItemInfo from "../components/DisplayInfo/ItemInfo";
import Colors from "../Constants/Colors";

const NewDisplayInformationScreen = props => {
    const [info, setInfo] = useState([]);
    const [error, setError] = useState(false);


    async function fetchData(){
        const result = props.navigation.state.params.result;
        createSimpleView(result);
        console.log("IMAGE!!!: " + props.navigation.state.params.image.uri);
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
          width: undefined, 
          height: undefined,
          marginTop: 5,
          marginLeft: 10,
          marginBottom: 5
      },
      buttonView: {
        flex: 1,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5, //Shadow on Android
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10, //Rounded corners
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        backgroundColor: Colors.primaryColor1,
        borderColor: "black",
        borderWidth: 1
      },
      bottomView: {
          flex: 1,
      }
});

export default NewDisplayInformationScreen;