import React, {useState, useEffect} from "react";
import {Modal, Text, TouchableHighlight, View, Alert, StyleSheet} from 'react-native';
import {MainModal, ModalStyles, TransparentModal} from "./ModalComponent";
import {IconsComponent, RelappHeader, Space} from "../components/stylingComponents";
import {ButtonTypes, RelappButton} from "../components/RelappButton";
import {RelappSearch} from "../components/RelappTextInput";

const Music = ()=>
{
    return(
        <View style={ModalStyles.textView}>
            <RelappHeader text = {"Upload URL of the Spotify playlist"} size = {16} />
            <Space size = {5}/>
            <RelappSearch
                defaultValue = "URL"
                onChangeText = {(text)=>{
                    console.log(text)
                }}/>
        </View>
    )
}

export default function SelectMusic(props)
{
    const [mainVisible, setMainVisible] = useState(true);
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
            <MainModal content = {<Music/>} header = {"Select music"} setModalVisible = {mainVisible} callback = {()=>{ChangeState()}} />
        </View>
    );
}

