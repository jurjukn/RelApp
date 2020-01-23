import React, {useState, useEffect} from "react";
import {Modal, Text, TouchableHighlight, View, Alert, StyleSheet, TextInput} from 'react-native';
import {MainModal, ModalStyles, TransparentModal} from "./ModalComponent";
import {MainColors, RelappHeader, Space} from "../components/stylingComponents";
import {RelappTextInput} from "../components/RelappTextInput";

const Description = (props)=>
{
    return(
        <View style={ModalStyles.textView}>
            <RelappHeader text = {"Write short description about your route"} size = {16} />
            <Space size = {5}/>
            <TextInput
                placeholder={"Description"}
                textAlign={'center'}
                style={styles.textStyle}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}

export default function AddDescription(props)
{
    const [mainVisible, setMainVisible] = useState(true);
    const ChangeState = ()=>{
        setMainVisible(!mainVisible);
    };
    useEffect(() => {
        console.log("useEffect",props.setModalVisible);
        ChangeState();
    }, [props.setModalVisible]);
    const [text, setText] = useState("");
    return (
        <View>
            <TransparentModal setModalVisible = {mainVisible}/>
            <MainModal content = {<Description
                onChangeText = {(text)=>{setText(text)}}
            />}
                       header = {"Add Description"}
                       setModalVisible = {mainVisible}
                       callback = {()=>{
                           props.sendInfo(text);
                           ChangeState()
                       }} />
        </View>
    );
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
})
