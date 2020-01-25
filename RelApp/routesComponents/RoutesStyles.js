import {IconsComponent, MainColors, Space} from "../components/stylingComponents";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {ButtonTypes, RelappButton} from "../components/RelappButton";
import {RelappMiniTextInput} from "../components/RelappTextInput";

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
        <View style={{flex:1}}>
            <View style={RouteStyles.centeredContainer}>
                <MiniTextField text = {props.country}/>
                <HorizontalSpace size = {20}/>
                <MiniTextField text = {props.region}/>
            </View>
            <Space size = {10}/>
            <View style={RouteStyles.centeredContainer}>
                <MiniTextField text = {props.city}/>
            </View>
        </View>
    )
}
function MiniTextField(props)
{
    return(
        <View style = {styles.miniTextField}>
            <Text style={styles.descriptionText}> {props.text} </Text>
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

export function AddressFields(props, ref) {
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");

    const ReturnAddress = ()=>
    {
        return(
            {
                country:country,
                region:region,
                city:city,
            }
        )
    }

    useImperativeHandle(ref, () => ({
        getSomething: () => {
            return ReturnAddress()
        }
    }));

    return(
        <View style={{flex:1}}>
            <RouteHeader text = {"Set route address"}/>
            <Space size = {20}/>
            <View style={RouteStyles.centeredContainer}>
                <RelappMiniTextInput defaultValue  = {props.defaultValue === null ? "Country" : props.defaultValue.country}
                                     onChangeText={(text)=>{setCountry(text)}}
                />
                <HorizontalSpace size = {20}/>
                <RelappMiniTextInput defaultValue = {props.defaultValue === null ? "Region" : props.defaultValue.region}
                                     onChangeText={(text)=>{setRegion(text)}}
                />
            </View>
            <Space size = {10}/>
            <View style={RouteStyles.centeredContainer}>
                <RelappMiniTextInput defaultValue = {props.defaultValue === null ? "City" : props.defaultValue.city}
                                     onChangeText={(text)=>{setCity(text)}}
                />
            </View>
        </View>
    )
}
AddressFields = forwardRef(AddressFields);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MainColors.backgroundColor,
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
        backgroundColor:MainColors.backgroundColor,
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
        height: 100,
        flexDirection: 'column',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: MainColors.greyBackgroundColor,
    },
    miniTextField: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '40%',
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: MainColors.greyBackgroundColor,
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
