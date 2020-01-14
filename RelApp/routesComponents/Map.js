import {View, Text, StyleSheet} from "react-native";
import MapView from "react-native-maps";
import React from "react";
import {Marker} from "react-native-maps";

const CreateMarker = (coordinate)=>{
    return(
        <MapView.Marker
            key = {1}
            coordinate={coordinate}
            title={"title"}
            description={"description"}
            onLongPress={(props)=>{console.log("markeris")
                console.log(props.nativeEvent.coordinate)
            }}
        />
    )

}

export default class Map extends React.Component {
    state = {
        coordinate:{
            latitude: 54.687157,
            longitude: 25.279652,
        },
        markers:[]
    }

    constructor(props)
    {
        super(props)
        this.state.markers.push(
           CreateMarker({
               latitude: 46.4906700,
               longitude: 11.3398200,
           })
        )
    }

    render() {
        return (
            <MapView style={styles.mapStyle}
                     initialRegion={{
                         latitude: 46.4906700,
                         longitude: 11.3398200,
                         latitudeDelta: 0.5,
                         longitudeDelta: 0.5,
                     }}
                     onLongPress={(props)=>{console.log(props.nativeEvent.coordinate)}}
            >
                {this.state.markers}
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    mapStyle: {
        width: 300,
        height: 400,
    },
})
