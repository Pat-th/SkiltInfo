import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import SignPicker from "../components/SignPicker";

const CameraScreen = props => {
    const [hasPermission, setHasPermission] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isChooseMode, setIsChooseMode] = useState(false);
    const [signsData, setSignsData] = useState(null);
    const [navigation, setNavigation] = useState(null);
    const [picture, setPicture] = useState(null);
    let camera;
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
          let res = await fetch("http://6ab48ec4.ngrok.io/?lat="+latitude+"&lon="+longitude+"&id=7649");
          console.log("http://6ab48ec4.ngrok.io/?lat="+latitude+"&lon="+longitude+"&id=7649");
          let data = await res.json();
          setIsLoading(false);
          let numofSigns = Object.keys(data).length;
          console.log("Number of signs: " + numofSigns);
          return data;
      }

    const getPosSuccess = position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetchSign(latitude, longitude)
      .then(data => setSignsData(data));
      setIsChooseMode(true);
      /*fetchSign("63.3610845", "10.3932593")
      .then(data => props.navigation.navigate("VisInfo", { result: data }));*/
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
      //console.log(props.navigation);
      console.log(camera);
      setNavigation(props.navigation)
      navigator.geolocation.getCurrentPosition(
        getPosSuccess, getPosError, options
    )
    }

    const cameraButtonHandler = () => {
      takePicture()
      .then(photo => console.log(photo));
      getLatLong();
    }

    const cancelHandler = () => {
      setIsChooseMode(false);
    }

    const signChosenHandler = () => {
      //navigate to diplayinformationscreen
      console.log("Sign chosen!");
    }

    async function takePicture(){
      if (camera) {
        const options = { quality: 0.5 }
        let photo = await camera.takePictureAsync(options);
        console.log(photo);
        setPicture(photo);
        return photo;
      }
      else{
        console.log("no camera");
      }
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
                    <Camera style={styles.camera} ref={ref => {camera = ref;}}>
                    <SignPicker 
                    visible={isChooseMode} 
                    onCancel={cancelHandler} 
                    onSignChosen={signChosenHandler} 
                    data={signsData}
                    navigation = {navigation}></SignPicker>
                        <View style={styles.nonClickable} onPress={() => console.log("clicked nonClickable")}>
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => takePicture().then(() => getLatLong())}>
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