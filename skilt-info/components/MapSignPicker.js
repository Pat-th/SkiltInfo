import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import Modal from "react-native-modal";
import SignPreview from "../components/SignPreview";
import MapView, { Marker } from "react-native-maps";

const MapSignPicker = props => {
    const [navigation, setNavigation] = useState(null);
    const [picture, setPicture] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [signData, setSignData] = useState(null);

    useEffect(() => {
        setNavigation(props.navigation);
        setPicture(props.image);
        setLongitude(props.longitude);
        setLatitude(props.latitude);
        setSignData(props.completedata);
    });

    useEffect(() => {
        
    }, [signData])

    if(signData != null && JSON.stringify(signData) != [] && signData != ""){
        //console.log("Complete Signs DATAHA: " + JSON.stringify(signData[0].data.id)); // This will be executed when `numOfSigns` state changes
        return(
          <Modal 
          isVisible={props.visible} 
          onBackButtonPress={props.onCancel} 
          onBackdropPress={props.onCancel}
          animationOutTiming={3000}>
              <View style={styles.contentContainer}>
                  <MapView 
                  initialRegion={{
                      latitude: latitude, 
                      longitude: longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                  }}
                  style={StyleSheet.absoluteFillObject}>
                      {signData.map(marker => (
                          <Marker
                              coordinate = { marker.coords }
                              title = {"ID: " + marker.data.id}
                              />
                      ))
                      }
                  </MapView>
              </View>
          </Modal>
      );
    }
    else{
        return(
            <Modal 
            isVisible={props.visible} 
            onBackButtonPress={props.onCancel} 
            onBackdropPress={props.onCancel}
            animationOutTiming={3000}>
                <View style={styles.contentContainer}>
                    <MapView 
                    initialRegion={{
                        latitude: latitude, 
                        longitude: longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    style={StyleSheet.absoluteFillObject}>
                        {//signData.map(marker => (
                         //   <Marker
                         //       coordinate = { signData.coords.latitude, signData.coords.longitude}
                         //       title = {"HEI"}
                         //       />
                        //))
                        }
                    </MapView>
                </View>
            </Modal>
        );
    }
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10
    },
});

export default MapSignPicker;