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
            <View style={styles.circle} >
                <Text>Total distance</Text>
                <Text style={styles.statisticsTextFont}>{userStats.totalDistance} km</Text>
            </View>
            <View style={styles.circle} >
                <Text>Routes</Text>
                <Text style={styles.statisticsTextFont}>{userStats.routeCount}</Text>
            </View>
            <View style={styles.circle} >
                <Text>Total time</Text>
                <Text style={styles.statisticsTextFont}>{userStats.totalHours} h</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    statisticsContainer: {
        flex:1,
        width:"100%",
        flexDirection:"row",
        justifyContent:'space-evenly'
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 100/2,
        backgroundColor: '#4B5268',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statisticsTextFont: {
        fontSize: 15
    }
})

