import {View, StyleSheet, ScrollView} from "react-native";
import React, {useState} from "react";
import {Route} from "./Route";
import {getAllRoutes} from '../databaseServices/RouteService';
import {getCurrentUser} from '../firebaseServices/Authentication';
import {MainColors} from '../components/stylingComponents';

export default function AllRoutes(props){
    const [routesCreatedByUser, setRoutes] = useState([]);
    const [currentUserId, setCurrentUserId] = useState("");

    if(currentUserId === ""){
        getUserId();
    }

    if(routesCreatedByUser.length === 0){
        getAllRoutesFromDb();
    } 
    
    async function getUserId() {
        try {
            let data = await getCurrentUser();
            setCurrentUserId(data.id);
        } catch (err) {
            console.log(err);
        }     
    }

    async function getAllRoutesFromDb() {
        try {
            let data = await getAllRoutes();
            getRoutesCreatedByUser(data);
        } catch (err) {
            console.log(err);
        }     
    }

    const getRoutesCreatedByUser = (allRoutes) => {
        if (routesCreatedByUser.length === 0) {
            setRoutes(allRoutes.filter(item => item.ownerId === currentUserId))
        }
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
                                    <Route data = {route} navigation = {props.navigation}/>
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
        color: MainColors.textDarkGrey, 
        fontSize: 18, 
        marginEnd:'auto',
        marginVertical: 15,
    },
    grayContainer: {
        backgroundColor: MainColors.containerBackground,
        margin: 10,
        alignItems: "center",
    },
})