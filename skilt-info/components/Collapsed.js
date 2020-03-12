import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import Collapsible from "react-native-collapsible";




const Collapsed = props => {



    const [collapsed, setCollapsed] = useState(true);

    function toggleExpanded() {
        setCollapsed(!collapsed);
    }


    return(
        <View style={props.viewStyle}>
            <TouchableOpacity onPress={toggleExpanded} style={props.TitleTouchStyle}>
                <Text style={props.TitleStyle}>{props.titleOfCollapsible}</Text>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed} style={styles.header}>
               {props.contentOfCollapsible}
            </Collapsible>
        </View>
    )
};

const styles = StyleSheet.create({

    header: {
        padding: 10,
        justifyContent: 'center',
    },

    headerText: {
        textAlign: 'left',
        fontSize: 24,
        fontWeight: '500',
        color: 'rgba(0,0,0,1)',

    },
});


export default Collapsed;