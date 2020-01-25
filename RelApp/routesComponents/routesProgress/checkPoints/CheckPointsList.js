import {FlatList} from "react-native";
import React from "react";

import CheckPoint from "./CheckPoint"

export default CheckPointsList = ({checkPoints}) => {

    return (
        <FlatList
            data={checkPoints}
            renderItem={({ item }) =>
                <CheckPoint
                distance = {item.distance}
                title = {item.title}
                />
            }
            keyExtractor={item => item.title}
        />
    )
}
