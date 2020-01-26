import {View, StyleSheet, ScrollView} from "react-native";
import React from "react";
import {Route} from "./Route";
import {MainColors} from '../components/stylingComponents';

export default function AllRoutes(props){
    let routesCreatedByUser = props.routesCreatedByUser;

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
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
    },
})