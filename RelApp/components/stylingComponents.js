import React from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";


export const TopSeparator = ()=> {
    return(
        <View style={{
            width: '100%',
            height: 25,
            backgroundColor: 'gray',
        }}/>
    )
}

export const Space = (props)=>{
    return <View style={
        {
            height: props.size,
        }
    }/>}

//'#F0E6E6'

export function IconsComponent (props)
{
    return(
        <View style={props.style}>
            <TouchableOpacity  onPress={props.callback}>
                <Ionicons name={props.name} size={30} color={'black'} />
            </TouchableOpacity>
        </View>
    )
}

export const RelappLogo = ()=>{
    return (
        <View style= {{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0E6E6', }}>
            <Text style={{fontWeight: 'bold', fontSize:36}}>Relapp</Text>
        </View>
    )
}

export const RelappHeader = (props)=>{
    return (
        <View style= {{ alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{fontWeight: 'bold', fontSize:props.size, textAlign: 'center', }}  >{props.text}</Text>
        </View>
    )
}

export const BasicStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0E6E6',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
