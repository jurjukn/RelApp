import React from "react";
import {StyleSheet, View} from "react-native";
import {AirbnbRating } from 'react-native-elements';

import {RelappLogo} from "../../../components/stylingComponents"

import {ButtonTypes, RelappButton} from "../../../components/RelappButton";
import {ProgressToolbar} from "../RoutePregessStyles";

export default function StatisticsScreen(props)
{
    function ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }
    return (
        <View style={{flex:1}}>
            <RelappLogo callback = {()=>{props.navigation.navigate("StatisticsScreen")}}/> 
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <ProgressToolbar header = {"Route IV"}/> 
                </View>
                <View style={styles.innerContainer}>
                    <AirbnbRating
                    count={5}
                    reviews={["Terrible ", "Bad ", "Good ", "Very Good ","Amazing "]}
                    defaultRating={1}
                    size={30}
                    onFinishRating={ratingCompleted}
                    />
                </View>
                <View style={styles.innerContainer}>
                    <RelappButton style = {ButtonTypes().mediumButton} text = "Next" callback = {()=>{props.navigation.navigate("CommentScreen")}}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0E6E6',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    innerContainer: {
        flex:1, 
        width:"100%", 
        alignItems:"center", 
        justifyContent:"center",
        padding:10
    },
})
