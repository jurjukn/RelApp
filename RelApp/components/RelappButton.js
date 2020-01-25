import React from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {MainColors} from "./stylingComponents";

export function RelappButton(props)
{
    return(
        <View style={props.style.buttonStyle}>
            <TouchableOpacity   onPress={props.callback}>
                <Text style={props.style.textStyle} >{props.text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export const ButtonTypes = ()=>
{
    return(
        {
            smallButton:{buttonStyle:ButtonStyles.miniButton, textStyle:ButtonStyles.smallerButtonText},
            mediumButton:{buttonStyle:ButtonStyles.mediumButton, textStyle:ButtonStyles.smallerButtonText},
            largeButton:{buttonStyle:ButtonStyles.button, textStyle:ButtonStyles.buttonText},
        }
    )
}

const ButtonStyles = StyleSheet.create({
    button: {
        width: '90%',
        height: 40,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: MainColors.greenColor,
        borderColor: MainColors.containerBackground,
    },
    miniButton: {
        width: '30%',
        height: 50,
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: MainColors.greenColor,
        borderColor: MainColors.containerBackground,
    },
    mediumButton: {
        width: '50%',
        height: 40,
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: MainColors.greenColor,
        borderColor: MainColors.containerBackground,
    },
    buttonText: {
        fontWeight: 'bold',
        color:  MainColors.textWhite,
        fontSize: 20,
    },
    smallerButtonText: {
        fontWeight: 'bold',
        color:  MainColors.textWhite,
        fontSize: 17,
        textAlign: 'center',
    },
})