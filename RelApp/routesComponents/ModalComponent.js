import React, {useState, useEffect} from "react";
import {Modal, Text, TouchableHighlight, View, Alert, StyleSheet, TextInput} from 'react-native';
import {MainColors, RelappHeader, RelappToolBar, Space} from "../components/stylingComponents";
import {ButtonTypes, RelappButton} from "../components/RelappButton";

export default function ModalComponent(props)
{
    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.visible}
            >
                <RelappToolBar text = {props.header} callback = {()=>props.setModalVisible(!props.visible)}/>
                <View style={styles.modalBody}>
                    <RelappHeader text = {props.title} size = {16} />
                    <Space size = {5}/>
                    <TextInput
                        placeholder = {props.defaultValue}
                        textAlign={'center'}
                        style={styles.textStyle}
                        onChangeText={props.onChangeText}
                    />
                    <Space size = {5}/>
                    <RelappButton style = {ButtonTypes().mediumButton} text = "Done" callback = {()=>{
                        props.setModalVisible(!props.visible)
                    }}/>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        height:'80%',
        width:'95%',
        backgroundColor:MainColors.backgroundColor,
        borderColor: 'black',
        borderWidth: 1.5,
        borderRadius: 10,
    },
    modalBody: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: MainColors.backgroundColor,
    },
})
export const ModalStyles = StyleSheet.create({
    textView:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '80%',
        backgroundColor: MainColors.containerBackground,
    },
});

