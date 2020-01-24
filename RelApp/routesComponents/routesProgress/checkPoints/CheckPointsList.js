import {FlatList, Text} from "react-native";
import React from "react";

import CheckPoint from "./CheckPoint"

//     "distance": 1801.3151932968408,
//     "index": 0,
//     "title": "Start !",


export default CheckPointsList = ({checkPoints}) => {

    return (
        <FlatList
        data={checkPoints}
        renderItem={({ item }) =>
            <CheckPoint
               coordinates = { "distance " + item.distance}
               type = { "title " + item.title}
               visited = { "finished " + item.finished}
            />
        }
        keyExtractor={item => item.index}
        />
    )
}
