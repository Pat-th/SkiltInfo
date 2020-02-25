import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Modal from "react-native-modal";
import SignPreview from "../components/SignPreview";

const SignPicker = props => {
    const [navigation, setNavigation] = useState(null);

    useEffect(() => {
        setNavigation(props.navigation)
    })

    return(
        <Modal 
        isVisible={props.visible} 
        onBackButtonPress={props.onCancel} 
        onBackdropPress={props.onCancel}
        animationOutTiming={3000}>
            <View style={styles.contentContainer}>
                <Text>Vi fant disse mulige skiltene:</Text>
                <FlatList
                keyExtractor={(item, index) => item.id.toString()}
                data={props.data}
                renderItem={itemData => <SignPreview
                    signItem={itemData.item} 
                    id={itemData.item.id} 
                    oppsettingsdato={itemData.item.metadata.startdato} 
                    onClickItem = {props.onCancel}
                    cancel = {props.onCancel}
                    navigation={navigation}
                    ></SignPreview>} 
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10
    }
});

export default SignPicker;