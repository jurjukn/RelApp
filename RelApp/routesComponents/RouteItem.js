import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {IconsComponent, Space} from "../components/stylingComponents";
import {addRouteAsFavorite, removeRouteFromFavorites} from "../databaseServices/RouteService";

// Object {
//     "description": "Some random description",
//         "id": "23Pofwb8jT15SenciHg6",
//         "isFavorite": false,
//         "name": "Amazing route 1",
//         "ownerId": "User1",
// }


export function RouteItem(props)
{
    const data = props.data;
    const [favorite, isFavorite] = useState(data.isFavorite);
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
        <View style={RouteItemStyles.customView}>
            <View style={RouteItemStyles.mainView}>
                <TouchableOpacity   onPress={()=>{
                    props.callback()
                }}>
                    <Text style={RouteItemStyles.textStyle} >{data.name} </Text>
                </TouchableOpacity>
            </View>
            <View style={RouteItemStyles.secondView}>
                <View style={RouteItemStyles.descriptionView}>
                    <Text>{data.description}</Text>
                </View>
                <IconsComponent name = {selectIconName()} style={RouteItemStyles.iconView} callback = {()=>{
                    isFavorite(!favorite);
                }}/>
            </View>
        </View>
    )
}

export const RouteItemStyles = StyleSheet.create({
    customView: {
        flex: 1,
        width: '95%',
        flexDirection: 'column',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: '#F0E6E6',
    },
    mainView:{
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
})
