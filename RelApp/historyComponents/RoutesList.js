import {FlatList} from "react-native";
import React from "react";

import RouteStatistics from "./RouteStatistics"

export default RoutesList = ({userHistory}) => {

    console.log(userHistory)

    return (
        <FlatList
        data={userHistory}
        renderItem={({ item }) => 
            <RouteStatistics 
                routeName={item.routeId} 
                date={item.date.seconds} 
                time={item.duration} 
                difficulty={9} 
                distance={item.distance} 
                myRate={item.rating}
            />
        }
        keyExtractor={item => item.routeId}
        />
    )
}