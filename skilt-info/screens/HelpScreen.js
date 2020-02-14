import React, {Component} from 'react';
import {ScrollView, StyleSheet, View,} from 'react-native';
import Expandables from "../components/Expandables";
import Header from "../components/Header";


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

export default class HelpScreen extends Component {


    render() {
        return (
            <View>
                <Header title={'Hjelp'} style={styles.header}/>
                <ScrollView>
                <Expandables sections={name}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#000000',
        padding: 10,
        textAlign: 'left'
    },
});

