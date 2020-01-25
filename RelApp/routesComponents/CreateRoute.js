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
import {insertRoute, updateRoute} from "../databaseServices/RouteService";
import {getAddressByRouteId, insertAddressRecord, updateAddressRecord} from "../databaseServices/AddressService";

export default function CreateRoute(props)
{
    const currentUser = props.navigation.getParam('currentUser', 'default value');
    const checkNavigation = props.navigation.getParam('route', 'default value');
    let editRoute = null;
    if(checkNavigation!=='default value')
    {
        editRoute = checkNavigation;
    }

    const [musicModal, setMusicModalModal] = useState(false);
    const [descriptionModal, setDescriptionModal] = useState(false);
    const [description, setDescription] = useState("");
    const [music, setMusic] = useState("");
    const [title, setTitle] =useState("");

    let mapRef = null;
    let addressRef = null;

    const generateSendRequest = ()=>
    {
        const address = addressRef.getSomething();
        const coords =
            mapRef.getMarkers().map(
                (x,index)=>
                {
                    return {...x, index:index};
                }
            );
        console.log("___________updateRoute____________ ", editRoute);
        if(editRoute===null) {
            if (title !== "" && address.region !== "" && address.city !== ""
                && description !== ""  && music !== ""
                && address.country !== "" && coords !== []) {
                insertRoute(description, title, currentUser.id,"www.example.com").then(r => {
                        insertAddressRecord(address.city, address.region, address.country, r, coords).then(r => {
                                props.navigation.navigate("Route");
                            }
                        )
                    }
                )
            } else {
                Alert.alert('Check data! ');
            }
        }else {
            let oldRoute = editRoute.route;
            let oldAddress = editRoute.address;
            let newRoute = {
                id:oldRoute.id,
                title: title==="" ?oldRoute.title : title,
                description: description==="" ? oldRoute.description : description,
                address:{
                    id:oldAddress.id,
                    region: address.region === "" ? oldAddress.region : address.region,
                    country: address.country === "" ? oldAddress.country : address.country,
                    city: address.city === "" ? oldAddress.city : address.city,
                },
                coordinates:coords,
                playlistUrl:oldRoute.playlistUrl,
            };
            //console.log("___________updateRoute____________ ", newRoute);
            updateRoute(newRoute.description, newRoute.title, newRoute.playlistUrl, newRoute.id).then(r =>
                {
                    updateAddressRecord(newRoute.address.id, newRoute.address.city,
                        newRoute.address.region, newRoute.address.country, newRoute.coordinates).then();
                }
            )
       }
    };

    return (
        <View style={{flex: 1}}>
            <RelappToolBar text = {editRoute === null ? "Create New" : "Edit Route"} callback = {()=>props.navigation.goBack()}/>
            <View style={RouteStyles.container}>
                <ScrollView>
                    <Space size = {20}/>
                    <RouteHeader text = {"Set route title"}/>
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <RelappTextInput
                            defaultValue = {editRoute === null ? "Title" : editRoute.route.title}
                            onChangeText={(text)=>{setTitle(text)}}
                        />
                    </View>
                    <Space size = {20}/>
                    <AddressFields
                        defaultValue = {editRoute === null ? null : editRoute.address}
                        ref={(ref) => {addressRef = ref;}} />
                    <Space size = {20}/>
                    <RouteHeader text = {"Select route locations"}/>
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <InsertionMap
                            defaultValue = {editRoute === null ? null : editRoute.address.coordinates}
                            ref={(ref) => {mapRef = ref;}}
                        />
                    </View>
                    <Space size = {20}/>
                    <CreationModalButtons
                        descriptionCallback = {()=>{
                            setDescriptionModal(!descriptionModal);
                        }}
                        musicCallback = {()=>{
                            setMusicModalModal(!musicModal);
                        }}/>
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <RelappButton style = {ButtonTypes().largeButton} text = "Create New"
                                      callback = {()=>{generateSendRequest()}}/>
                    </View>
                    <Space size = {20}/>
                </ScrollView>
                <AddDescription
                    defaultValue = {editRoute === null ? null : editRoute.route.description}
                    sendInfo = {setDescription}
                    setModalVisible = {descriptionModal}/>
                <SelectMusic
                    setModalVisible = {musicModal}
                    defaultValue = {editRoute === null ? null : null}
                    sendInfo = {setMusic}
                />
            </View>
        </View>
    )
}
