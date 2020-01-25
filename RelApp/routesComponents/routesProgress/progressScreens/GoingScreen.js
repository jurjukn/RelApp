import {TouchableOpacity, StyleSheet, Text, View, Button} from "react-native";
import {RelappToolBar} from "./../../../components/stylingComponents"
import React, {useState, useEffect} from "react";
import {ButtonTypes, RelappButton} from "../../../components/RelappButton";
import { Linking } from 'expo';
import { Pedometer } from "expo-sensors";
import ShowingMap from "../../Maps/ShowingMap";
import CheckPoint from "../checkPoints/CheckPoint"
import { Ionicons } from '@expo/vector-icons';

import TimeCounter from "./helpers/TimeCounter"

export default function GoingScreen(props)
{
    const [currentCheckPoint, setCurrentCheckPoint] = useState(null)
    const [checkPointReached, setCheckPointReached] = useState(false)
    const [checkPoints, setCheckPoints] = useState(false)
    const [currentRoute, setCurrentRoute] = useState(null)
    const [routeName, setRouteName] = useState("Undefined")
    const [distance, setDistance] = useState(0)

    const [minutesCounter, setMinutesCounter] = useState('00')
    const [secondsCounter, setSecondsCounter] = useState('00')
    
    useEffect(() => {
        const route = props.navigation.getParam('route', 'default value')
        setRouteName(route.title)
        setCurrentRoute(route)

        const checkPointss = mapRef.getSituation()
        checkPointss.forEach(function (element) {
            element.Visited = "false";
        });
        setCheckPoints(checkPointss)
        setCurrentCheckPoint(checkPointss[0])

    }, [])

    const coordinates = props.navigation.getParam('coordinates', 'default value');
    let mapRef = null;

    const callbackWhenCheckpointIsReached = (title, index)=>
    {
        //condition to check whether currentCheckPoint is the one reached (currentCheckPoint.index === index)
        console.log(title, " IS  finished ", index);
        alert("Checkpoint: " + title + " is reached.")
        setCheckPointReached(true)
    }
    const handleCheckPointReached = () => {
        const newCheckPoint = checkPoints.shift()
        setDistance(distance+newCheckPoint.distance)
        checkPoints.length === 0 ? (alert("You've completed this route")) : (setCurrentCheckPoint(newCheckPoint))
    }
    const handleRouteFinished = () => {
        props.navigation.navigate(
            'StatisticsScreen',
            {
                duration: {durationMinutes: minutesCounter, durationSeconds: secondsCounter},
                distance: distance,
                route: currentRoute
            }
        )
    }

    return (
        <View style={{flex:1}}>
            <RelappToolBar text = {routeName}
                fontSize = {32}
            />
            <View style={styles.container}>
            <View style={{flex:1, flexDirection:"row"}}>
                <TouchableOpacity onPress={()=>{Linking.openURL('https://open.spotify.com/playlist/7fZUgTmUcN4KVRsRwadU2z')}}>
                 <Ionicons name="ios-musical-notes" size={80} color="green"/>
                </TouchableOpacity>
            </View>
            { checkPoints[0] !== undefined &&
                <View style={{flex:2, width:"100%", padding:5}}>
                    <CheckPoint title={checkPoints[0].title} distance={checkPoints[0].distance} />
                    <View style={{flex:1,flexDirection:"row"}}>
                        <RelappButton
                        style = {ButtonTypes().mediumButton}
                        text = "Remaining check points"
                        callback = {()=>{props.navigation.navigate("CheckPointsScreen",{CheckPoints: checkPoints})}}
                        />
                        <TimeCounter handleMinutesCounter={setMinutesCounter} handleSecondsCounter={setSecondsCounter} />
                    </View>
                </View>
            }
            {/* <View style={{flex:4}}> */}
            <ShowingMap
                ref={(ref) => {mapRef = ref;}}
                markers = {coordinates}
                finishCallback = {callbackWhenCheckpointIsReached}
            />
            {/* </View> */}
            {/* constraints when to show check in/finish button, later uncomment */}
            {/* {checkPointReached && */}
            <View style={{flex:1, width:"100%", alignItems:"center"}}>
                <RelappButton
                    style = {ButtonTypes().mediumButton}
                    text = {checkPoints.length === 0? ("Finish") : ("Check In")}
                    callback = {checkPoints.length === 0? (()=>{handleRouteFinished()}) : (()=>{handleCheckPointReached()})}
                />   
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    container2: {
        flex: 1,
        left:10,
        backgroundColor: '#F0E6E6',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },

        separationLine: {
            width:"100%",
            borderWidth: 2,
            borderRadius: 2,
        },

})
