import {View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function Route(props)
{
    const data = props.data;
    const handleEditRouteBtn = () => {
        //const address = {region: data.address.region, city: data.address.city};
        //const route = {title: data.name, description: data.description, coordinates: data.coordinates, address}
        
        /*
        There are no address and coordinates retrieved from db
        Current route object:
        Object {
            "description": "Example description683",
            "id": "1b9da03f-4a59-47bc-a35e-fceaee4d1399",
            "isFavorite": false,
            "name": "Example title683",
            "ownerId": "YSyq7X6EstfICCEB8KMq2EDtjjS2",
        },
        */

        //props.navigation.navigate("CreateRoute", {route})
        Alert.alert("Edit route pressed")
    }
    return (
        <View style={styles.customView}>
            <View style={styles.mainView}>
                <Text style={styles.textStyle}>{data.name}</Text>
            </View>

            <View style={styles.secondView}>
                <View style={styles.descriptionView}>
                    <Text style={{color: '#333333'}}> {data.description} </Text>
                </View>

                <TouchableOpacity  onPress={() => handleEditRouteBtn()}>
                        <MaterialCommunityIcons
                            name={"square-edit-outline"}
                            size={45}
                            color={"#333333"}
                        />
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    customView: {
        width: 330,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#333333',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    mainView:{
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondView: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    descriptionView: {
        width: '85%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle:{
        fontWeight: 'bold',
        color: '#333333',
        fontSize: 20,
    },
})
