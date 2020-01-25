import {View, Text, StyleSheet} from "react-native";
import React, {useState, useEffect} from "react";

import {calculateHistoryStatistics} from "./../databaseServices/HistoryService"

export default function UserStatistics ({userHistory}) {

    const [userStats, setUserStats] = useState(0)

    useEffect(() => {
        const temp = calculateHistoryStatistics(userHistory)
        setUserStats(temp)
    }, []);

    return (
        <View style={styles.statisticsContainer}>
            <View style={styles.square} >
                <Text style = {{fontWeight: 'bold', color: '#333333'}}>Total steps</Text>
                <Text style={styles.statisticsTextFont}>{Math.round(userStats.totalDistance)} </Text>
            </View>
            <View style={styles.square} >
                <Text style = {{fontWeight: 'bold', color: '#333333'}}>Routes</Text>
                <Text style={styles.statisticsTextFont}>{userStats.routeCount}</Text>
            </View>
            <View style={styles.square} >
                <Text style = {{fontWeight: 'bold', color: '#333333'}}>Total time</Text>
                <Text style={styles.statisticsTextFont}>{Math.round(userStats.totalHours*10)/10} h</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    statisticsContainer: {
        flex:1,
        width:"100%",
        flexDirection:"row",
        justifyContent:'space-evenly',
        marginTop: 10,
    },
    square: {
        width: 100,
        height: 60,
        borderRadius: 4,
        backgroundColor: '#F1F1F1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statisticsTextFont: {
        fontSize: 15
    },
})

