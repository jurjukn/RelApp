import {View, Text, StyleSheet} from "react-native";
import MapView from "react-native-maps";
import React from "react";
import {BasicStyles, RelappLogo, RelappLogoForProfile} from "../components/stylingComponents";
import ShowingMap from "../routesComponents/ShowingMap";


export default function Profiles(props){
    return (
        <View style={{flex: 1}}>
            <RelappLogoForProfile help = {()=>{props.navigation.navigate("Tabs")}}
                                  logOut = {()=>{props.navigation.navigate("Tabs")}}
            />
            <View style={BasicStyles.container}>
                <Text>Profile</Text>
            </View>
        </View>
    );
}
