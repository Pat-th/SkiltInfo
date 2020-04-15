import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const SignCallout = props => {
    return(
        <View>
            <Text>
                ID: {props.id}
            </Text>
            <Text>
                Trykk for å vise mer
            </Text>
            
        </View>
    );
};

export default SignCallout;