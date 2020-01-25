import React, {useState, useEffect} from "react";
import {Modal, Text, View, Alert, StyleSheet, TextInput} from 'react-native';
import {MainModal, ModalStyles, TransparentModal} from "./ModalComponent";
import {IconsComponent, RelappHeader, Space} from "../components/stylingComponents";
import {ButtonTypes, RelappButton} from "../components/RelappButton";
import {RelappTextInput} from "../components/RelappTextInput";

const Music = (props)=>
{
    return(
        <View style={ModalStyles.textView}>
            <RelappHeader text = {"Upload URL of the Spotify playlist"} size = {16} />
            <Space size = {5}/>
            <RelappTextInput
                defaultValue = {props.defaultValue === null ? "URL" : props.defaultValue}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}

export default function SelectMusic(props)
{
    const [mainVisible, setMainVisible] = useState(true);
    const [text, setText] = useState("");
    const ChangeState = ()=>{
        setMainVisible(!mainVisible);
    };
    useEffect(() => {
        console.log("useEffect",props.setModalVisible);
        ChangeState();
    }, [props.setModalVisible]);

    return (
        <View>
            <TransparentModal setModalVisible = {mainVisible}/>
            <MainModal
                content = {<Music
                    defaultValue = {props.defaultValue === null ? null : props.defaultValue}
                    onChangeText = {(text)=>{setText(text)}}
                />}
                header = {"Select music"}
                setModalVisible = {mainVisible}
                callback = {()=>{
                    props.sendInfo(text);
                    ChangeState();
                }} />
        </View>
    );
}

