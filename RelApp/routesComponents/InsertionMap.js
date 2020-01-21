import {View, Text, StyleSheet} from "react-native";
import MapView from "react-native-maps";
import React, {useState} from "react";
import {Marker} from "react-native-maps";
import { Linking } from 'expo';
import {coordinatesExample, InitialRegion} from "./MapFunctions";

function RemovableMarker(props)
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
            title={"X"}
            description={"delete"}
            ref={ref => {marker = ref; }}
            onPress={()=>{ifVisible()}}
            onCalloutPress={()=>{
                props.delete(props.index)
            }}
        />
    )
}

export default function InsertionMap(props)
{
    const [markers, setMarkers] = useState(null);
    if(markers===null)setMarkers(coordinatesExample());
    let marker = null;

    const removeMarker=(index)=>{
        const newMarkers = markers.filter((x,i)=>{if(i!==index)return(x)});
        props.insert(newMarkers);
        setMarkers(newMarkers);
    };
    const addMarker=(coord)=>{
        const newMarkers = [...markers,coord];
        props.insert(newMarkers);
        setMarkers(newMarkers);
    };

    return (
        <MapView style={styles.mapStyle}
                 initialRegion={InitialRegion()}
                 onLongPress={(props)=>{
                     console.log(props.nativeEvent.coordinate);
                     addMarker(props.nativeEvent.coordinate);
                 }}
        >
            {markers === null ? null :
                markers.map(
                    (x,index)=>{
                        return(
                            <RemovableMarker
                                index = {index}
                                key = {index}
                                delete = {removeMarker}
                                location={x} />
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
