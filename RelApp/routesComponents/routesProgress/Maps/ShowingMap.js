import {View, Text, StyleSheet} from "react-native";
import MapView from "react-native-maps";
import React, {useState} from "react";
import {Marker} from "react-native-maps";
import { Linking } from 'expo';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {coordinatesExample, generateTitle, getCurrentCoordinates, InitialRegion, selectColor} from "./MapFunctions";
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
    const [markers, setMarkers] = useState(null);
    if(markers===null)
    {
        //for initialization
        getCurrentCoordinates().then(r=>{});
        setMarkers(coordinatesExample());
    }
    let marker = null;

    return (
        <MapView style={styles.mapStyle}
                 showsUserLocation={true}
                 followUserLocation={true}
                 //onUserLocationChange = {(props)=>{console.log(props.nativeEvent.coordinate)}}
                 initialRegion={InitialRegion()}
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
