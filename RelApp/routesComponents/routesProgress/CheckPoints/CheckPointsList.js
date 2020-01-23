import {FlatList, Text} from "react-native";
import React from "react";

import CheckPoint from "./CheckPoint"

export default CheckPointsList = ({checkPoints}) => {

    return (
        <FlatList
        data={checkPoints}
        renderItem={({ item }) => 
            <CheckPoint
               coordinates = {item.coordinates}
               type = {item.type}
               visited = {item.visited}
            />
        }
        keyExtractor={item => item.coordinates}
        />
    )
}