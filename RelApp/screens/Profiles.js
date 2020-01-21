import {View, Text, StyleSheet} from "react-native";
import React from "react";
import {RelappLogoForProfile} from "../components/stylingComponents";
import {getAllRoutes} from "../databaseServices/RouteService";
import UserInfo from '../profileComponents/UserInfo';
import AllRoutes from '../profileComponents/AllRoutes';

export default function Profiles(props){
    return (
        <View style={{flex: 1}}>
            <RelappLogoForProfile 
                help = {()=>{props.navigation.navigate("Tabs")}}
                logOut = {()=>{props.navigation.navigate("Tabs")}}
            />
            <UserInfo/>
            <View style={{margin: 10}}>
                <Text style={styles.textStyle}>Routes created by me</Text>
            </View>
            <AllRoutes/>
        </View>
    );
}

export const styles = StyleSheet.create({
    textStyle: {
        fontWeight: 'bold', 
        color: "#4F4F4F", 
        fontSize: 18, 
        marginEnd:'auto',
        marginVertical: 15,
    },
    grayContainer: {
        backgroundColor: '#F4F4F4',
        margin: 10,
        alignItems: "center",
    },
})