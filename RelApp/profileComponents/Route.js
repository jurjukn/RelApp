import {View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {getAddressByRouteId} from '../databaseServices/AddressService';

export function Route(props)
{
    async function handleEditRouteBtn() {
        try {
            let data = await getAddressByRouteId(props.data.id);
            let address = {city: data.city, country: data.country, region: data.region};
            let coordinates = data.coordinates;
            const route = {title: props.data.name, description: props.data.description, coordinates: coordinates, address: address}
            props.navigation.navigate("CreateRoute", {route})
        } catch (err) {
            console.log(err);
        }     
    }

    return (
        <View style={styles.customView}>
            <View style={styles.mainView}>
                <Text style={styles.textStyle}>{props.data.name}</Text>
            </View>
            <View style={styles.secondView}>
                <View style={styles.descriptionView}>
                    <Text style={{color: '#333333'}}> {props.data.description} </Text>
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
