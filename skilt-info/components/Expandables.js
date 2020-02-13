import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View, Image,} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';


export default class Expandables extends Component {

    constructor(props) {
        super(props);
        this.icons = {
            'plus' : require('../images/plus.png'),
            'minus' : require('../images/minus.png'),
        }
    }

    state = {
        activeSections: [],
        collapsed: true,
    };




    setSections = sections => {
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
        });
    };

    renderHeader = (section, _, isActive) => {
        let icon = this.icons['plus'];

        if(isActive){
            icon = this.icons['minus'];
        }
        return (
            <Animatable.View
                duration={400}
                style={[styles.header, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                <Text style={styles.headerText}>{section.title}
                </Text><Image source={icon} style={styles.icons}/>
            </Animatable.View>
        );
    };

    renderContent(section, _, isActive) {
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

    render() {


        const {activeSections} = this.state;

        return (

            <View>
                <ScrollView>
                    <Accordion
                        sections={this.props.sections}
                        activeSections={activeSections}
                        touchableComponent={TouchableOpacity}
                        expandMultiple={false}
                        renderHeader={this.renderHeader}
                        renderContent={this.renderContent}
                        onChange={this.setSections}
                    />
                </ScrollView>
            </View>

        );
    }
}

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
        padding: 20,
        color: 'rgba(0,0,0,1)',
        textAlign: 'left',
    },
    active: {
        backgroundColor: 'rgb(255,255,255)',
        color: 'rgba(0,0,0,1)',

    },
    inactive: {
        backgroundColor: 'rgb(255,139,135)',
        color: 'rgba(0,0,0,1)',
    },
    icons: {
        height: 30,
        width: 30,
        position: 'absolute', right: 10,
    }
});
