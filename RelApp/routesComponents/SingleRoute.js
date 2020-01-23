import {View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";
import MapView from "react-native-maps";
import React, {useState} from "react";
import ShowingMap from "./Maps/ShowingMap";
import {
    IconsComponent,
    RelappLogo, RelappToolBar,
    Space
} from "../components/stylingComponents";
import {RouteAddress, RouteDescription, RouteHeader, RouteStart, RouteStyles} from "./RoutesStyles";
import {addRouteAsFavorite, getRouteById, removeRouteFromFavorites} from "../databaseServices/RouteService";
import RouteCommentsModal from "./routeComments/RouteCommentsModal"
import {getAddressByRouteId} from "../databaseServices/AddressService";
import {ButtonTypes, RelappButton} from "../components/RelappButton";
import {coordinatesExample} from "./Maps/MapFunctions";

const hardcodedUserComments = [
    {
        UserId: "Rapolas ",
        Comment: "Veri gud veri naisVeri gud veri naisVeri gud veri naisVeri gud veri naisVeri gud veri naisVeri gud veri nais "
    },
    {
        UserId: "Leopoldas ",
        Comment: "Veri bad veri gud"
    }
];

export default function SingleRoute(props)
{
    const [data, setData] = useState(null);
    const [address, setAddress] = useState(null);
    const [favorite, isFavorite] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    // here we should fetch comments and add to array, maybe fetch username?

    function closeCommentsModal() {
        setModalVisible(false)
    }

    if(data===null)
    {
        const routeData = props.navigation.getParam('routeData', 'default value')
        //console.log(routeData);
        setData(routeData);
        isFavorite(routeData.isFavorite);
        getAddressByRouteId(routeData.id).then(r=>
        {
            //console.log("address", r);
            if(r!== undefined )
            {
                setAddress(r);
            }
        });

    }

    const selectIconName = () =>
    {
        if(favorite) {
            return 'md-star'
        }
        else {
            return 'md-star-outline'
        }
    }

    const commentsIcon = {
        name:"md-chatboxes",
        callback:()=>{setModalVisible(true)}
    };

    const favoriteIcon = {
        name:selectIconName(),
        callback:()=>{
            isFavorite(!favorite)
        }
    };

    return (
        <View style={{flex: 1}}>
            <RelappToolBar text = {data===null ? null : data.name}
                           fontSize = {32}
                           callback = {()=>props.navigation.goBack()}
                           secondIcon = {favoriteIcon}
                           thirdIcon = {commentsIcon}
            />
            <View style={RouteStyles.container}>
                <ScrollView>
                    {modalVisible === true &&
                        <View style={{width:"100%"}}>
                        <RouteCommentsModal
                        modalVisible={true}
                        stopShowingModal={()=>closeCommentsModal()}
                        comments = {hardcodedUserComments}
                        />
                        </View>
                    }
                    <Space size = {20}/>
                    <RouteDescription description = {data===null ? null : data.description}/>
                    <Space size = {20}/>
                    <RouteAddress country ={address===null ? null : address.country}
                                  region ={address===null ? null : address.region}
                                  city ={address===null ? null : address.city}/>
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <ShowingMap markers ={address=== null ? null : address.coordinates}/>
                    </View>
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <RelappButton style = {ButtonTypes().largeButton}
                                      text = "Start"
                                      callback = {()=>{props.navigation.navigate("Progress")}}/>
                    </View>
                    <Space size = {20}/>
                </ScrollView>
            </View>
        </View>
    )
}
