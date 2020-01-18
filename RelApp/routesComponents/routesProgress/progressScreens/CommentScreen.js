import {ScrollView, StyleSheet, Text, View, Button} from "react-native";
// import {MainModal, TransparentModal} from "../ModalComponent";
// import {RelappHeader, RelappLogo, Space} from "../../../components/stylingComponents";
import {RelappHeader, RelappLogo, Space} from "../../../components/stylingComponents"
// import {RelappSearch} from "../../components/RelappTextInput";
import React, {useState} from "react";
import {ButtonTypes, RelappButton} from "../../../components/RelappButton";
import ProgramItem, {ProgressToolbar} from "../RoutePregessStyles";

export default function CommentScreen(props)
{
    const [text, setText] = useState("")
    return (
        <View style={{flex:1}}>
            <RelappLogo callback = {()=>{props.navigation.navigate("RatingScreen")}}/> 
            <View style={styles.container}>
                <ProgressToolbar header = {"Route IV"}/> 
                <Text>This is comment screen</Text>
                <RelappButton style = {ButtonTypes().mediumButton} text = "Finish" callback = {()=>{props.navigation.navigate("Tabs")}}/>
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
