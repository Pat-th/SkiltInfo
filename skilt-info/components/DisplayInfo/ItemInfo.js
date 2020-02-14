import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ItemInfo = props => {
    return(
        <View>
            <Text>{props.id}</Text>
            <Text>{props.value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    
});

export default ItemInfo;