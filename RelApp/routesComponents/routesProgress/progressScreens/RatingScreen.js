import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {AirbnbRating } from 'react-native-elements';

import {RelappLogo,RelappToolBar} from "../../../components/stylingComponents"

import {ButtonTypes, RelappButton} from "../../../components/RelappButton";
import {ProgressToolbar} from "../RoutePregessStyles";

export default function StatisticsScreen(props)
{
    const [rating, setRating] = useState(0)

    function ratingCompleted(rating) {
        //console.log("Rating is: " + rating)
        setRating(rating)
    }

    function proceedToNextScreen(){
        const duration = props.navigation.getParam('duration', 'default_value')
        const route = props.navigation.getParam('route', 'default_value')
        const distance = props.navigation.getParam('distance', 'default_value')
        props.navigation.navigate(
            "CommentScreen",
            {
                duration: duration,
                distance: distance,
                rating: rating,
                route: route
            }
        )
    }

    return (
        <View style={{flex:1}}>
            <RelappToolBar text = "Rate"
                fontSize = {32}
                callback = {()=>{props.navigation.goBack()}}
            />
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <AirbnbRating
                    count={5}
                    reviews={["Terrible ", "Bad ", "Good ", "Very Good ","Amazing "]}
                    defaultRating={1}
                    size={40}
                    onFinishRating={ratingCompleted}
                    />
                </View>
                <View style={styles.innerContainer}>
                    <RelappButton style = {ButtonTypes().largeButton} text = "Next" callback = {()=>{proceedToNextScreen()}}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
