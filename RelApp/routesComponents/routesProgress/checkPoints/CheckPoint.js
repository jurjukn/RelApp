import {View, Text, StyleSheet} from "react-native";
import React from "react";
import {MainColors} from '../../../components/stylingComponents';

export default function CheckPoint({distance, title, Visited})
{
    return (
        <View style={Styles.customView}>
            <View style={Styles.mainView}>
                <Text style={Styles.textStyle} >{title} </Text>
            </View>
            <View style={Styles.secondView}>
                <View>
                    <Text style={{fontSize: 18, color: MainColors.textDarkGrey}}>{Math.round(distance)/1000} km</Text>
                </View>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    customView: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: MainColors.borders,
        backgroundColor: MainColors.containerBackground,
        marginBottom: 20,
    },
    mainView:{
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding:3
    },
    secondView: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        padding:1
    },
    textStyle:{
        fontWeight: 'bold',
        color: MainColors.textDarkGrey,
        fontSize: 22,
    },
})
