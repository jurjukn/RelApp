import {View, Text, StyleSheet} from "react-native";
import MapView from "react-native-maps";
import React, {useState, useEffect, useRef,} from "react";
import {Marker} from "react-native-maps";
import { Linking } from 'expo';
import {coordinatesExample, InitialRegion} from "./MapFunctions";

function RemovableMarker(props)
{

    useEffect(() => console.log('value changed!'), [props.last]);

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
    const selectColor = ()=>{
        let color = '#fff900';
        switch (props.index) {
            case 0:
                color = '#25ff02';
                break;
            case props.last-1:
                color = '#ff001b';
                break;
            default:
                color = '#fff900';
                break;
        }
        return color;
    }

    return(
        <MapView.Marker
            key = {props.key}
            coordinate={props.location}
            pinColor={selectColor()}
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
    const [refresh, setRefresh] = useState(false);
    const refreshing = ()=>{setRefresh(!refresh);}


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
                                key = {index}
                                index = {index}
                                last = {markers.length}
                                refresh = {refreshing}
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
