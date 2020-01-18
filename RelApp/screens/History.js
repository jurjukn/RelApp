import {View, StyleSheet, ScrollView} from "react-native";
import React from "react";
import {RelappLogo, Space} from "../components/stylingComponents";
import {RelappSearch} from "../components/RelappTextInput";
import RouteStatistics from "./../historyComponents/RouteStatistics"
import UserStatistics from "./../historyComponents/UserStatistics"


export default function History (props) {
    return (
        <View style={{flex: 1}}>
            <RelappLogo/>
            <View style={styles.mainContainer}>
                <View style={styles.searchBarContainer}>
                    <Space size = {30}/>
                    <RelappSearch onChangeText = {(text)=>{setText(text)}}/>
                </View>
                <View style={styles.listContainer}>
                    <ScrollView>
                        <RouteStatistics routeName={"Route I "} date={"2020-15-01"} time={"20:00"} difficulty={7} distance={8} myRate={4}/>
                        <Space size = {30}/>
                        <RouteStatistics routeName={"Route II "} date={"2019-12-25"} time={"15:00"} difficulty={9} distance={3} myRate={2}/>
                        <Space size = {30}/>
                    </ScrollView>
                </View>
                <View style={styles.userStatisticsContainer}>
                    <UserStatistics />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F0E6E6',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    searchBarContainer: {
        flex:1,
        width:"100%",
        alignItems: 'center'
    },
    listContainer: {
        flex: 4,
        left:10,
        width:'100%',
        backgroundColor: '#F0E6E6',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    userStatisticsContainer: {
        flex:1
    }
})

