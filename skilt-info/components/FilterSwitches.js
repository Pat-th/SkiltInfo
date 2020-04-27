import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import Colors from "../Constants/Colors"

const FilterSwitches = props => {

    return (
        <View>
                <View style={styles.buttonview}><Text style={styles.othertext}>Metadata</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setMetadata(!props.metadata)} value={props.metadata} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Geometri</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setGeometri(!props.geometri)} value={props.geometri} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Lokasjon</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setLokasjon(!props.lokasjon)} value={props.lokasjon} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Relasjoner</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setRelasjon(!props.relasjon)} value={props.relasjon} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View><Text style={styles.headertext}>Egenskaper:</Text></View>
                <View style={styles.buttonview}><Text style={styles.othertext}>Skiltnummer</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setSkiltnummer(!props.skiltnummer)} value={props.skiltnummer} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Ansiktsside Rettet Mot</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setAnsikt(!props.ansikt)} value={props.ansikt} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Oppsettingsdato</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setOppsettingsdato(!props.oppsettingsdato)} value={props.oppsettingsdato} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Punkttilknytning</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setPunkttilknytning(!props.punkttilknytning)} value={props.punkttilknytning} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Geometri, punkt</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setGeometriPunkt(!props.geometriPunkt)} value={props.geometriPunkt} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Tekst</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setTekst(!props.tekst)} value={props.tekst} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Plasseringskode</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setPlasseringskode(!props.plasseringskode)} value={props.plasseringskode} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Tosidig Plate Med Ulike Motiv</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setTosidigPlate(!props.tosidigPlate)} value={props.tosidigPlate} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Størrelse</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setStorrelse(!props.storrelse)} value={props.storrelse} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Høyde</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setHoyde(!props.hoyde)} value={props.hoyde} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Bredde</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setBredde(!props.bredde)} value={props.bredde} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Skiltform</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setSkiltform(!props.skiltform)} value={props.skiltform} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Tekst- og Symbolhøyde</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setTekstOgSymbol(!props.tekstOgSymbol)} value={props.tekstOgSymbol} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Farge</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setFarge(!props.farge)} value={props.farge} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Belysning</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setBelysning(!props.belysning)} value={props.belysning} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Folieklasse</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setFolieklasse(!props.folieklasse)} value={props.folieklasse} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Klappskilt</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setKlappskilt(!props.klappskilt)} value={props.klappskilt} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Vedtaksnummer</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setVedtaksnummer(!props.vedtaksnummer)} value={props.vedtaksnummer} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Skiftet dato</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setSkiftetDato(!props.skiftetDato)} value={props.skiftetDato} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Arkivnummer</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setArkivnummer(!props.arkivnummer)} value={props.arkivnummer} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Eier</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setEier(!props.eier)} value={props.eier} style={styles.switchbutton}/></View>
                <View style={styles.line} />
                <View style={styles.buttonview}><Text style={styles.othertext}>Vedlikeholdsansvarlig</Text><Switch onTintColor={Colors.primaryColor1} thumbColor={"white"} onValueChange={() => props.setVedlikehold(!props.vedlikehold)} value={props.vedlikehold} style={styles.switchbutton}/></View>
                <View style={styles.line} />
        </View>
    )
};

const styles = StyleSheet.create({
        buttonview: {
                flexDirection: 'row',
                alignItems: 'center',
                margin: 5,
        },
        line: {
                borderBottomColor: "#a38e8c",
                borderBottomWidth: .8,
                marginLeft: 15,
                marginRight: 15,
                marginTop: 3,
                marginBottom: 3
        },
        switchbutton: {
                flex: 0.2
        },
        headertext: {
                fontSize: 32,
        },
        othertext: {
                fontSize: 20,
                marginLeft: 10,
                flex: 0.8
        }
});
export default FilterSwitches;