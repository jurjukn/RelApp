import {ScrollView, StyleSheet, Text, View, Button} from "react-native";
import {RelappToolBar} from "./../../../components/stylingComponents"
import React, {useState, useEffect} from "react";
import {ButtonTypes, RelappButton} from "../../../components/RelappButton";
import { Linking } from 'expo';
import { Pedometer } from "expo-sensors";
import ShowingMap from "../../Maps/ShowingMap";
import {coordinatesExample} from "../../Maps/MapFunctions";
import CheckPoint from "../checkPoints/CheckPoint"
import TimeCounter from "./helpers/TimeCounter"

export default function GoingScreen(props)
{
    const [currentCheckPoint, setCurrentCheckPoint] = useState(null)
    const [checkPointReached, setCheckPointReached] = useState(false)
    const [checkPoints, setCheckPoints] = useState(false)
    const [currentRoute, setCurrentRoute] = useState(null)
    const [routeName, setRouteName] = useState("Undefined")

    const [minutesCounter, setMinutesCounter] = useState('00')
    const [secondsCounter, setSecondsCounter] = useState('00')
    

    useEffect(() => {
        
        const route = props.navigation.getParam('route', 'default value')
        setRouteName(route.name)
        setCurrentRoute(route)

        const checkPoints = props.navigation.getParam('coordinates', 'default value')
        checkPoints.sort((a, b) => (a.index > b.index) ? 1 : -1)
        setCheckPoints(checkPoints)
        const first = checkPoints[0]
        setCurrentCheckPoint(first)

    }, [minutesCounter, secondsCounter])

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
        const newCheckPoints = checkPoints.shift()
        setCheckPointReached(false)
        checkPoints.length === 0 ? (alert("You've completed this route")) : (setCurrentCheckPoint(newCheckPoints[0]))
    }
    const handleRouteFinished = () => {
        props.navigation.navigate(
            'StatisticsScreen',
            {
                duration: {durationMinutes: minutesCounter, durationSeconds: secondsCounter},
                distance: "5",
                route: currentRoute
            }
        )
    }

    return (
        <View style={{flex:1}}>
            <View style={{flex: 1}}>
                <RelappToolBar text = {routeName}
                    fontSize = {32}
                />
            </View>
            <View style={styles.container}>
                <ScrollView>
                <RelappButton
                    style = {ButtonTypes().mediumButton}
                    text = "Recommended playlist"
                    callback = {()=>{Linking.openURL('https://open.spotify.com/playlist/7fZUgTmUcN4KVRsRwadU2z')}}
                />
                <RelappButton
                style = {ButtonTypes().mediumButton}
                text = "Check points"
                callback = {()=>{props.navigation.navigate("CheckPointsScreen",{CheckPoints: mapRef.getSituation()})}}
                />
                {/* } */}
                {/* Here we will display current checkpoint */}
                {/* { checkPoints.length !== 0 &&
                    <CheckPoint />
                } */}
                <ShowingMap
                    ref={(ref) => {mapRef = ref;}}
                    markers = {coordinates}
                    finishCallback = {callbackWhenCheckpointIsReached}
                />
                {/* constraints when to show check in/finish button, later uncomment */}
                {/* {checkPointReached && */}
                <TimeCounter handleMinutesCounter={setMinutesCounter} handleSecondsCounter={setSecondsCounter} />
                <RelappButton
                    style = {ButtonTypes().mediumButton}
                    text = {checkPoints.length === 0? ("Finish") : ("Check In")}
                    callback = {checkPoints.length === 0? (()=>{handleRouteFinished()}) : (()=>{handleCheckPointReached()})}
                />
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        backgroundColor: '#F0E6E6',
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
