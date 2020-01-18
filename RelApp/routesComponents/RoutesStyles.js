import {IconsComponent} from "../components/stylingComponents";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {ButtonTypes, RelappButton} from "../components/RelappButton";

export function RouteStart (props)
{
    return(
        <View style={{...styles.locationContainer, justifyContent: 'flex-start',}}>
            <RelappButton style = {ButtonTypes().smallButton} text = "Start"
                          callback = {props.callback}/>
            <IconsComponent name = {props.favorite()} style={{...styles.iconView, left:'200%'}}
                            callback = {props.isFavorite}/>
            <IconsComponent name = {"md-chatboxes"} style={{...styles.iconView, left:'300%'}}
                            callback = {props.showComents}/>
        </View>
    )
}

export function RouteDescription (props)
{
    return(
        <View style={styles.locationContainer}>
            <View style={styles.descriptionView}>
                <ScrollView>
                    <Text style={styles.descriptionText} >{props.description}</Text>
                </ScrollView>
            </View>
        </View>
    )
}

export function RouteAddress (props)
{
    return(
        <View style={styles.locationContainer}>
            <Text style={styles.text}> {props.country} </Text>
            <Text style={styles.text}> {props.region} </Text>
            <Text style={styles.text}> {props.city} </Text>
        </View>
    )
}

export function RouteHeader (props)
{
    return(
        <View style = {styles.textView}>
            <Text style={styles.text}> {props.text} </Text>
        </View>
    )
}

export function CreationModalButtons (props)
{
    return(
        <View style={styles.locationContainer}>
            <HorizontalSpace size = {20}/>
            <RelappButton style = {ButtonTypes().smallButton} text = "Description"
                          callback = {props.descriptionCallback}/>
            <HorizontalSpace size = {20}/>
            <RelappButton style = {ButtonTypes().smallButton} text = "Select music"
                          callback = {props.musicCallback}/>
        </View>
    )
}


export function HorizontalSpace (props)
{
    return <View style={
        {
            width: props.size,
        }
    }/>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0E6E6',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    textView: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20,
    },
    locationContainer: {
        backgroundColor: '#F0E6E6',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    iconView:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    descriptionView: {
        flex: 1,
        width: '95%',
        height: 200,
        flexDirection: 'column',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: '#F0E6E6',

    },
    descriptionText: {
        color: 'black',
        fontSize: 18,
    },
})

export const RouteStyles = StyleSheet.create({
    container: styles.container,
    centeredContainer: styles.locationContainer,
    text: styles.text,
})
