import {View, Text, StyleSheet} from "react-native";
import MapView from "react-native-maps";
import React from "react";
import {BasicStyles} from "../components/stylingComponents";
import Map from "../routesComponents/Map";


export default function Profiles(){
    return (
        <View style={BasicStyles.container}>
            <Text>Profile</Text>
        </View>
    );
}
