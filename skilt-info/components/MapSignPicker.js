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

    useEffect(() => {
        setNavigation(props.navigation);
        setPicture(props.image);
        setLongitude(props.longitude);
        setLatitude(props.latitude);
    });

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
                style={StyleSheet.absoluteFillObject}/>
            </View>
        </Modal>
    );
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