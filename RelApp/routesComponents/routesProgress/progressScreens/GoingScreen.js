import {TouchableOpacity, StyleSheet, View, ScrollView} from "react-native";
import {RelappToolBar} from "./../../../components/stylingComponents"
import React, {useState, useEffect} from "react";
import {ButtonTypes, RelappButton} from "../../../components/RelappButton";
import { Linking } from 'expo';
import ShowingMap from "../../Maps/ShowingMap";
import CheckPoint from "../checkPoints/CheckPoint"
import { Ionicons } from '@expo/vector-icons';
import {MainColors} from '../../../components/stylingComponents';
import TimeCounter from "./helpers/TimeCounter"

export default function GoingScreen(props)
{
    const [currentPoints, setCurrentPoints] = useState(null);
    const [index, setIndex] = useState(0);
    const [routeInformation, setRouteInformation] = useState(null);


    useEffect(() => {
        if(routeInformation===null)
        {
            let RouteCoordinates = props.navigation.getParam('coordinates', 'default value');
            let RouteInformation = props.navigation.getParam('route', 'default value');
            setRouteInformation({RouteInformation,RouteCoordinates});
        }
    });

    let timeRef = null;
    let mapRef = null;

    const getDistance = ()=>
    {
        let distance = 0;
        currentPoints.map(x=>{distance = distance + x.distance});
        return distance;
    };
    const handleRouteFinished = () => {
        let time = timeRef.getTime();
        let distance = getDistance();
        props.navigation.navigate(
            'StatisticsScreen',
            {
                duration: time,
                distance: distance,
                route: routeInformation.RouteInformation
            }
        )
    };

    return (
        <View style={{flex:1}}>
            <RelappToolBar
                callback = {()=>props.navigation.navigate("Routes")}
                text = {routeInformation === null ? "Going" : routeInformation.RouteInformation.title}
                fontSize = {32}
            />
            <View style={styles.container}>
                <ScrollView>
                    <View style={{flex:1, flexDirection:"row", alignItems: 'center', marginLeft: 80}}>
                        {routeInformation===null || routeInformation.RouteInformation.playlistUrl === "" ?
                            null:
                            <View>
                                <TouchableOpacity onPress={()=>{Linking.openURL(routeInformation.RouteInformation.playlistUrl)}}>
                                    <Ionicons name="ios-musical-notes" size={60} color={MainColors.greenColor}/>
                                </TouchableOpacity>
                            </View>
                        }
                        <TimeCounter ref={(ref) => {timeRef = ref;}} />
                    </View>
                    {currentPoints === null ?
                        null :
                        <View style={{flex:2, width:"100%", padding:5, alignItems: 'center'}}>
                            <CheckPoint
                                title={ currentPoints.length <= index ? "Everything is finished" : currentPoints[index].title}
                                distance={currentPoints.length <= index ? getDistance() : currentPoints[index].distance} />
                            <View style={{flex:1,flexDirection:"row"}}>
                                <RelappButton
                                    style = {ButtonTypes().largeButton}
                                    text = "Remaining check points"
                                    callback = {()=>{props.navigation.navigate("CheckPointsScreen",{CheckPoints: currentPoints.slice(index)})}}
                                />
                            </View>
                        </View>
                    }
                    {routeInformation===null ?
                        null:
                        <ShowingMap
                            ref={(ref) => {mapRef = ref;}}
                            markers = {routeInformation.RouteCoordinates}
                            requireUpdate = {true}
                            finishCheckpoint = {(checkPoint)=>{
                                console.log(checkPoint);
                                //setIndex(index+1)
                            }}
                            getConstantUpdate = {(newInfo)=>{setCurrentPoints(newInfo)}}
                        />}
                    {routeInformation !== null && currentPoints !== null ?
                        <View style={{flex: 1, width: "100%", alignItems: "center", marginTop: 15}}>
                            <RelappButton
                                style={ButtonTypes().largeButton}
                                text={currentPoints.length === index ? ("Finish") : ("Check In")}
                                callback={
                                    currentPoints.length === index ? (() => {handleRouteFinished()})
                                        : (() => {setIndex(index+1)})}
                            />
                        </View>
                        :null}
                </ScrollView>
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
