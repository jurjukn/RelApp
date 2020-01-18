import React, {useState} from "react";
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
    return <View style={{height: props.size,}}/>}

//'#F0E6E6'
//getting view wight
// onLayout=
//     {(event) => {
//     const {x, y, width, height} = event.nativeEvent.layout;
//     if(props.setDimension !== undefined)props.setDimension(width);
// }}

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

export function RelappLogo(props)
{
    const iconWight = 26.3;
    return (
        <View style= {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0E6E6', }}>
            {props.callback !== undefined ?
                <IconsComponent name = {"md-undo"} style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                right:"200%",}}
                callback = {props.callback}
            /> : null}
            <Text style={{fontWeight: 'bold', fontSize:36, right:(props.callback !== undefined ? iconWight/2 : 0)}}>Relapp</Text>
        </View>
    )
}

export function RelappLogoForProfile(props)
{
    const iconWight = 26.3;
    return (
        <View style= {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0E6E6', }}>
            <Text style={{fontWeight: 'bold', fontSize:36, left:(props.help !== undefined ? iconWight : 0)}}>Relapp</Text>
            {props.help !== undefined ?
                <IconsComponent name = {"md-help-circle"} style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    left:"150%",}}
                    callback = {props.help}
                /> : null}
            {props.logOut !== undefined ?
                <IconsComponent name = {"md-log-out"} style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    left:"200%",}}
                                callback = {props.logOut}
                /> : null}
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
