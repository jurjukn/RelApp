import React, {useState, useEffect} from "react";
import {Modal, Text, TouchableHighlight, View, Alert, StyleSheet} from 'react-native';
import {RelappHeader, Space} from "../components/stylingComponents";
import {ButtonTypes, RelappButton} from "../components/RelappButton";

export function TransparentModal(props)
{
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => setModalVisible(props.setModalVisible), [props.setModalVisible]);
    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.transparentModalBody}/>
            </Modal>
        </View>
    )
}

export function MainModal(props)
{
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => setModalVisible(props.setModalVisible), [props.setModalVisible]);
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.modalBody}>
                <Space size = {5}/>
                <RelappHeader text = {props.header} size = {26}/>
                <View style={styles.lineStyle}/>
                <Space size = {10}/>
                {props.content}
                <Space size = {5}/>
                <RelappButton style = {ButtonTypes().mediumButton} text = "Done" callback = {props.callback}/>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    transparentModalBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.67)'
    },
    modalBody: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '80%',
        height: '80%',
        top:'10%',
        left:'10%',
        backgroundColor: '#F0E6E6',
    },
    lineStyle:{
        borderStyle: 'dotted',
            borderWidth: 1,
        borderRadius: 1,
        width: '80%',
    },
});

export const ModalStyles = StyleSheet.create({
    textView:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '80%',
        backgroundColor: '#AF8989',
    },
});

