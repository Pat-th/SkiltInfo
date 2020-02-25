import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = props => {
    const [hasPermission, setHasPermission] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [long, setLong] = useState(null);
    const [lat, setLat] = useState(null);

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      async function fetchSign(latitude, longitude){
          setIsLoading(true);
          console.log("latitude and long from new func: "+latitude +" " + longitude);
          let res = await fetch("http://37621dac.ngrok.io/?lat="+latitude+"&lon="+longitude+"&id=7642");
          console.log("http://37621dac.ngrok.io/?lat="+latitude+"&lon="+longitude+"&id=7642");
          let data = await res.json();
          setIsLoading(false);
          return data
      }

    const getPosSuccess = position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetchSign(latitude, longitude)
      .then(data => props.navigation.navigate("VisInfo", { result: data }));
    }
    const getPosError = err => {
      console.log("Error "+ err);
      return(
        <View>
          <Text>Klarte ikke å hente GPS posisjon</Text>
        </View>
      )
    }

    const getLatLong = () => {
      navigator.geolocation.getCurrentPosition(
        getPosSuccess, getPosError, options
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
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => getLatLong()}>
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