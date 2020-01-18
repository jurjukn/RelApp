import {ScrollView, StyleSheet, Text, View} from "react-native";
import {MainModal, TransparentModal} from "../../ModalComponent";
import {RelappHeader, RelappLogo, Space} from "../../../components/stylingComponents";
import {RelappSearch} from "../../../components/RelappTextInput";
import React, {useState} from "react";
import {ButtonTypes, RelappButton} from "../../../components/RelappButton";
import ProgramItem, {ProgressToolbar} from "../RoutePregessStyles";

export default function BlockingScreen(props)
{
    const [text, setText] = useState("")
    return (
        <View style={{flex: 1}}>
            <RelappLogo callback = {()=>{props.navigation.navigate("Tabs")}}/>
            <View style={styles.container}>
                <ProgressToolbar
                    header = {"Route IV"}
                />
                <Space size = {10}/>
                <View  style={{width:'90%'}}>
                    <RelappHeader text = {"Select social media you want to block while you’re going the route."} size = {16} />
                </View>
                <Space size = {10}/>
                <View style={{width:'90%', height:'50%'}}>
                    <ScrollView>
                        <ProgramItem name = {"Facebook"} callback = {(name)=>{console.log("Facebook ", name)}} />
                        <Space size = {10}/>
                        <ProgramItem name = {"Facebook"} callback = {(name)=>{console.log("Facebook ", name)}}/>
                        <Space size = {10}/>
                        <ProgramItem name = {"Facebook"} callback = {(name)=>{console.log("Facebook ", name)}}/>
                    </ScrollView>
                </View>
                <Space size = {25}/>
                <RelappButton style = {ButtonTypes().mediumButton} text = "Done" callback = {()=>{props.navigation.navigate("GoingScreen")}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0E6E6',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    container2: {
        flex: 1,
        left:10,
        backgroundColor: '#F0E6E6',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },

        separationLine: {
            width:"100%",
            borderWidth: 2,
            borderRadius: 2,
        },

})
