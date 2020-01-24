import {StyleSheet, View} from "react-native";
import {RelappHeader, RelappToolBar} from "../../../components/stylingComponents";
import React, {useState, useEffect} from "react";
import {ButtonTypes, RelappButton} from "../../../components/RelappButton";
import CheckPointsList from "./../CheckPoints/CheckPointsList"

export default function CheckPointsScreen(props)
{
    const [checkPoints, setCheckPoints] = useState(null)
    useEffect(() => {
        const points = props.navigation.getParam('CheckPoints', 'default value')
        // const arrayOfObjects = []
        // let i = 0
        // points.forEach(element => {
        //     if(i == 0)
        //         arrayOfObjects.push({type:"Start", coordinates: element, visited: false})
        //     else if (i == points.length - 1)
        //         arrayOfObjects.push({type:"Finish", coordinates: element, visited: false})
        //     else
        //         arrayOfObjects.push({type:"Checkpoint" + i.toString(), coordinates: element, visited: false})
        //     i++
        // })
        setCheckPoints(points)
    }, []);

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <RelappToolBar text = "CheckPoints"
                    fontSize = {32}
                    callback = {()=>props.navigation.goBack()}
                />
                <RelappHeader text = {"Scan for checkpoints to check in"} size = {16} />
            </View>
            <View style={styles.listContainer}>
                <CheckPointsList checkPoints={checkPoints} />
            </View>
            <View style={styles.bottomContainer}>
                <RelappButton style = {ButtonTypes().mediumButton} text = "Scan" callback = {()=>{alert("Find out if user is in one of the checkpoints")}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        flex: 7,
        backgroundColor: 'white',
        width:"100%",
        padding:10
    },
    separationLine: {
        width:"100%",
        borderWidth: 2,
        borderRadius: 2,
    }
})
