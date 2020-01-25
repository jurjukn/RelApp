import {View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";
import React, {useState,useEffect} from "react";
import ShowingMap from "../routesComponents/Maps/ShowingMap";
import {MainColors, RelappLogo, RelappToolBar, Space} from "../components/stylingComponents";
import {RouteItem} from "../routesComponents/RouteItem";
import {RelappTextInput} from "../components/RelappTextInput";
import {ButtonTypes, RelappButton} from "../components/RelappButton";
import {getAllRoutes} from "../databaseServices/RouteService";
import {getCurrentUser} from "../firebaseServices/Authentication";


export default function Routes(props)
{
    const [text, setText] = useState("");
    const [routesArr, setRoutesArr] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if(routesArr===null)
        {
            getCurrentUser().then(r=>setCurrentUser(r));
            getAllRoutes().then(r=>setRoutesArr(r));
        }
    });


    return (
        <View style={{flex: 1}}>
            <RelappToolBar text = {"All Routes"}/>
            <View style={styles.container}>
                <Space size = {30}/>
                <RelappTextInput onChangeText = {(text)=>{setText(text)}}/>
                <Space size = {20}/>
                <View style={styles.scrollbar}>
                    <ScrollView>
                        {routesArr===null ? null:
                            routesArr.map(
                                (x,index)=>
                                {
                                    return(
                                        <View key = {index} style={styles.scrollElement}>
                                            <RouteItem data = {{...x,...currentUser}}
                                                       callback = {()=>
                                                       {
                                                           props.navigation.navigate("SingleRoute", {routeData:x, userData:currentUser})
                                                       }
                                                       }/>
                                            <Space size = {10} />
                                        </View>
                                    )
                                }
                            )
                        }
                    </ScrollView>
                </View>
                <Space size = {20}/>
                <RelappButton
                    style = {ButtonTypes().largeButton}
                    text = "Create New"
                    callback = {()=> props.navigation.navigate("CreateRoute", {currentUser})}/>
                <Space size = {20}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MainColors.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    scrollbar: {
        flex: 1,
        backgroundColor: MainColors.greyBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    scrollElement: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },

})
