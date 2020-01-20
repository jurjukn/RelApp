import {View, Text, StyleSheet} from "react-native";
import React from "react";

export default function RouteComment({userId, comment})
{
    return (
        <View style={Styles.customView}>
            <View style={Styles.mainView}>
                <Text style={Styles.textStyle} >{userId}</Text>
            </View>
            <View style={Styles.secondView}>
                <View>
                    <Text>{comment} </Text>
                </View>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    customView: {
        flex: 1,
        width: '95%',
        flexDirection: 'column',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: '#F0E6E6',
        marginBottom:10
    },
    mainView:{
        width: '100%',
        height: 50,
        alignItems: "flex-start",
        justifyContent: 'center',
        padding:10
    },
    secondView: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        padding:10
    },
    textStyle:{
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20,
    },
})
