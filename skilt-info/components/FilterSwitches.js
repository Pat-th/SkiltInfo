import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';

const FilterSwitches = props => {

    return (
        <View>
            <Text>Metadata</Text><Switch onValueChange={() => props.setMetadata(!props.metadata)} value={props.metadata}/>
            <Text>Geometri</Text><Switch onValueChange={() => props.setGeometri(!props.geometri)} value={props.geometri}/>
            <Text>Lokasjon</Text><Switch onValueChange={() => props.setLokasjon(!props.lokasjon)} value={props.lokasjon}/>
            <Text>Relasjoner</Text><Switch onValueChange={() => props.setRelasjon(!props.relasjon)} value={props.relasjon}/>
            <Text>Egenskaper:</Text>
            <Text>Skiltnummer</Text><Switch onValueChange={() => props.setSkiltnummer(!props.skiltnummer)} value={props.skiltnummer}/>
            <Text>Ansiktsside Rettet Mot</Text><Switch onValueChange={() => props.setAnsikt(!props.ansikt)} value={props.ansikt}/>
            <Text>Oppsettingsdato</Text><Switch onValueChange={() => props.setOppsettingsdato(!props.oppsettingsdato)} value={props.oppsettingsdato}/>
            <Text>Punkttilknytning</Text><Switch onValueChange={() => props.setPunkttilknytning(!props.punkttilknytning)} value={props.punkttilknytning}/>
            <Text>Geometri, punkt</Text><Switch onValueChange={() => props.setGeometriPunkt(!props.geometriPunkt)} value={props.geometriPunkt}/>
            <Text>Tekst</Text><Switch onValueChange={() => props.setTekst(!props.tekst)} value={props.tekst}/>
            <Text>Plasseringskode</Text><Switch onValueChange={() => props.setPlasseringskode(!props.plasseringskode)} value={props.plasseringskode}/>
            <Text>Tosidig Plate Med Ulike Motiv</Text><Switch onValueChange={() => props.setTosidigPlate(!props.tosidigPlate)} value={props.tosidigPlate}/>
            <Text>Størrelse</Text><Switch onValueChange={() => props.setStorrelse(!props.storrelse)} value={props.storrelse}/>
            <Text>Høyde</Text><Switch onValueChange={() => props.setHoyde(!props.hoyde)} value={props.hoyde}/>
            <Text>Bredde</Text><Switch onValueChange={() => props.setBredde(!props.bredde)} value={props.bredde}/>
            <Text>Skiltform</Text><Switch onValueChange={() => props.setSkiltform(!props.skiltform)} value={props.skiltform}/>
            <Text>Tekst- og Symbolhøyde</Text><Switch onValueChange={() => props.setTekstOgSymbol(!props.tekstOgSymbol)} value={props.tekstOgSymbol}/>
            <Text>Farge</Text><Switch onValueChange={() => props.setFarge(!props.farge)} value={props.farge}/>
            <Text>Belysning</Text><Switch onValueChange={() => props.setBelysning(!props.belysning)} value={props.belysning}/>
            <Text>Folieklasse</Text><Switch onValueChange={() => props.setFolieklasse(!props.folieklasse)} value={props.folieklasse}/>
            <Text>Klappskilt</Text><Switch onValueChange={() => props.setKlappskilt(!props.klappskilt)} value={props.klappskilt}/>
            <Text>Vedtaksnummer</Text><Switch onValueChange={() => props.setVedtaksnummer(!props.vedtaksnummer)} value={props.vedtaksnummer}/>
            <Text>Skiftet dato</Text><Switch onValueChange={() => props.setSkiftetDato(!props.skiftetDato)} value={props.skiftetDato}/>
            <Text>Arkivnummer</Text><Switch onValueChange={() => props.setArkivnummer(!props.arkivnummer)} value={props.arkivnummer}/>
            <Text>Eier</Text><Switch onValueChange={() => props.setEier(!props.eier)} value={props.eier}/>
            <Text>Vedlikeholdsansvarlig</Text><Switch onValueChange={() => props.setVedlikehold(!props.vedlikehold)} value={props.vedlikehold}/>
        </View>
    )
};

const styles = StyleSheet.create({});
export default FilterSwitches;