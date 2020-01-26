import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {IconsComponent, MainColors} from "../components/stylingComponents";
import {addRouteAsFavorite, removeRouteFromFavorites} from "../databaseServices/RouteService";

export function RouteItem(props)
{
    const routeData = props.data.routeData;
    const userData = props.data.currentUser;
    const [favorite, isFavorite] = useState(routeData.isFavorite);

    return (
        <View style={RouteItemStyles.itemBody}>
            <View style={RouteItemStyles.titleView}>
                <TouchableOpacity   onPress={()=>{
                    props.callback()
                }}>
                    <Text style={RouteItemStyles.textStyle} >{routeData.title} </Text>
                </TouchableOpacity>
            </View>
            <View style={RouteItemStyles.secondView}>
                <View style={RouteItemStyles.descriptionView}>
                    <Text>{routeData.description}</Text>
                </View>
                <IconsComponent name = {favorite === true ? 'md-star': 'md-star-outline'}
                                style={RouteItemStyles.iconView}
                                callback = {()=>{
                                    if(favorite) {
                                        removeRouteFromFavorites(userData.id, routeData.id).then();
                                    }else {
                                        addRouteAsFavorite(userData.id, routeData.id).then();
                                    }
                                    isFavorite(!favorite);
                                }}/>
            </View>
        </View>
    )
}

export const RouteItemStyles = StyleSheet.create({
    itemBody: {
        flex: 1,
        width: '95%',
        flexDirection: 'column',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: MainColors.backgroundColor,
    },
    titleView:{
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondView: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
    },

    descriptionView: {
        width: '85%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconView:{
        width: '15%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle:{
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20,
    },
});
