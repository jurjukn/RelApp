import {View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";
import MapView from "react-native-maps";
import React, {useState} from "react";
import Map from "../routesComponents/Map";
import {
    Space
} from "../components/stylingComponents";

import {RouteAddress, RouteDescription, RouteStart, RouteStyles, RouteToolbar} from "./RoutesStyles";

export default function Route(props)
{
    const [favorite, isFavorite] = useState(false)
    const selectIconName = () =>
    {
        if(favorite) return 'md-star'
        else return 'md-star-outline'
    }

    return (
        <View style={RouteStyles.container}>
            <ScrollView>
                <Space size = {20}/>
                <RouteToolbar
                    name = {"Route IV"}
                    setFavorite = {()=> isFavorite(!favorite)}
                    iconName = {selectIconName}
                    goBack = {()=>props.navigation.goBack()}
                />
                <Space size = {20}/>
                <RouteStart
                    callBack = {()=>{console.log("Start")}}
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
    )
}



