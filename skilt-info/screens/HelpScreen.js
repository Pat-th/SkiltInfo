import React from 'react';
import {ScrollView, View} from 'react-native';
import Expandables from "../components/Expandables";
import Header from "../components/Header";

const HelpScreen = () => {
    const name = [
        {
            title: 'Hvordan bruke appen',
            content: 'Ta bilde av et veiskilt fra kamerasiden og vent på at kartet skal åpne seg. Velg så skiltet ditt fra markørene på kartet',
        },
        {
            title: 'Vanlige feil',
            content: 'Unngå å stå i veikryss eller under/på bruer.',
        },
        {
            title: 'Opphavsrett',
            content: 'test',
        }
    ];

    return (
        <View>
            <ScrollView>
                <Expandables sections={name}/>
            </ScrollView>
        </View>
    );
};


export default HelpScreen;

