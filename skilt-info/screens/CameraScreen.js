import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = props => {
    const [hasPermission, setHasPermission] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [long, setLong] = useState(null);
    const [lat, setLat] = useState(null);

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      async function fetchAndNavigate(){
        setIsLoading(true);
        getLatLong();
        console.log("Fetching data...");
        //Needs new link every time server restarts, create link with ngrok
        const res = await fetch("http://760f47c2.ngrok.io/?lat=63.400854&lon=10.395050&id=7644");
        const result1 = await res.json();
        console.log("Complete!!!");
        setResult(result1);
        console.log("Latitude: " + lat);
        console.log("Longitude: " + long);
        setIsLoading(false);
        props.navigation.navigate("VisInfo", { result: result })
    }

    const getLatLong = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setLat(latitude);
                setLong(longitude);
            }
        )
    }

      if (hasPermission === null) {
        return(
            <View style={styles.cameraContainer}>
                <Text>Har ikke tilgang til kamera</Text>
            </View>
        );
      }
      if (hasPermission === false) {
        return <Text>Har ikke tilgang til kamera</Text>;
      }

    const CameraView = props => {
        if(isLoading){
            return(
                <View style={styles.container} onPress={() => console.log("clicked cameraContainer")}>
                    <View style={styles.loadingSpinner}>
                            <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                </View>
            )
        }else{
            return(
                <View style={styles.cameraContainer} onPress={() => console.log("clicked cameraContainer")}>
                    <Camera style={styles.camera}>
                        <View style={styles.nonClickable} onPress={() => console.log("clicked nonClickable")}>
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => fetchAndNavigate()}>
                                <View style={styles.captureBtn}>
        
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }

    return(
            <CameraView/>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "flex-start"
    },
    cameraContainer: {
        flex: 1,
        justifyContent: "center",
      },
      camera: {
        flex: 1,
      },
      captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#FFFFFF"
    },
    nonClickable: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "center"
    },
    buttonContainer: {
        flex: 0.1,
        alignSelf: "flex-end",
        alignItems: "center",
        justifyContent: "center",
        margin: 20
    },
    loadingSpinner: {
        alignSelf: "center"
        
    }
});

export default CameraScreen;