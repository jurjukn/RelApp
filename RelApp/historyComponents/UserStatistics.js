import {View, Text, StyleSheet} from "react-native";
import React from "react";

export default function History () {
    return (
        <View style={styles.statisticsContainer}>
            <View style={styles.circle} >
                <Text>Total distance</Text>
                <Text style={styles.statisticsTextFont}>13 km</Text>
            </View>
            <View style={styles.circle} >
                <Text>Average rate</Text>
                <Text style={styles.statisticsTextFont}>4.66</Text>
            </View>
            <View style={styles.circle} >
                <Text>Total time</Text>
                <Text style={styles.statisticsTextFont}>3.6 h</Text>
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

