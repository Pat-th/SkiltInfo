import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ItemInfo = props => {
    return(
        <View>
            <View>
                <Text>{props.id}</Text>
                <Text>{props.value}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    
});

export default ItemInfo;