import {View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";
import MapView from "react-native-maps";
import React, {useState} from "react";
import Map from "../routesComponents/Map";
import {
    RelappLogo,
    Space
} from "../components/stylingComponents";
import {RouteAddress, RouteDescription, RouteHeader, RouteStart, RouteStyles} from "./RoutesStyles";

export default function Route(props)
{
    const [favorite, isFavorite] = useState(false)
    const selectIconName = () =>
    {
        if(favorite) return 'md-star'
        else return 'md-star-outline'
    }
    return (
        <View style={{flex: 1}}>
            <RelappLogo callback = {()=>props.navigation.goBack()}/>
            <View style={RouteStyles.container}>
                <ScrollView>
                    <Space size = {5}/>
                    <View style={RouteStyles.centeredContainer}>
                        <Text style={{...RouteStyles.text,fontSize: 32,}} > {"Route IV"} </Text>
                    </View>
                    <Space size = {20}/>
                    <RouteStart
                        callback = {()=>{props.navigation.navigate("Progress")}}
                        favorite = {selectIconName}
                        isFavorite = {()=>{isFavorite(!favorite)}}
                        showComents =  {()=>{console.log("Start")}}
                       />
                    <Space size = {20}/>
                    <RouteDescription
                        description = {"Lorem Ipsum"}
                        />
                    <Space size = {20}/>
                    <RouteAddress
                        country ={"country"}
                        region ={"region"}
                        city ={"city"}
                        />
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <Map/>
                    </View>
                    <Space size = {20}/>
                </ScrollView>
            </View>
        </View>
    )
}



