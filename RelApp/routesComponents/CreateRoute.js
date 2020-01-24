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
    const checkNavigation = props.navigation.getParam('route', 'default value');
    let editRoute = null;
    if(checkNavigation!=='default value')
    {
        editRoute = checkNavigation;
    }

    const [musicModal, setMusicModalModal] = useState(false);
    const [descriptionModal, setDescriptionModal] = useState(false);
    const [description, setDescription] = useState(editRoute=== null ? "" : editRoute.description);
    const [title, setTitle] =useState(editRoute===null ? "" : editRoute.title);

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
            &&address.country !==""&& coords !==[])
        {
            insertRoute(description, title, ownerId).then(r =>
                {
                    insertAddressRecord(address.city, address.region, address.country, r, coords).then(r =>
                        {
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
            <RelappToolBar text = {editRoute === null ? "Create New" : "Edit Route"} callback = {()=>props.navigation.goBack()}/>
            <View style={RouteStyles.container}>
                <ScrollView>
                    <Space size = {20}/>
                    <RouteHeader text = {"Set route title"}/>
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <RelappTextInput
                            defaultValue = {editRoute === null ? "Title" : editRoute.title}
                            onChangeText={(text)=>{setTitle(text)}}
                        />
                    </View>
                    <Space size = {20}/>
                    <AddressFields
                        data = {editRoute === null ? null : editRoute.address}
                        ref={(ref) => {addressRef = ref;}} />
                    <Space size = {20}/>
                    <RouteHeader text = {"Select route locations"}/>
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <InsertionMap
                            data = {editRoute === null ? null : editRoute.coordinates}
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
                <AddDescription
                    data = {editRoute === null ? null : editRoute.description}
                    sendInfo = {setDescription}
                    setModalVisible = {descriptionModal}/>
                <SelectMusic setModalVisible = {musicModal}/>
            </View>
        </View>
    )
}
