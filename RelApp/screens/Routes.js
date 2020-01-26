import {View, StyleSheet} from "react-native";
import React, {useState,useEffect} from "react";
import ShowingMap from "../routesComponents/Maps/ShowingMap";
import {MainColors, RelappToolBar, Space} from "../components/stylingComponents";
import {RelappTextInput} from "../components/RelappTextInput";
import {ButtonTypes, RelappButton} from "../components/RelappButton";
import {getAllRoutes, searchRouteByTitle} from "../databaseServices/RouteService";
import {getCurrentUser} from "../firebaseServices/Authentication";
import AllRoutes from "../routesComponents/AllRoutes";


export default function Routes(props)
{
    const [text, setText] = useState("");
    const [routesArr, setRoutesArr] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [favorites, setFavorites] = useState(false);

    useEffect(() => {
        if(routesArr===null){
            getCurrentUser().then(r=>setCurrentUser(r));
            getAllRoutes().then(r=>setRoutesArr(r));
        }
    });

    const handleFilter = () => {
        setFavorites(!favorites);
    }
    const refreshIcon = {
        name:"md-refresh",
        callback:()=>{ getAllRoutes().then(r=>setRoutesArr(r));}
    };

    return (
        <View style={{flex: 1}}>
            <RelappToolBar text = {"All Routes"}
                           secondIcon = {refreshIcon}
            />
            <View style={styles.container}>
                <Space size = {30}/>
                <RelappTextInput
                    submitEditing = {()=>{searchRouteByTitle(text).then(r => {
                        setRoutesArr(r);
                    })}}
                    onChangeText = {(text)=>{setText(text)}
                }/>
                <Space size = {20}/>
                <RelappButton
                    style = {ButtonTypes().mediumButton}
                    text = "Show favorites"
                    text = {favorites === true ? "Show all routes": "Show favorites"}
                    callback = {()=> handleFilter()}
                />
                <Space size = {20}/>
                <AllRoutes
                    navigation={props.navigation}
                    allRoutes={routesArr}
                    favorites={favorites}
                    currentUser={currentUser}
                />
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
})
