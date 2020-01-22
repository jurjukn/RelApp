import {View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";
import React, {useState,useEffect} from "react";
import ShowingMap from "../routesComponents/routesProgress/Maps/ShowingMap";
import {RelappLogo, Space} from "../components/stylingComponents";
import {RouteItem} from "../routesComponents/RouteItem";
import {RelappSearch} from "../components/RelappTextInput";
import {ButtonTypes, RelappButton} from "../components/RelappButton";
import {getAllRoutes} from "../databaseServices/RouteService";


export default function Routes(props)
{
    const [text, setText] = useState("")
    const [routesArr, setRoutesArr] = useState(null);

    //not logical getAllRoutes() should take user id and filtered which is favorite for each user
    if(routesArr===null)getAllRoutes().then(r=>setRoutesArr(r));

    return (
        <View style={{flex: 1}}>
            <RelappLogo/>
            <View style={styles.container}>
                <Space size = {30}/>
                <RelappSearch onChangeText = {(text)=>{setText(text)}}/>
                <Space size = {20}/>
                <View style={styles.container2}>
                    <ScrollView>
                        {routesArr===null ? null:
                            routesArr.map(
                                (x,index)=>
                                {
                                    return(
                                        <View key = {index}>
                                            <RouteItem data = {x}
                                                       callback = {()=> props.navigation.navigate("SingleRoute", {routeData:x})
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
                <RelappButton style = {ButtonTypes().largeButton} text = "Create New" callback = {()=> props.navigation.navigate("CreateRoute")}/>
                <Space size = {20}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0E6E6',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    container2: {
        flex: 1,
        left:10,
        backgroundColor: '#F0E6E6',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
})
