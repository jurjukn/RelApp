import {View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, Alert} from "react-native";
import MapView from "react-native-maps";
import React, {useState} from "react";
import ShowingMap from "./ShowingMap";
import {
    IconsComponent, RelappLogo,
    Space
} from "../components/stylingComponents";
import AddDescription from "./AddDescription";
import {RelappMiniTextInput, RelappSearch} from "../components/RelappTextInput";
import {ButtonTypes, RelappButton} from "../components/RelappButton";
import SelectMusic from "./SelectMusic";
import {
    CreateRouteToolbar,
    CreationModalButtons,
    HorizontalSpace,
    RouteHeader,
    RouteStyles,
} from "./RoutesStyles";
import InsertionMap from "./InsertionMap";
import {insertRoute} from "../databaseServices/RouteService";
import {insertAddressRecord} from "../databaseServices/AddressService";

export default function CreateRoute(props)
{
    const [musicModal, setMusicModalModal] = useState(false);
    const [descriptionModal, setDescriptionModal] = useState(false);

    const [coordinates, setCoordinates] = useState(null);
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");

    const generateSendRequest = ()=>
    {
        if(title !==""&& region !==""&&
            city !==""&&description !==""
            &&country !==""&&coordinates !=="")
        {
            //insertRoute(routeExample).then(r => console.log(r));
            // insertAddressRecord(addressExample).then(r => console.log(r));
            console.log("CREATE");
        }
        else {
            Alert.alert('Check data! ');
        }
    }

    return (
        <View style={{flex: 1}}>
            <RelappLogo callback = {()=>props.navigation.goBack()}/>
            <View style={RouteStyles.container}>
                <ScrollView>
                    <Space size = {20}/>
                    <RouteHeader text = {"Set route title"}/>
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <RelappSearch defaultValue = {"Title"}
                                             onChangeText={(text)=>{setTitle(text)}}
                        />
                    </View>
                    <Space size = {20}/>
                    <RouteHeader text = {"Set route address"}/>
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <RelappMiniTextInput defaultValue = {"Country"}
                                             onChangeText={(text)=>{setCountry(text)}}
                        />
                        <HorizontalSpace size = {20}/>
                        <RelappMiniTextInput defaultValue = {"Region"}
                                             onChangeText={(text)=>{setRegion(text)}}
                        />
                    </View>
                    <Space size = {10}/>
                    <View style={RouteStyles.centeredContainer}>
                        <RelappMiniTextInput defaultValue = {"City"}
                                             onChangeText={(text)=>{setCity(text)}}
                        />
                    </View>
                    <Space size = {20}/>
                    <RouteHeader text = {"Select route locations"}/>
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <InsertionMap
                            insert={setCoordinates}
                        />
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
                        <RelappButton style = {ButtonTypes().largeButton} text = "Create New"
                                      callback = {()=>{generateSendRequest()}}/>
                    </View>
                    <Space size = {20}/>
                </ScrollView>
                <AddDescription sendInfo = {setDescription} setModalVisible = {descriptionModal}/>
                <SelectMusic setModalVisible = {musicModal}/>
            </View>
        </View>
    )
}

