import {Text, View} from "react-native";
import React, {useState, useEffect, forwardRef, useImperativeHandle} from "react";
import {MainColors} from '../../../../components/stylingComponents';


export default function TimeCounter(props,ref)
{
    const [timer, setTimer] = useState(null)
    const [minutesCounter, setMinutesCounter] = useState('00')
    const [secondsCounter, setSecondsCounter] = useState('00')
    const [startDisable, setStartDisable] = useState(false)

    const getCurrentTime = ()=>{
        return({durationMinutes:minutesCounter, durationSeconds:secondsCounter,})
    };

    useImperativeHandle(ref, () => ({
        getTime: () => {
            return getCurrentTime();
        }
    }));

    useEffect(() => {
        let timer = setInterval(() => {
            let num = (Number(secondsCounter) + 1).toString(),
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
    }
    }, [minutesCounter, secondsCounter])

    return (
        <View style={{flex:1, alignItems:"center"}}>
            <Text style={{color: MainColors.greenColor, fontWeight: 'bold', fontSize:30}}>{minutesCounter} : {secondsCounter}</Text>
        </View>
    )
}

TimeCounter = forwardRef(TimeCounter);

