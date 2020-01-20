import {FlatList} from "react-native";
import React from "react";

import RouteComment from "./RouteComment"

export default RouteCommentsList = ({routeComments}) => {

    return (
        <FlatList
        data={routeComments}
        renderItem={({ item }) => 
            <RouteComment 
                userId ={item.UserId}
                comment = {item.Comment}
            />
        }
        keyExtractor={item => item.UserId}
        />
    )
}