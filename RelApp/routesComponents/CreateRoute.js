import {View, ScrollView, Alert} from "react-native";
import React, {useState} from "react";
import {RelappToolBar, Space} from "../components/stylingComponents";
import {RelappTextInput} from "../components/RelappTextInput";
import {ButtonTypes, RelappButton} from "../components/RelappButton";
import {AddressFields, CreationModalButtons, RouteHeader, RouteStyles,} from "./RoutesStyles";
import InsertionMap from "./Maps/InsertionMap";
import {getAllRoutes, insertRoute, updateRoute} from "../databaseServices/RouteService";
import {insertAddressRecord, updateAddressRecord} from "../databaseServices/AddressService";
import ModalComponent from "./ModalComponent";

export default function CreateRoute(props)
{
    const currentUser = props.navigation.getParam('currentUser', 'default value');
    const checkNavigation = props.navigation.getParam('route', 'default value');
    let oldRoute = null;
    let oldAddress = null;
    if(checkNavigation!=='default value')
    {
        oldRoute = checkNavigation.route;
        oldAddress= checkNavigation.address;
    }

    const [musicModal, setMusicModal] = useState(false);
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
        if(oldRoute===null) {
            if (title !== "" && address.region !== "" && address.city !== ""
                && description !== ""  && music !== ""
                && address.country !== "" && coords !== []) {
                insertRoute(description, title, currentUser.id,music).then(r => {
                        insertAddressRecord(address.city, address.region, address.country, r, coords).then(r => {
                                Alert.alert('Route created ! ');
                                props.navigation.navigate("Route");
                            }
                        )
                    }
                )
            } else {
                Alert.alert('Check data! ');
            }
        }else {
            let newRoute = {
                id:oldRoute.id,
                title: title==="" ? oldRoute.title : title,
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
            updateRoute(newRoute.description, newRoute.title, newRoute.playlistUrl, newRoute.id).then(r =>
                {
                    updateAddressRecord(newRoute.address.id, newRoute.address.city,
                        newRoute.address.region, newRoute.address.country, newRoute.coordinates).then(r=>
                        {
                            Alert.alert('Route update ! ');
                            props.navigation.navigate("Route");
                        }
                    );
                }
            )
       }
    };

    return (
        <View style={{flex: 1}}>
            <RelappToolBar text = {oldRoute === null ? "Create New" : "Edit Route"} callback = {()=>props.navigation.goBack()}/>
            <View style={RouteStyles.container}>
                <ScrollView>
                    <Space size = {20}/>
                    <RouteHeader text = {"Set route title"}/>
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <RelappTextInput
                            defaultValue = {oldRoute === null ? "Title" : oldRoute.title}
                            onChangeText={(text)=>{setTitle(text)}}
                        />
                    </View>
                    <Space size = {20}/>
                    <AddressFields
                        defaultValue = {oldAddress === null ? null : oldAddress}
                        ref={(ref) => {addressRef = ref;}} />
                    <Space size = {20}/>
                    <RouteHeader text = {"Select route locations"}/>
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <InsertionMap
                            defaultValue = {oldAddress === null ? null : oldAddress.coordinates}
                            ref={(ref) => {mapRef = ref;}}
                        />
                    </View>
                    <Space size = {20}/>
                    <CreationModalButtons
                        descriptionCallback = {()=>{
                            setDescriptionModal(!descriptionModal);
                        }}
                        musicCallback = {()=>{
                            setMusicModal(!musicModal);
                        }}/>
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <RelappButton style = {ButtonTypes().largeButton}
                                      text = {oldRoute===null ? "Create New" :  "Update Old"}
                                      callback = {()=>{generateSendRequest()}}/>
                    </View>
                    <Space size = {20}/>
                </ScrollView>
                <ModalComponent header = {"Description"}
                    title = {"Write short description about your route" }
                    defaultValue = {oldRoute === null ? "Description" : oldRoute.description}
                    sendInfo = {setDescription}
                    value = {description}
                    visible = {descriptionModal}
                    setModalVisible = {setDescriptionModal}
                />
                <ModalComponent header = {"Music"}
                    title = {"Upload URL of the Spotify playlist"}
                    defaultValue = {oldRoute === null ?  " Music URL " : oldRoute.playlistUrl}
                    sendInfo = {setMusic}
                    visible = {musicModal}
                    value = {music}
                    setModalVisible = {setMusicModal}
                />
            </View>
        </View>
    )
}
