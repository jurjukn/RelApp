import {StyleSheet, Text, View} from "react-native";
import {RelappLogo} from "../../../components/stylingComponents"
import React from "react";
import {ButtonTypes, RelappButton} from "../../../components/RelappButton";
import {ProgressToolbar} from "../RoutePregessStyles";

export default function StatisticsScreen(props)
{
    function proceedToNextScreen(){
        const durationInSeconds = Number(props.navigation.state.params.duration.durationMinutes)*60 + Number(props.navigation.state.params.duration.durationSeconds)
        props.navigation.navigate("RatingScreen", {duration: durationInSeconds, distance: props.navigation.state.params.distance})
    }

    return (
        <View style={{flex:1}}>
            <RelappLogo /> 
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <ProgressToolbar header = {"Route IV"}/> 
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.circle}>
                        <Text>Steps</Text>
                        <Text style={styles.statisticsTextFont}>{props.navigation.state.params.distance}</Text>
                    </View>
                    <View style={styles.circle}>
                        <Text>Duration</Text>
                        <Text style={styles.statisticsTextFont}>
                            {props.navigation.state.params.duration.durationMinutes} : {props.navigation.state.params.duration.durationSeconds}
                        </Text>
                    </View>
                </View>
                <View style={styles.innerContainer}>
                    <RelappButton 
                        style = {ButtonTypes().mediumButton} 
                        text = "Next" 
                        callback = {()=>{proceedToNextScreen()}}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    statisticsTextFont: {
        fontSize: 15
    },
    container: {
        flex: 1,
        backgroundColor: '#F0E6E6',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    statsContainer: {
        flex:1,
        flexDirection:"row", 
        width:"100%", 
        alignItems:"flex-start", 
        justifyContent:"space-evenly",
        padding:10,
        flexWrap: 'wrap'
    },
    innerContainer: {
        flex:1, 
        width:"100%", 
        alignItems:"center", 
        justifyContent:"center",
        padding:10
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 150/2,
        backgroundColor: '#4B5268',
        alignItems: 'center',
        justifyContent: 'center',
    },

})
