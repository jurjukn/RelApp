import {View, Text, StyleSheet} from "react-native";
import React from "react";
import {RelappLogoForProfile, RelappToolBar} from "../components/stylingComponents";
import {getAllRoutes} from "../databaseServices/RouteService";
import UserInfo from '../profileComponents/UserInfo';
import AllRoutes from '../profileComponents/AllRoutes';

const helpIcon = {
    name:"md-help-circle",
    callback:()=>{props.navigation.navigate("Tabs")}
};

const logoutIcon = {
    name:"md-log-out",
    callback:()=>{props.navigation.navigate("Tabs")}
};

export default function Profiles(props){
    return (
        <View style={{flex: 1}}>
            <RelappToolBar text = {"Profile"}
                           secondIcon = {helpIcon}
                           thirdIcon = {logoutIcon}
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
