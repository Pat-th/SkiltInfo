import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Collapsible from "react-native-collapsible";




const Collapsed = props => {
    const [collapsed, setCollapsed] = useState(true);

    let icons = {
        'plus' : require('../images/plus.png'),
        'minus' : require('../images/minus.png'),
    };

    let activeIcon = icons.plus;

    function changeActiveIcon() {
        if(activeIcon == icons.plus){
            activeIcon = icons.minus
        }
        else{
            activeIcon = icons.plus
        }
    }

    function toggleExpanded() {
        setCollapsed(!collapsed);
        changeActiveIcon()
    }

    


    return(
        <View style={props.viewStyle}>
            <TouchableOpacity onPress={toggleExpanded} style={props.TitleTouchStyle}>
                <Text style={props.TitleStyle}>{props.titleOfCollapsible}</Text>
                <Image source={collapsed === true ? icons.plus : icons.minus} style={styles.icons}></Image>
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
    icons: {
        height: 15,
        width: 15,
        position: 'absolute',
        right: 10,
        marginTop: 10,
        left: 80
    }
});


export default Collapsed;