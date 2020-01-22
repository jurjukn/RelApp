import {View, Text, StyleSheet} from "react-native";
import MapView from "react-native-maps";
import React, {useState, useEffect, useRef,} from "react";
import {Marker} from "react-native-maps";
import { Linking } from 'expo';
import {coordinatesExample, generateTitle, InitialRegion, selectColor} from "./MapFunctions";
import MyMarker from "./MyMarker";


export default function InsertionMap(props)
{
    const [markers, setMarkers] = useState(null);
    if(markers===null)setMarkers(coordinatesExample());
    const [refresh, setRefresh] = useState(0);

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

    const randomKey = Math.random()*1000;
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
                            <MyMarker
                                key = {randomKey + index}
                                index = {index}
                                last = {markers.length}
                                delete = {removeMarker}
                                isForShowing = {false}
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
