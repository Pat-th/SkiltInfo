import React from 'react';
import {ScrollView, View} from 'react-native';
import Expandables from "../components/Expandables";

const HelpScreen = () => {
    const name = [
        {
            title: 'Bruk',
            content: 'Ta bilde av et veiskilt fra kamerasiden og vent på at bildet skal gjenkjennes og kartet skal åpne seg. Velg så skiltet ditt fra markørene på kartet. Velger du feil skilt kan du trykke på tilbakeknappen og velge et annet.',
        },
        {
            title: 'Skiltet mitt er ikke på kartet',
            content: 'Vennligst prøv å ta et nytt bilde i tilfelle vi har gjort en feil i gjenkjenning av bildet',
        },
        {
            title: 'Sikkerhet',
            content: 'Applikasjonen lagrer ingen data fra brukerne. Bilder som tas i applikasjonen og posisjonen til brukeren brukes kun til å finne riktig skilt',
        },
        {
            title: 'Info og Opphavsrett',
            content: 'Applikasjonen er utviklet av Patrick Thorkildsen og Quan Tran i samarbeid med Triona AS som del av bacheloroppgaven på dataingeniørstudiet ved NTNU i 2020',
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

