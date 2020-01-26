import React from "react";
import {Modal, View, Alert, StyleSheet, TextInput} from 'react-native';
import {MainColors, RelappHeader, RelappToolBar, Space} from "../components/stylingComponents";
import {ButtonTypes, RelappButton} from "../components/RelappButton";

export default function ModalComponent(props)
{
    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalControls.visible}
            >
                <Space size = {15}/>
                <RelappToolBar text = {props.info.header} callback = {()=>props.modalControls.setModalVisible(!props.modalControls.visible)}/>
                <View style={styles.modalBody}>
                    <RelappHeader text = {props.info.title} size = {16} />
                    <Space size = {5}/>
                    <TextInput
                        value={props.value}
                        placeholder = {props.info.defaultValue}
                        textAlign={'center'}
                        style={styles.textStyle}
                        onChangeText={(text)=>{props.sendInfo(text)}}
                    />
                    <Space size = {5}/>
                    <RelappButton style = {ButtonTypes().mediumButton} text = "Done" callback = {()=>{
                        props.modalControls.setModalVisible(!props.modalControls.visible)
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
});
