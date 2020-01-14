import React from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";


export function RelappSearch(props)
{
    const isDefaultValueAvailable = props.defaultValue == null;
    return(
        <TextInput
            placeholder={isDefaultValueAvailable ? 'Search' : props.defaultValue}
            textAlign={'center'}
            style={SearchStyles.textStyle}
            onChangeText={props.onChangeText}
        />
    )
}

export function RelappMiniTextInput(props)
{
    return(
        <TextInput
            placeholder={props.defaultValue}
            textAlign={'center'}
            style={SearchStyles.miniTextStyle}
            onChangeText={props.onChangeText}
        />
    )
}

const SearchStyles = StyleSheet.create({
    textStyle: {
        height: 40,
        width:'80%',
        borderColor: 'black',
        borderWidth: 1.5,
        borderRadius: 10,
    },

    miniTextStyle: {
        height: 40,
        width:'40%',
        borderColor: 'black',
        borderWidth: 1.5,
        borderRadius: 10,
    },

})
