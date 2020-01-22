import MapView from "react-native-maps";
import {generateTitle, selectColor} from "./MapFunctions";
import React from "react";

export default function MyMarker(props)
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
            key = {props.index}
            coordinate={props.location}
            pinColor={selectColor(props.index, props.last)}
            title={generateTitle(props.index, props.last)}
            description={props.isForShowing ? "Navigation on press." : "Delete on press"}
            ref={ref => {marker = ref; }}
            onPress={()=>{ifVisible()}}
            onCalloutPress={()=>{props.isForShowing ? props.open(props.location.latitude, props.location.longitude) : props.delete(props.index)}}
        />
    )
}
