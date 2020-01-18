import {View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";
import React, {useState,useEffect} from "react";
import Map from "../routesComponents/Map";
import {RelappLogo, Space} from "../components/stylingComponents";
import {RouteItem} from "../routesComponents/RouteItem";
import {RelappSearch} from "../components/RelappTextInput";
import {ButtonTypes, RelappButton} from "../components/RelappButton";
import {getAllRoutes} from "../databaseServices/RouteService";


export default function Routes(props)
{
    const [text, setText] = useState("")
    const [routesArr, setRoutesArr] = useState(null);

    return (
        <View style={{flex: 1}}>
            <RelappLogo/>
            <View style={styles.container}>
                <Space size = {30}/>
                <RelappSearch onChangeText = {(text)=>{setText(text)}}/>
                <Space size = {20}/>
                <View style={styles.container2}>
                    <ScrollView>
                        <RouteItem  callback = {()=> props.navigation.navigate("SingleRoute")}/>
                        <Space size = {10} />
                        <RouteItem  callback = {()=> props.navigation.navigate("SingleRoute")}/>
                        <Space size = {10} />
                    </ScrollView>
                </View>
                <Space size = {20}/>
                <RelappButton style = {ButtonTypes().largeButton} text = "Create New" callback = {()=> props.navigation.navigate("CreateRoute")}/>
                <Space size = {20}/>
            </View>
        </View>
    )
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
        backgroundColor: '#F0E6E6',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
})
