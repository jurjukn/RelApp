import {ScrollView, StyleSheet, Text, View, Button} from "react-native";
// import {MainModal, TransparentModal} from "../ModalComponent";
// import {RelappHeader, RelappLogo, Space} from "../../../components/stylingComponents";
import {RelappHeader, RelappLogo, Space} from "./../../../components/stylingComponents"
// import {RelappSearch} from "../../components/RelappTextInput";
import React, {useState, useEffect} from "react";
import {ButtonTypes, RelappButton} from "../../../components/RelappButton";
import ProgramItem, {ProgressToolbar} from "./../RoutePregessStyles";
import { Linking } from 'expo';

export default function GoingScreen(props)
{
    const [timer, setTimer] = useState(null)
    const [minutesCounter, setMinutesCounter] = useState('00')
    const [secondsCounter, setSecondsCounter] = useState('00')
    const [startDisable, setStartDisable] = useState(false)

    useEffect(() => {
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
    // returned function will be called on component unmount 
    return () => {
        clearInterval(timer);
    }
    }, [minutesCounter, secondsCounter])

    function saveTimeAndProceed(){
        setStartDisable(false)
        clearInterval(timer)
        props.navigation.navigate('StatisticsScreen',  {duration: {durationMinutes: minutesCounter, durationSeconds: secondsCounter}, distance: "13"})
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
                <Text>This is going screen. Here we show map</Text>
                <Text>{minutesCounter} : {secondsCounter}</Text>
                <RelappButton 
                    style = {ButtonTypes().mediumButton} 
                    text = "Finish" 
                    callback = {
                        ()=>{saveTimeAndProceed()}
                    }
                
                />
                {/* <RelappButton style = {ButtonTypes().mediumButton} text = "Finish" callback = {()=>{props.navigation.navigate("StatisticsScreen")}}/> */}
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
