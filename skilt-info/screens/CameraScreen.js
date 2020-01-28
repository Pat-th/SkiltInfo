import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Header from "../components/Header"

const CameraScreen = props => {
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      if (hasPermission === null) {
        return(
            <View style={styles.cameraContainer}>
                <Text>Har ikke tilgang til kamera</Text>
            </View>
        );
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }

    return(
        <View style={styles.cameraContainer} onPress={() => console.log("clicked cameraContainer")}>
            <Header title="Kamera"></Header>
            <Camera style={styles.camera}>
                <View style={styles.nonClickable} onPress={() => console.log("clicked nonClickable")}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => console.log("Ta bilde")}>
                        <View style={styles.captureBtn}>

                        </View>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
      },
      camera: {
        flex: 1
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
    }
});

export default CameraScreen;