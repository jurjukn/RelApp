import {View, Text, StyleSheet} from "react-native";
import MapView from "react-native-maps";
import React, {useEffect, useState} from "react";
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
    console.log("OpenInGoogleMap");
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lon}`;
    const label = 'Custom Label';
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
};


export default function ShowingMap(props)
{
    const [markers, setMarkers] = useState(props.markers);
    const [initialRegion, setInitialRegion] = useState(null);
    const [previousDistance, setPreviousDistance] = useState(null);

    useEffect(() => {
        if(initialRegion === null)
        {
            checkPermissions().then(r=>
            {
                console.log(r);
            }).catch(
                function (error) {
                    console.log(error);
                });
            if(markers !== null)setInitialRegion(createInitialRegionFromCord(markers[0]));
            else setInitialRegion(DefaultInitialRegion());
        }
    });

    const countAllDistances = (current)=>
    {
        const last = markers.length;
        const answer =
        markers.map(
            (x,index)=>{
                return(generateTitle(index,last) + " yra " + getDistance(current,x) + " km  atstumu ");
            }
        );
        return answer;
    };

    return (
        <MapView style={styles.mapStyle}
                 showsUserLocation={true}
                 followUserLocation={true}
                 onUserLocationChange = {(props)=>
                 {
                     if(previousDistance === null)
                     {
                         console.log(countAllDistances(props.nativeEvent.coordinate));
                         setPreviousDistance(getDistance(props.nativeEvent.coordinate,markers[0]));
                     }
                 }}
                 initialRegion={initialRegion}
                 onLongPress={(props)=>{console.log(props.nativeEvent.coordinate)}}
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

const styles = StyleSheet.create({
    mapStyle: {
        width: 300,
        height: 400,
    },
})
