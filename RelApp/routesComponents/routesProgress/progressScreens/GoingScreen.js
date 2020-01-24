import {ScrollView, StyleSheet, Text, View, Button} from "react-native";
import {RelappHeader, RelappLogo, Space} from "./../../../components/stylingComponents"
import React, {useState, useEffect} from "react";
import {ButtonTypes, RelappButton} from "../../../components/RelappButton";
import ProgramItem, {ProgressToolbar} from "./../RoutePregessStyles";
import { Linking } from 'expo';
import { Pedometer } from "expo-sensors";
import ShowingMap from "../../Maps/ShowingMap";
import {coordinatesExample} from "../../Maps/MapFunctions";
import CheckPoint from "../checkPoints/CheckPoint"

export default function GoingScreen(props)
{
    const [currentCheckPoint, setCurrentCheckPoint] = useState(null)
    const [checkPointReached, setCheckPointReached] = useState(false)
    const [checkPoints, setCheckPoints] = useState(false)

    const [steps, setSteps] = useState(0)
    const [stepsAvailable, setStepsAvailable] = useState(null)

    const [timer, setTimer] = useState(null)
    const [minutesCounter, setMinutesCounter] = useState('00')
    const [secondsCounter, setSecondsCounter] = useState('00')
    const [startDisable, setStartDisable] = useState(false)

    useEffect(() => {
        // subscribePedometer()
        const checkPoints = props.navigation.getParam('coordinates', 'default value')
        checkPoints.sort((a, b) => (a.index > b.index) ? 1 : -1)
        setCheckPoints(checkPoints)
        const first = checkPoints.find(element => element.index === 0)
        setCurrentCheckPoint(first)

        let timer = setInterval(() => {
            var num = (Number(secondsCounter) + 1).toString(),
              count = minutesCounter;

            if (Number(secondsCounter) == 59) {
              count = (Number(minutesCounter) + 1).toString();
              num = '00';
            }
            setMinutesCounter(count.length == 1 ? '0' + count : count)
            setSecondsCounter(num.length == 1 ? '0' + num : num)
          }, 1000);
          setTimer(timer);
          setStartDisable(true)

    return () => {
        clearInterval(timer)
        // this.stepsub && this.stepsub.remove()
        // this.stepsub = null
    }
    }, [minutesCounter, secondsCounter, steps])

    const subscribePedometer = async () => {
        try
        {const available = await Pedometer.isAvailableAsync();
        if (available) {
          this.stepsub = Pedometer.watchStepCount(saySteps)
        }
        setStepsAvailable(available)}
        catch (error) {
            console.log(error)
        }
    }

    const saySteps = result => {
        const diff = result.steps - steps;
        setSteps(result.steps)
    }

    const handleSaveAndProceed = () => {
        setStartDisable(false)
        clearInterval(timer)
        props.navigation.navigate(
            'StatisticsScreen',
            {
                duration: {durationMinutes: minutesCounter, durationSeconds: secondsCounter},
                distance: steps
            }
        )
    }

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
        setStartDisable(false)
        clearInterval(timer)
        props.navigation.navigate(
            'StatisticsScreen',
            {
                duration: {durationMinutes: minutesCounter, durationSeconds: secondsCounter},
                distance: steps
            }
        )
    }

    return (
        <View style={{flex:1}}>
            <RelappLogo callback = {()=>{props.navigation.navigate("BlockingScreen")}}/>
            <View style={styles.container}>
                <ProgressToolbar header = {"Route IV"}/>
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
                <ShowingMap
                    ref={(ref) => {mapRef = ref;}}
                    markers = {coordinates}
                    finishCallback = {callbackWhenCheckpointIsReached}
                />
                <Text>{minutesCounter} : {secondsCounter}</Text>
                <Text>Steps : {"" + steps}</Text>
                {/* Here we will display current checkpoint */}
                {/* { checkPoints.length !== 0 &&
                    <CheckPoint />
                } */}
                {/* constraints when to show check in/finish button, later uncomment */}
                {/* {checkPointReached && */}
                    <RelappButton
                    style = {ButtonTypes().mediumButton}
                    text = {checkPoints.length === 0? ("Finish") : ("Check In")}
                    callback = {checkPoints.length === 0? (()=>{handleRouteFinished()}) : (()=>{handleCheckPointReached()})}
                    />
                {/* } */}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
