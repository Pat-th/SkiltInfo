import React, {useState, useEffect} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';

const FilterSwitches = props => {

    return (
        <View>
            <Text>Metadata</Text><Switch onValueChange={() => props.setMetadata(!props.metadata)} value={props.metadata}/>
            <Text>Skiltnummer</Text><Switch onValueChange={() => props.setSkiltnummer(!props.skiltnummer)} value={props.skiltnummer}/>
            <Text>Ansikt</Text><Switch onValueChange={() => props.setAnsikt(!props.ansikt)} value={props.ansikt}/>
        </View>
    )
};

const styles = StyleSheet.create({});
export default FilterSwitches;