import {View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, Alert} from "react-native";
import MapView from "react-native-maps";
import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import ShowingMap from "./Maps/ShowingMap";
import {
    IconsComponent, RelappLogo, RelappToolBar,
    Space
} from "../components/stylingComponents";
import AddDescription from "./AddDescription";
import {RelappTextInput} from "../components/RelappTextInput";
import {ButtonTypes, RelappButton} from "../components/RelappButton";
import SelectMusic from "./SelectMusic";
import {
    AddressFields,
    CreationModalButtons,
    HorizontalSpace,
    RouteHeader,
    RouteStyles,
} from "./RoutesStyles";
import InsertionMap from "./Maps/InsertionMap";
import {insertRoute} from "../databaseServices/RouteService";
import {insertAddressRecord} from "../databaseServices/AddressService";

export default function CreateRoute(props)
{
    const [musicModal, setMusicModalModal] = useState(false);
    const [descriptionModal, setDescriptionModal] = useState(false);

    const [coordinates, setCoordinates] = useState(null);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");

    let mapRef = null;
    let addressRef = null;

    const generateSendRequest = ()=>
    {
        //console.log("-----------------------------------------------------------");
        const ownerId = "YSyq7X6EstfICCEB8KMq2EDtjjS2";
        const address = addressRef.getSomething();
        const coords =
            mapRef.getMarkers().map(
                (x,index)=>
                {
                    return {...x, index:index};
                }
            );

        if(title !==""&& address.region !==""&&
            address.city !==""&&description !==""
            &&address.country !==""&&coordinates !=="")
        {
            insertRoute(description, title, ownerId).then(r =>
                {
                    insertAddressRecord(address.city, address.region, address.country, r, coords).then(r =>
                        {
                            //console.log("CREATED ",r);
                            props.navigation.navigate("Route");
                        }
                    )
                }
            )
        }
        else {
            Alert.alert('Check data! ');
        }
    }
    return (
        <View style={{flex: 1}}>
            <RelappToolBar text = {"Create New"} callback = {()=>props.navigation.goBack()}/>
            <View style={RouteStyles.container}>
                <ScrollView>
                    <Space size = {20}/>
                    <RouteHeader text = {"Set route title"}/>
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <RelappTextInput defaultValue = {"Title"}
                                             onChangeText={(text)=>{setTitle(text)}}
                        />
                    </View>
                    <Space size = {20}/>
                    <AddressFields ref={(ref) => {
                        addressRef = ref;
                    }} />
                    <Space size = {20}/>
                    <RouteHeader text = {"Select route locations"}/>
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <InsertionMap
                            ref={(ref) => {mapRef = ref;}}
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
