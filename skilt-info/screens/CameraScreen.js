import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert, AsyncStorage, Button } from 'react-native';
import { Camera } from 'expo-camera';
import SignPicker from "../components/SignPicker";
import MapSignPicker from "../components/MapSignPicker";
import Colors from "../Constants/Colors"
import { withNavigationFocus } from 'react-navigation';
import { utmToLatLon } from "../scripts/utm33ToLatLong";

const CameraScreen = props => {
    const [hasPermission, setHasPermission] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isChooseMode, setIsChooseMode] = useState(false);
    const [signsData, setSignsData] = useState([]);
    const [navigation, setNavigation] = useState(null);
    const [picture, setPicture] = useState(null);
    const [getSignError, setGetSignError] = useState(false);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [geoCoordinates, setGeoCoordinates] = useState([]);
    const [numOfSigns, setNumOfSigns] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);
    const [completeSignData, setCompleteSignData] = useState([]);
    const URL = "http://90c5f10d.ngrok.io";

    let camera;

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const createMarkers = (data) => {
      for(var i = 0; i < numOfSigns; i++){
        console.log("Signs: "+ numOfSigns);
        var point = data[i].geometri.wkt;
        var res = point.replace("POINT Z(", "");
        var res1 = res.replace(")", "");
        console.log(res1);
        var points = res1.split(" ");
        var east = points[0];
        var north = points[1];
        var latlon = utmToLatLon(east, north)
        console.log(latlon);
        setGeoCoordinates(item => [
          ...item,
          latlon]);
        };
        console.log(geoCoordinates);
      };

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

    useEffect(() => {
        console.log("Number of signs: " + numOfSigns); // This will be executed when `numOfSigns` state changes
    }, [numOfSigns])


      async function fetchSign(latitude, longitude){
          setIsLoading(true);
          try{
            let radius = await AsyncStorage.getItem('radius');
            let res = await fetch(URL+"/?lat="+latitude+"&lon="+longitude+"&id=7642&radius="+radius);
            console.log("URL: "+URL+"/?lat="+latitude+"&lon="+longitude+"&id=7642&radius="+radius);
            let data = await res.json();
            setIsLoading(false);
            setHasFetched(true);
            setNumOfSigns(Object.keys(data).length);
            //console.log("Number of signs: " + numofSigns);
            return data;
          }
          catch(err){
            Alert.alert(
              'Feil',
              'Det oppstod en feil ved henting av informasjon, vennligst prøv igjen',
              [
                {text: 'OK', onPress: () => console.log('OK')},
              ],
              {cancelable: false},
            );
            //setGetSignError(true); UNCOMMENT WHEN NVDB UP
            setIsLoading(false);
          }
      };

      useEffect(() => {
        var completeData = [];
        if(hasFetched){
          for(var i = 0; i < numOfSigns; i++){
            //console.log("signsData: " + JSON.stringify("Sign " + i + ": " + signsData[i].geometri.wkt)); // This will be executed when `signsData` state changes
            var point = signsData[i].geometri.wkt;
            if(point.includes("POINT Z")){
              var res = point.replace("POINT Z(", "");
            }
            else{
              var res = point.replace("POINT (", "");
            }
            var res1 = res.replace(")", "");
            //console.log(res1);
            var points = res1.split(" ");
            console.log("----------------------");
            console.log(point);
            console.log(points);
            var east = points[0];
            var north = points[1];
            var latlon = utmToLatLon(east, north)
            console.log(latlon);
            console.log("-----------------------");
            //console.log(latlon);
            var currentSign = signsData[i];
            completeData.push({ coords: latlon, data: currentSign });
          }
          setCompleteSignData(completeData);
        }
    }, [signsData])

    useEffect(() => {
      if(hasFetched){
        //console.log("Complete Signs DATA 0: " + JSON.stringify(completeSignData[0])); // This will be executed when `numOfSigns` state changes
      }
  }, [completeSignData])

    const getPosSuccess = position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
      fetchSign(latitude, longitude)
      .then(data => setSignsData(data))
      if(!getSignError){
        setIsChooseMode(true);
        setGetSignError(false);
      }else{
        setGetSignError(false);
      }
    };

    const getPosError = err => {
      console.log("Error "+ err);
      return(
        <View>
          <Text>Klarte ikke å hente GPS posisjon</Text>
        </View>
      )
    };

    const getLatLong = () => {
      setNavigation(props.navigation)
      navigator.geolocation.getCurrentPosition(
        getPosSuccess, getPosError, options
      )
    };

    const cancelHandler = () => {
      setIsChooseMode(false);
    };

    async function takePicture(){
      if (camera) {
        const options = { quality: 0.5 }
        let photo = await camera.takePictureAsync(options);
        setPicture(photo);
      }
      else{
        console.log("no camera");
      }
    };

    if (hasPermission === null) {
      return(
          <View style={styles.cameraContainer}>
              <Text>Har ikke tilgang til kamera</Text>
          </View>
      );
    }
    else if (hasPermission === false) {
      return <Text>Har ikke tilgang til kamera</Text>;
    }

    const CameraView = props => {
            if (isLoading) {
                return (
                    <View style={styles.container}>
                        <View style={styles.loadingSpinner}>
                            <ActivityIndicator size="large" color={Colors.accentColor1}/>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={styles.cameraContainer}>
                        <Camera style={styles.camera} ref={ref => {
                            camera = ref;
                        }}>
                            <MapSignPicker
                                visible={isChooseMode}
                                onCancel={cancelHandler}
                                data={signsData}
                                completedata = {completeSignData}
                                longitude={longitude}
                                latitude={latitude}
                                image={picture}
                                hasfetched = {hasFetched}
                                navigation={navigation}/>
                            <View style={styles.nonClickable}>
                                <TouchableOpacity style={styles.buttonContainer}
                                                  onPress={() => takePicture().then(() => getLatLong())}>
                                    <View style={styles.captureBtn}/>
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    </View>
                );
            }
    };
    if (props.isFocused) {
        return(
            <CameraView/>
        )
    } else {
        return(
            <Text>Ikke i fokus</Text>
        )
    }
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

export default withNavigationFocus(CameraScreen);