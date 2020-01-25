import {StyleSheet, Text, View} from "react-native";
import {RelappToolBar} from "../../../components/stylingComponents"
import React from "react";
import {ButtonTypes, RelappButton} from "../../../components/RelappButton";
import {MainColors} from "../../../components/stylingComponents";

export default function StatisticsScreen(props)
{
    function proceedToNextScreen(){
        const duration = props.navigation.getParam('duration', 'default_value')
        const route = props.navigation.getParam('route', 'default_value')
        const durationInSeconds = Number(duration.durationMinutes)*60 + Number(duration.durationSeconds)
        props.navigation.navigate("RatingScreen", {duration: durationInSeconds, distance: props.navigation.state.params.distance, route: route})
    }

    return (
        <View style={{flex:1, backgroundColor: 'white'}}>
            <RelappToolBar text = "Statistics"
                fontSize = {32}
            />
            <View style={styles.container}>
                <View style={styles.statsContainer}>
                    <View>
                        <View style={styles.circle1}>
                            <Text style={styles.statisticsTextFont1}>Steps</Text>
                            <Text style={styles.statisticsTextFont2}>{Math.round(props.navigation.state.params.distance)}</Text>
                        </View>
                    </View>
                    <View style={{flex:2, alignItems: 'flex-end', marginTop:5, marginLeft: "40%"}}>
                        <View style={styles.circle2}>
                            <Text style={styles.statisticsTextFont1}>Duration</Text>
                            <Text style={styles.statisticsTextFont2}>
                                {props.navigation.state.params.duration.durationMinutes} : {props.navigation.state.params.duration.durationSeconds}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.innerContainer}>
                    <RelappButton 
                        style = {ButtonTypes().largeButton} 
                        text = "Next" 
                        callback = {()=>{proceedToNextScreen()}}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    statisticsTextFont1: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    statisticsTextFont2: {
        fontSize: 18,
        margin:10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    statsContainer: {
        flex:1,
        flexDirection:"column", 
        width:"100%", 
        alignItems:"flex-start", 
        justifyContent:"space-evenly",
        padding:10,
        flexWrap: 'wrap',
        marginTop: 30,
    },
    innerContainer: {
        flex:1, 
        width:"100%", 
        alignItems:"center", 
        justifyContent:"center",
        padding:10
    },
    circle1: {
        width: 180,
        height: 180,
        borderRadius: 180/2,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle2: {
        width: 180,
        height: 180,
        borderRadius: 180/2,
        backgroundColor: MainColors.greenColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
