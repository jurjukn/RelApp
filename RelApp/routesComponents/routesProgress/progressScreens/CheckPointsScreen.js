import {StyleSheet, View} from "react-native";
import {RelappToolBar} from "../../../components/stylingComponents";
import React, {useState, useEffect} from "react";
import CheckPointsList from "../checkPoints/CheckPointsList"

export default function CheckPointsScreen(props)
{
    const [checkPoints, setCheckPoints] = useState(null)
    useEffect(() => {
        const points = props.navigation.getParam('CheckPoints', 'default value')
        setCheckPoints(points)
    }, []);

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <RelappToolBar text = "Remaining"
                    fontSize = {32}
                    callback = {()=>props.navigation.goBack()}
                />
            </View>
            <View style={styles.listContainer}>
                <CheckPointsList checkPoints={checkPoints} />
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
