import {View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";
import MapView from "react-native-maps";
import React, {useState} from "react";
import Map from "../routesComponents/Map";
import {
    RelappLogo,
    Space
} from "../components/stylingComponents";
import {RouteAddress, RouteDescription, RouteHeader, RouteStart, RouteStyles} from "./RoutesStyles";
import {addRouteAsFavorite, getRouteById, removeRouteFromFavorites} from "../databaseServices/RouteService";
import RouteCommentsModal from "./routeComments/RouteCommentsModal"

export default function SingleRoute(props)
{
    const [data, setData] = useState(null);
    const [address, setAddress] = useState(null);
    const [favorite, isFavorite] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)
    // here we should fetch comments and add to array, maybe fetch username?
    const hardcodedUserComments = [
        {
            UserId: "Rapolas ", 
            Comment: "Veri gud veri naisVeri gud veri naisVeri gud veri naisVeri gud veri naisVeri gud veri naisVeri gud veri nais "
        }, 
        {
            UserId: "Leopoldas ", 
            Comment: "Veri bad veri gud"
        }
    ]

    function closeCommentsModal() {
        setModalVisible(false)
    }

    if(data===null)
    {
        const routeData = props.navigation.getParam('routeData', 'default value')
        console.log(routeData);
        setData(routeData);
        isFavorite(routeData.isFavorite);
        //getting full address of route
        //getRouteById(routeData.id).then(r=>  setAddress(r));
        //create comments screen
    }

    const selectIconName = () =>
    {
        if(favorite) {
            //no ideas with user is currently working
            addRouteAsFavorite(data.ownerId, data.id).then(r => console.log(r));
            return 'md-star'
        }
        else {
            //no ideas with user is currently working
            removeRouteFromFavorites(data.ownerId, data.id).then(r => console.log(r));
            return 'md-star-outline'
        }
    }
    return (
        <View style={{flex: 1}}>
            <RelappLogo callback = {()=>props.navigation.goBack()}/>
            <View style={RouteStyles.container}>
                <ScrollView>
                    <Space size = {5}/>
                    <View style={RouteStyles.centeredContainer}>
                        <Text style={{...RouteStyles.text,fontSize: 32,}} > {data===null ? null : data.name} </Text>
                    </View>
                    <Space size = {20}/>
                    <RouteStart
                        callback = {()=>{props.navigation.navigate("Progress")}}
                        favorite = {selectIconName}
                        isFavorite = {()=>{isFavorite(!favorite)}}
                        showComents =  {()=>{setModalVisible(true)}}
                       />
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
                    <RouteDescription
                        description = {data===null ? null : data.description}
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



