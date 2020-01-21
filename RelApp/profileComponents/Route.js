import {View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function Route(props)
{
    const data = props.data;
    return (
        <View style={styles.customView}>
            <View style={styles.mainView}>
                <TouchableOpacity onPress={()=> { Alert.alert("Pressed")}}>
                    <Text style={styles.textStyle}>{data.name}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.secondView}>
                <View style={styles.descriptionView}>
                    <Text style={{color: '#333333'}}> {data.description} </Text>
                </View>

                <TouchableOpacity  onPress={() => Alert.alert('Edit route pressed')}>
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
