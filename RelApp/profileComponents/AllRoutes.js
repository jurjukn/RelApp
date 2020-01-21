import {View, StyleSheet, ScrollView} from "react-native";
import React, {useState} from "react";
import {Route} from "./Route";

export default function AllRoutes(props){
    //---
    //examples, data will be from the db
    const exampleRoute1 = {
        "description": "Amazing Route in Dolomites",
        "id": "23Pofwb8jT15SenciHg6",
        "isFavorite": false,
        "name": "Sella Ronda Route",
        "ownerId": "User1",
    };
    const exampleRoute2 = {
        "description": "Best Route in Bolzano",
        "id": "23Pofwb8jT15SenciHg6",
        "isFavorite": false,
        "name": "Bolzano Route",
        "ownerId": "User1",
    };
    const exampleRoute3 = {
        "description": "Easy route",
        "id": "23Pofwb8jT15SenciHg6",
        "isFavorite": false,
        "name": "Route 3",
        "ownerId": "User2",
    };
    const data = [exampleRoute1,exampleRoute2,exampleRoute3];
    const currentUserId = 'User1';
    //---

    const [routesCreatedByUser, setRoutes] = useState([]);
    if (routesCreatedByUser.length === 0) {
        setRoutes(data.filter(item => item.ownerId === currentUserId))
    }
    
    return (
        <View style={styles.grayContainer}>
            <ScrollView>
                {routesCreatedByUser === null ? null:
                    routesCreatedByUser.map(
                        (route, key)=>
                        {
                            return(
                                <View key = {key}>
                                    <Route data = {route}/>
                                </View>
                            )
                        }
                    )
                }
            </ScrollView>
        </View>
    );
}

export const styles = StyleSheet.create({
    textStyle: {
        fontWeight: 'bold', 
        color: "#4F4F4F", 
        fontSize: 18, 
        marginEnd:'auto',
        marginVertical: 15,
    },
    grayContainer: {
        backgroundColor: '#F4F4F4',
        margin: 10,
        alignItems: "center",
    },
})