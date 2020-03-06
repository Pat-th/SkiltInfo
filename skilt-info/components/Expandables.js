import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View, Image,} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';


const Expandables = props => {

    const [activeSections, setActiveSections] = useState([]);

    let icons = {
            'plus' : require('../images/plus.png'),
            'minus' : require('../images/minus.png'),
        };


    function setSections(sections){
        setActiveSections(sections.includes(undefined) ? [] : sections);
    }

    function renderHeader (section, _, isActive) {
        let icon = icons['plus'];

        if(isActive){
            icon = icons['minus'];
        }
        return (
            <Animatable.View
                duration={400}
                style={[styles.header, isActive ? styles.headeractive : styles.inactive]}
                transition="backgroundColor"
            >
                <Text style={styles.headerText}>{section.title}
                </Text><Image source={icon} style={styles.icons}/>
            </Animatable.View>
        );
    }

    function renderContent(section, _, isActive) {
        return (
            <Animatable.View
                duration={300}
                style={[styles.content, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                <Animatable.Text style={styles.content}>{section.content}
                </Animatable.Text>

            </Animatable.View>
        );
    }

        return (

            <View>
                <ScrollView>
                    <Accordion
                        sections={props.sections}
                        activeSections={activeSections}
                        touchableComponent={TouchableOpacity}
                        expandMultiple={false}
                        renderHeader={renderHeader}
                        renderContent={renderContent}
                        onChange={setSections}
                    />
                </ScrollView>
            </View>

        );
    };

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#000000',
        padding: 10,
        justifyContent: 'center',
    },
    headerText: {
        textAlign: 'left',
        fontSize: 24,
        fontWeight: '500',
        color: 'rgba(0,0,0,1)',

    },
    content: {
        padding: 5,
        color: 'rgba(0,0,0,1)',
        textAlign: 'left',
    },
    headeractive: {
        marginTop: 6,
        backgroundColor: 'rgb(255,255,255)',
        color: 'rgba(0,0,0,1)',
        borderColor: 'rgb(186,186,186)',
        borderWidth: 3,
        borderRadius: 10,
    },
    active: {
        marginTop: 0,
        backgroundColor: 'rgb(255,255,255)',
        color: 'rgba(0,0,0,1)',
        borderColor: 'rgb(186,186,186)',
        borderWidth: 2,
        borderRadius: 10,
    },
    inactive: {
        marginTop: 6,
        backgroundColor: 'rgb(255,255,255)',
        color: 'rgba(0,0,0,1)',
        borderColor: 'rgb(0,0,0)',
        borderWidth: 3,
        borderRadius: 10,
    },
    icons: {
        height: 15,
        width: 15,
        position: 'absolute',
        right: 10,
    }
});

export default Expandables;