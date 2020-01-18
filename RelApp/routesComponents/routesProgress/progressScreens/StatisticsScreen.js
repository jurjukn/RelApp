import {ScrollView, StyleSheet, Text, View, Button} from "react-native";
// import {MainModal, TransparentModal} from "../ModalComponent";
// import {RelappHeader, RelappLogo, Space} from "../../../components/stylingComponents";
import {RelappHeader, RelappLogo, Space} from "../../../components/stylingComponents"
// import {RelappSearch} from "../../components/RelappTextInput";
import React, {useState} from "react";
import {ButtonTypes, RelappButton} from "../../../components/RelappButton";
import ProgramItem, {ProgressToolbar} from "../RoutePregessStyles";

export default function StatisticsScreen(props)
{
    const [text, setText] = useState("")
    return (
        <View style={{flex:1}}>
            <RelappLogo /> 
            <View style={styles.container}>
                <ProgressToolbar header = {"Route IV"}/> 
                <Text>Maybe lets not show arrow back in the top? Because otherwise user can mess up our backend</Text>
                <Text>This is statistics screen. Here we show statistics</Text>
                <RelappButton style = {ButtonTypes().mediumButton} text = "Next" callback = {()=>{props.navigation.navigate("RatingScreen")}}/>
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
