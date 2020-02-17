import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Expandables from "../components/Expandables";
import Header from "../components/Header";




const HelpScreen = () => {
    const name = [
        {
            title: 'Hvordan bruke appen',
            content: 'Trykk på kameraknappen på bunnen av appen. Trykk på sirkelen rett over kameraknappen. Du vil så få et valg over',
        },
        {
            title: 'Vanlige feil',
            content: 'Unngå å stå i veikryss eller under/på bruer.',
        },
        {
            title: 'Opphavsrett',
            content: 'test',
        },
        {
            title: 'Heisann Patrick',
            content: 'heihei',
        }
    ];
    const [location, setLocation] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify('latitude: ' + position.coords.latitude + ' longitude: ' + position.coords.longitude);
                setLocation(location);
            },
            error => Alert.alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
        )
    };

    const getLat = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                setLatitude(lat);
            }
            )
    };

    const getLong = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const long = position.coords.longitude;
                setLongitude(long);
            }
        )
    };

    return (
        <View>
            <Header title={'Hjelp'}/>
            <ScrollView>
                <Expandables sections={name}/>
                <TouchableOpacity onPress={() => {
                    getLat();
                    getLong();
                    console.log(findCoordinates())
                }}>
                    <Text>Find my coords</Text>
                    <Text>Location: {latitude + ' ' + longitude}</Text>
                    <Text>{location}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};


export default HelpScreen;

