import {View, Text, StyleSheet} from "react-native";
import React from "react";
import {MainColors} from "../components/stylingComponents";

export default function RouteStatistics({routeName, date, time, distance, difficulty, myRate})
{
    function secondsToHms(d) {
        d = Number(d);
        const h = Math.floor(d / 3600);
        const m = Math.floor(d % 3600 / 60);
        const s = Math.floor(d % 3600 % 60);

        const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return hDisplay + mDisplay + sDisplay;
    }

    return (
        <View style={Styles.customView}>
            <View style={Styles.mainView}>
                <Text style={Styles.title} >{routeName}</Text>
            </View>
            <View style={Styles.secondView}>
                <View style={{width:'50%'}}>
                    <Text style={Styles.text}>Date: {date} </Text>
                </View>
                <View style={{width:'50%'}}>
                    <Text style={Styles.text}>Time: {secondsToHms(time)}</Text>
                </View>
                <View style={{width:'50%'}}>
                    <Text style={Styles.text}>Steps: {Math.round(distance)}</Text>
                </View>
                <View style={{width:'50%'}}>
                    <Text style={Styles.text}>Difficulty: {difficulty}/10</Text>
                </View>
                <View style={{width:'50%'}}>
                    <Text style={Styles.text}>My Rate: {myRate}</Text>
                </View>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    customView: {
        width: 330,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: MainColors.iconGrey,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
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
    title:{
        fontWeight: 'bold',
        color: MainColors.iconGrey,
        fontSize: 20,
    },
    text:{
        color: MainColors.iconGrey,
        fontSize: 15,
        marginLeft: 15,
        marginBottom: 5,
    },
})
