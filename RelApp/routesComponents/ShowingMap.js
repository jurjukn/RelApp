import {View, Text, StyleSheet} from "react-native";
import MapView from "react-native-maps";
import React, {useState} from "react";
import {Marker} from "react-native-maps";
import { Linking } from 'expo';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {coordinatesExample, getCurrentCoordinates, InitialRegion} from "./MapFunctions";

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


function MyMarker(props)
{
    let marker = null;
    let isCalloutVisible = false;
    const ifVisible = ()=>
    {
        if(marker!==null)
        {
            if(isCalloutVisible) {
                marker.hideCallout();
                isCalloutVisible = !isCalloutVisible;
            }
            else {
                marker.showCallout();
                isCalloutVisible = !isCalloutVisible;
            }
        }
    };

    return(
        <MapView.Marker
            key = {props.key}
            coordinate={props.location}
            title={"title"}
            description={"description"}
            ref={ref => {marker = ref; }}
            onPress={()=>{ifVisible()}}
            onCalloutPress={()=>{OpenInGoogleMaps(props.location.latitude, props.location.longitude);}}
        />
    )

}

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
                            <MyMarker key = {index} location={x} />
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
