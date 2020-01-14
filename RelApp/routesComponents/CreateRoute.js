import {View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";
import MapView from "react-native-maps";
import React, {useState} from "react";
import Map from "../routesComponents/Map";
import {
    IconsComponent,
    Space
} from "../components/stylingComponents";
import AddDescription from "./AddDescription";
import {RelappMiniTextInput} from "../components/RelappTextInput";
import {ButtonTypes, RelappButton} from "../components/RelappButton";
import SelectMusic from "./SelectMusic";
import {
    CreateRouteToolbar,
    CreationModalButtons,
    HorizontalSpace,
    RouteHeader,
    RouteStyles,
} from "./RoutesStyles";

export default function CreateRoute(props)
{
    const [musicModal, setMusicModalModal] = useState(false);
    const [descriptionModal, setDescriptionModal] = useState(false);

    return (
        <View style={RouteStyles.container}>
            <ScrollView>
                <Space size = {20}/>
                <CreateRouteToolbar
                    goBack = {()=>props.navigation.goBack()}
                />
                <Space size = {20}/>
                <View style={RouteStyles.centeredContainer}>
                    <RelappMiniTextInput defaultValue = {"Country"}/>
                    <HorizontalSpace size = {20}/>
                    <RelappMiniTextInput defaultValue = {"Region"} />
                </View>
                <Space size = {20}/>
                <RouteHeader text = {"Select route locations"}/>
                <Space size = {20}/>
                <View style={RouteStyles.centeredContainer}>
                    <Map/>
                </View>
                <Space size = {20}/>
                <CreationModalButtons
                    descriptionCallback = {()=>{
                        setDescriptionModal(!descriptionModal);
                        console.log("Description")
                    }}
                    musicCallback = {()=>{
                        setMusicModalModal(!musicModal);
                        console.log("Select music")
                    }}/>
                <Space size = {20}/>
                <View style={RouteStyles.centeredContainer}>
                    <RelappButton style = {ButtonTypes().largeButton} text = "Create New" callback = {()=>{console.log("Search")}}/>
                </View>
                <Space size = {20}/>
            </ScrollView>
            <AddDescription setModalVisible = {descriptionModal}/>
            <SelectMusic setModalVisible = {musicModal}/>
        </View>
    )
}

