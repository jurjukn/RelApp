import {View, Text, StyleSheet} from "react-native";
import MapView from "react-native-maps";
import React, {useState, useEffect, useRef, useImperativeHandle, forwardRef,} from "react";
import {CreateInitialRegionByCurrentLocation, createInitialRegionFromCord, DefaultInitialRegion} from "./MapFunctions";
import MyMarker from "./MyMarker";


export default function InsertionMap(props,ref)
{
    const [markers, setMarkers] = useState(props.defaultValue === null ? null : props.defaultValue);
    const [initialRegion, setInitialRegion] = useState(null);

    const getMarkersCopy = ()=>{
        if(markers===null) return [];
        else return [...markers];
    };

    useImperativeHandle(ref, () => ({
        getMarkers: () => {
            return getMarkersCopy()
        }
    }));

    useEffect(() => {
        if(initialRegion === null) {
            if (markers === null) {
                CreateInitialRegionByCurrentLocation().then(r => {
                    setInitialRegion(r)
                }).catch(
                    function (error) {
                        setInitialRegion(DefaultInitialRegion());
                    })
            } else {
                setInitialRegion(createInitialRegionFromCord(markers[0]));
            }
    }});

    const removeMarker=(index)=>{
        const newMarkers = markers.filter((x,i)=>{if(i!==index)return(x)});
        setMarkers(newMarkers);
    };
    const addMarker=(coord)=>{
        let newMarkers;
        if(markers===null)  newMarkers = [coord];
        else newMarkers = [...markers,coord];
        setMarkers(newMarkers);
    };

    const randomKey = Math.random()*1000;
    return (
        <MapView style={styles.mapStyle}
                 provider = {"google"}
                 showsUserLocation={true}
                 followUserLocation={true}
                 initialRegion={initialRegion}
                 onLongPress={(props)=>{addMarker(props.nativeEvent.coordinate);}}
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

InsertionMap = forwardRef(InsertionMap);

const styles = StyleSheet.create({
    mapStyle: {
        width: 300,
        height: 400,
    },
})

