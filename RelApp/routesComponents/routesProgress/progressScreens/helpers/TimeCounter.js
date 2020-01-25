import {Text, View} from "react-native";
import React, {useState, useEffect} from "react";


export default function TimeCounter(props)
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
            props.handleMinutesCounter(count.length == 1 ? '0' + count : count)
            setSecondsCounter(num.length == 1 ? '0' + num : num)
            props.handleSecondsCounter(num.length == 1 ? '0' + num : num)
          }, 1000);
          setTimer(timer);
          setStartDisable(true)

    return () => {
        clearInterval(timer)
    }
    }, [minutesCounter, secondsCounter])

    return (
        <View style={{flex:1}}>
            <Text>{minutesCounter} : {secondsCounter}</Text>
        </View>
    )
}

