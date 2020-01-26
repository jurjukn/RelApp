import {View, Text, StyleSheet} from "react-native";
import MapView from "react-native-maps";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {Marker} from "react-native-maps";
import { Linking } from 'expo';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {
    checkPermissions,
    coordinatesExample,
    CreateInitialRegionByCurrentLocation, createInitialRegionFromCord, DefaultInitialRegion,
    generateTitle,
    getCurrentCoordinates, getDistance,
    InitialRegion,
    selectColor
} from "./MapFunctions";
import MyMarker from "./MyMarker";

const OpenInGoogleMaps = (lat, lon)=>
{
    //console.log("OpenInGoogleMap");
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lon}`;
    const label = 'Custom Label';
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
};


export default function ShowingMap(props, ref)
{
    const [markers, setMarkers] = useState(props.markers);
    const [initialRegion, setInitialRegion] = useState(null);

    const currentInit = {latitude: 0.0, longitude:  0.0,};
    const [currentCoordinates, setCurrentCoordinates] = useState(currentInit);

    const finishedRoutes = [];
    const UpdateDistance = 10;//metres
    const Precision = 100;

    useEffect(() => {
        if(props.markers!==null)
        {
            setMarkers(props.markers);
            setInitialRegion(createInitialRegionFromCord(props.markers[0]));
        } else {
            checkPermissions().then(r=>
            {
                //console.log("Permissions",r);
            }).catch(
                function (error) {
                    console.log(error);
                });
        }
    }, [props.markers]);

    const countAllDistances = (current)=>
    {
        if(markers===null)return null;
        const answer =
        markers.map(
            (x,index)=>{
                const distance = getDistance(current,x)*1000;
                const title = generateTitle(index, markers.length);
                let checkPoint = {
                    index:index,
                    title:title,
                    distance: distance,
                };
                if(distance<Precision)
                {
                    if(props.requireUpdate === true) props.finishCheckpoint(checkPoint);
                }
                return (checkPoint);
            }
        );
        if(props.requireUpdate === true) props.getConstantUpdate(answer);
        return answer;
    };

    useImperativeHandle(ref, () => ({
        getSituation: () => {
            return countAllDistances(currentCoordinates);
        }
    }));

    return (
        <MapView style={styles.mapStyle}
                 showsUserLocation={true}
                 followUserLocation={true}
                 onUserLocationChange = {(props)=>
                 {
                     const current = props.nativeEvent.coordinate;
                     const distance = getDistance(current,currentCoordinates) * 1000;
                     countAllDistances(current);
                     if(distance>=UpdateDistance)
                     {
                         setCurrentCoordinates(current);
                     }
                 }}
                 initialRegion={initialRegion}
        >
            {markers === null ? null :
                markers.map(
                    (x,index)=>{
                        return(
                            <MyMarker key = {index}
                                      index =  {index}
                                      location={x}
                                      isForShowing = {true}
                                      last = {markers.length}
                                      open = {OpenInGoogleMaps}
                            />
                        )
                    }
                )
            }
        </MapView>
    );
}

ShowingMap = forwardRef(ShowingMap);

const styles = StyleSheet.create({
    mapStyle: {
        width: 300,
        height: 400,
    },
})
