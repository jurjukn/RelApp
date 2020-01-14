import {View, Text, StyleSheet} from "react-native";
import React from "react";

export default function RouteStatistics({routeName, date, time, distance, difficulty, myRate})
{
    return (
        <View style={Styles.customView}>
            <View style={Styles.mainView}>
                <Text style={Styles.textStyle} >{routeName}</Text>
            </View>
            <View style={Styles.secondView}>
                <View style={{width:'50%'}}>
                    <Text>Date: {date} </Text>
                </View>
                <View style={{width:'50%'}}>
                    <Text>Time: {time} minutes</Text>
                </View>
                <View style={{width:'50%'}}>
                    <Text>Distance: {distance} km</Text>
                </View>
                <View style={{width:'50%'}}>
                    <Text>Difficulty: {difficulty}</Text>
                </View>
                <View style={{width:'50%'}}>
                    <Text>My Rate: {myRate}</Text>
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
    },
    mainView:{
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondView: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    textStyle:{
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20,
    },
})
