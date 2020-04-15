import React, {useState} from 'react';
import {Text, View, Button, TextInput, AsyncStorage, Alert, ScrollView} from 'react-native';
import FilterSwitches from "../components/FilterSwitches";

const CreateNewFilterScreen = props => {
    const [input, setInput] = useState('');
    const [metadata, setMetadata] = useState(false);
    const [geometri, setGeometri] = useState(false);
    const [lokasjon, setLokasjon] = useState(false);
    const [relasjon, setRelasjon] = useState(false);
    const [skiltnummer, setSkiltnummer] = useState(false);
    const [ansikt, setAnsikt] = useState(false);
    const [oppsettingsdato, setOppsettingsdato] = useState(false);
    const [punkttilknytning, setPunkttilknytning] = useState(false);
    const [geometriPunkt, setGeometriPunkt] = useState(false);
    const [tekst, setTekst] = useState(false);
    const [plasseringskode, setPlasseringskode] = useState(false);
    const [tosidigPlate, setTosidigPlate] = useState(false);
    const [storrelse, setStorrelse] = useState(false);
    const [hoyde, setHoyde] = useState(false);
    const [bredde, setBredde] = useState(false);
    const [skiltform, setSkiltform] = useState(false);
    const [tekstOgSymbol, setTekstOgSymbol] = useState(false);
    const [farge, setFarge] = useState(false);
    const [belysning, setBelysning] = useState(false);
    const [folieklasse, setFolieklasse] = useState(false);
    const [klappskilt, setKlappskilt] = useState(false);
    const [vedtaksnummer, setVedtaksnummer] = useState(false);
    const [skiftetDato, setSkiftetDato] = useState(false);
    const [arkivnummer, setArkivnummer] = useState(false);
    const [eier, setEier] = useState(false);
    const [vedlikehold, setVedlikehold] = useState(false);

    const createFilter = async () =>  {
        let settings = {
            metadata:  metadata,
            geometri: geometri,
            lokasjon: lokasjon,
            relasjon: relasjon,
            egenskaper:
                {
                    PunktTilKnytning: punkttilknytning,
                    Skiltnummer: skiltnummer,
                    AnsiktssideRettetMot: ansikt,
                    Oppsettingsdato: oppsettingsdato,
                    GeometriPunkt: geometriPunkt,
                    Tekst: tekst,
                    Plasseringskode: plasseringskode,
                    TosidigPlateMedUlikeMotiv: tosidigPlate,
                    Storrelse: storrelse,
                    Hoyde: hoyde,
                    Bredde: bredde,
                    Skiltform: skiltform,
                    TekstOgSymbolhoyde: tekstOgSymbol,
                    Farge: farge,
                    Belysning: belysning,
                    Folieklasse: folieklasse,
                    Klappskilt: klappskilt,
                    Vedtaksnummer: vedtaksnummer,
                    SkiftetDato: skiftetDato,
                    Arkivnummer: arkivnummer,
                    Eier: eier,
                    Vedlikeholdsansvarlig: vedlikehold
                }
        };
        let stringSettings = JSON.stringify(settings);
        const filter = await AsyncStorage.getItem('filters');
        let string = await JSON.parse(filter);
        if(input.length < 5 || input.length > 20){
            Alert.alert('Noe gikk galt!',
                'Navnet på filteret må være mellom 5 og 20 tegn!',
                [
                    {text: 'OK'}
                ],
                {cancelable: false},
                );
            return 'Navnet på filteret er ikke mellom 5 og 20 tegn.'
        }
        if(string.filters.includes(input) || input === 'standard' || input === 'filters' || input === 'Enkel' || input === 'Avansert'){
            console.log('Dette filteret eksisterer allerede');
            Alert.alert(
                'Noe gikk galt!',
                'Et annet filter bruker dette navnet',
                [
                    {text: 'OK'}
                ],
            {cancelable: false},
            );
            return 'Dette filteret eksisterer allerede'
        }
        string.filters.push(input);
        let stringify = JSON.stringify(string);
        await AsyncStorage.setItem('filters', stringify);
        await AsyncStorage.setItem(input, stringSettings).then(props.navigation.goBack());
    };

    return (
        <ScrollView>
            <Text style={{fontSize: 32}}>Navn:</Text><View style={{margin: 5, borderRadius: 10, height: 50}}><TextInput onChangeText={text => setInput(text)}
                                         value={input} placeholder={'Trykk her for å skrive navn'}
                                                                style={{fontSize: 20}}/></View>
            <FilterSwitches metadata={metadata} setMetadata={setMetadata}
                            geometri={geometri} setGeometri={setGeometri}
                            lokasjon={lokasjon} setLokasjon={setLokasjon}
                            relasjon={relasjon} setRelasjon={setRelasjon}
                            skiltnummer={skiltnummer} setSkiltnummer={setSkiltnummer}
                            ansikt={ansikt} setAnsikt={setAnsikt}
                            oppsettingsdato={oppsettingsdato} setOppsettingsdato={setOppsettingsdato}
                            punkttilknytning={punkttilknytning} setPunkttilknytning={setPunkttilknytning}
                            geometriPunkt={geometriPunkt} setGeometriPunkt={setGeometriPunkt}
                            tekst={tekst} setTekst={setTekst}
                            plasseringskode={plasseringskode} setPlasseringskode={setPlasseringskode}
                            tosidigPlate={tosidigPlate} setTosidigPlate={setTosidigPlate}
                            storrelse={storrelse} setStorrelse={setStorrelse}
                            hoyde={hoyde} setHoyde={setHoyde}
                            bredde={bredde} setBredde={setBredde}
                            skiltform={skiltform} setSkiltform={setSkiltform}
                            tekstOgSymbol={tekstOgSymbol} setTekstOgSymbol={setTekstOgSymbol}
                            farge={farge} setFarge={setFarge}
                            belysning={belysning} setBelysning={setBelysning}
                            folieklasse={folieklasse} setFolieklasse={setFolieklasse}
                            klappskilt={klappskilt} setKlappskilt={setKlappskilt}
                            vedtaksnummer={vedtaksnummer} setVedtaksnummer={setVedtaksnummer}
                            skiftetDato={skiftetDato} setSkiftetDato={setSkiftetDato}
                            arkivnummer={arkivnummer} setArkivnummer={setArkivnummer}
                            eier={eier} setEier={setEier}
                            vedlikehold={vedlikehold} setVedlikehold={setVedlikehold}
            />
            <Button title={"Lagre"} onPress={() =>createFilter()}/>
        </ScrollView>
    )
};


export default CreateNewFilterScreen;