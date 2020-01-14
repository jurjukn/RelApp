import {View, Text, StyleSheet, ScrollView} from "react-native";
import React from "react";
import {Space} from "../components/stylingComponents";
import {RelappSearch} from "../components/RelappTextInput";
import RouteStatistics from "./../historyComponents/RouteStatistics"


export default function History () {
    return (
        <View style={styles.container}>
            <Space size = {30}/>
            <RelappSearch onChangeText = {(text)=>{setText(text)}}/>
            <Space size = {20}/>
            <View style={styles.container2}>
                <ScrollView>
                    <RouteStatistics routeName={"Route I "} date={"2020-15-01"} time={"20:00"} difficulty={7} distance={8} myRate={4}/>
                    <Space size = {30}/>
                    <RouteStatistics routeName={"Route II "} date={"2019-12-25"} time={"15:00"} difficulty={9} distance={3} myRate={2}/>
                    <Space size = {30}/>
                </ScrollView>
            </View>
            <Space size = {20}/>
            <Text>CIA BUS STATISTIKA</Text>
            <Space size = {20}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0E6E6',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    container2: {
        flex: 1,
        left:10,
        width:'100%',
        backgroundColor: '#F0E6E6',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
})

