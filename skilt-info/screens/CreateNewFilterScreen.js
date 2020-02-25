import React, {useState} from 'react';
import {StyleSheet, Switch, Text, View, Button,} from 'react-native';
import TextInput from "react-native-web/dist/exports/TextInput";

const CreateNewFilterScreen = () => {
    const [metadata, setMetadata] = useState(false);
    const [input, setInput] = useState('');

    const save = () => {
      if(metadata){

      }
    };


    const json = require("../settings/settings.json");
    //let settings = [];
    /*for(var i in json.egenskaper){
        settings.push(
            json.egenskaper[i].navn
        )
    }*/
    const Metadata = () => {
        let name = 'Metadata';
        return name;
    };

    const PunktTilknytning = () => {
        let name = '';
        for (var i in json.egenskaper) {
            if (json.egenskaper[i].navn === 'PunktTilknytning') {
                name = json.egenskaper[i].navn;
            }
        }
        return name;
    };

    const GeometriPunkt = () => {
        let name = '';
        for (var i in json.egenskaper) {
            if (json.egenskaper[i].navn === 'Geometri, punkt') {
                name = json.egenskaper[i].navn;
            }
        }
        return name;
    };

    const Folieklasse = () => {
        let name = '';
        for (var i in json.egenskaper) {
            if (json.egenskaper[i].navn === 'Folieklasse') {
                name = json.egenskaper[i].navn;
            }
        }
        return name;
    };

    const Plasseringskode = () => {
        let name = '';
        for (var i in json.egenskaper) {
            if (json.egenskaper[i].navn === 'Plasseringskode') {
                name = json.egenskaper[i].navn;
            }
        }
        return name;
    };

    const Skiltnummer = () => {
        let name = '';
        for (var i in json.egenskaper) {
            if (json.egenskaper[i].navn === 'Skiltnummer') {
                name = json.egenskaper[i].navn;
            }
        }
        return name;
    };

    const Skiltform = () => {
        let name = '';
        for (var i in json.egenskaper) {
            if (json.egenskaper[i].navn === 'Skiltform') {
                name = json.egenskaper[i].navn;
            }
        }
        return name;
    };

    const AnsiktssideRettetMot = () => {
        let name = '';
        for (var i in json.egenskaper) {
            if (json.egenskaper[i].navn === 'Ansiktsside, rettet mot') {
                name = json.egenskaper[i].navn;
            }
        }
        return name;
    };

    const Storrelse = () => {
        let name = '';
        for (var i in json.egenskaper) {
            if (json.egenskaper[i].navn === 'Størrelse') {
                name = json.egenskaper[i].navn;
            }
        }
        return name;
    };

    const Oppsettingsdato = () => {
        let name = '';
        for (var i in json.egenskaper) {
            if (json.egenskaper[i].navn === 'Oppsettingsdato') {
                name = json.egenskaper[i].navn;
            }
        }
        return name;
    };


    return (
        <View>
            <Text>Navn:</Text><TextInput onChange={() => setInput()}/>
            <Text>{Metadata()}</Text><Switch onValueChange={() => setMetadata(!metadata)} value={metadata}/>
            <Text>{PunktTilknytning()}</Text><Switch/>
            <Text>{GeometriPunkt()}</Text><Switch/>
            <Button title={"Lagre"}/>
        </View>
    )
};

const style = StyleSheet.create({});

export default CreateNewFilterScreen;