import React, {useState, useEffect} from 'react';
import {Text, View, Button, AsyncStorage, ScrollView, StyleSheet} from 'react-native';
import FilterSwitches from "../components/FilterSwitches";

const EditFilterScreen = props => {
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

    useEffect(() => {
        getData();
    }, []);

    const saveEdit = async () => {
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
        let string = await JSON.stringify(settings);
        await AsyncStorage.setItem(props.navigation.state.params.toEdit, string).then(props.navigation.goBack())
    };


    const getData = async () =>{
        let storage = await AsyncStorage.getItem(props.navigation.state.params.toEdit);
        let parse = await JSON.parse(storage);
        setMetadata(parse.metadata);
        setGeometri(parse.geometri);
        setLokasjon(parse.lokasjon);
        setRelasjon(parse.relasjon);
        setPunkttilknytning(parse.egenskaper.PunktTilKnytning);
        setSkiltnummer(parse.egenskaper.Skiltnummer);
        setAnsikt(parse.egenskaper.AnsiktssideRettetMot);
        setOppsettingsdato(parse.egenskaper.Oppsettingsdato);
        setGeometriPunkt(parse.egenskaper.GeometriPunkt);
        setTekst(parse.egenskaper.Tekst);
        setPlasseringskode(parse.egenskaper.Plasseringskode);
        setTosidigPlate(parse.egenskaper.TosidigPlateMedUlikeMotiv);
        setStorrelse(parse.egenskaper.Storrelse);
        setHoyde(parse.egenskaper.Hoyde);
        setBredde(parse.egenskaper.Bredde);
        setSkiltform(parse.egenskaper.Skiltform);
        setTekstOgSymbol(parse.egenskaper.TekstOgSymbolhoyde);
        setFarge(parse.egenskaper.Farge);
        setBelysning(parse.egenskaper.Belysning);
        setFolieklasse(parse.egenskaper.Folieklasse);
        setKlappskilt(parse.egenskaper.Klappskilt);
        setVedtaksnummer(parse.egenskaper.Vedtaksnummer);
        setSkiftetDato(parse.egenskaper.SkiftetDato);
        setArkivnummer(parse.egenskaper.Arkivnummer);
        setEier(parse.egenskaper.Eier);
        setVedlikehold(parse.egenskaper.Vedlikeholdsansvarlig);
    };

    return (
        <View style={{flex: 1}}>
            <ScrollView>
            <Text style={{fontSize: 32}}>Filter: {props.navigation.state.params.toEdit}</Text>
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
            </ScrollView>
            <View><Button onPress={() => saveEdit()} title={"Lagre endringer"} style={styles.saveButton}/></View>
        </View>
    )

};
const styles = StyleSheet.create({
    saveButton: {
        position: 'absolute',
        bottom: 0,
    },
});
export default EditFilterScreen;