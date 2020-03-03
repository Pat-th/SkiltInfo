import React from 'react';
import {ScrollView, View} from 'react-native';
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

    return (
        <View>
            <Header title={'Hjelp'}/>
            <ScrollView>
                <Expandables sections={name}/>
            </ScrollView>
        </View>
    );
};


export default HelpScreen;

