import {View, ScrollView, StyleSheet} from "react-native";
import React, {useState,useEffect} from "react";
import {MainColors, Space} from "../components/stylingComponents";
import {RouteItem} from "../routesComponents/RouteItem";

export default function AllRoutes(props)
{
    const [routes, setRoutes] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [favRoutes, setFavRoutes] = useState(null);

    useEffect(() => {
        setCurrentUser(props.currentUser);
        if (props.favorites === true){
            getFavoritesRoutes();
            setRoutes(favRoutes);
        } else {
            setRoutes(props.allRoutes);
        }
    });

    const getFavoritesRoutes = () => {
        if(favRoutes===null){
            if (props.allRoutes !== null) {
                setFavRoutes(props.allRoutes.filter(item => item.isFavorite === true));
            }
        }
    };

    return (
        <View style={styles.scrollbar}>
            <ScrollView>
                {routes===null ? null:
                    routes.map(
                        (x,index)=>{
                            const randomIndex = Math.random()*100;
                            return(
                                <View key = {randomIndex + index} style={styles.scrollElement}>
                                    <RouteItem data = {{routeData:x,currentUser}}
                                        callback = {()=> {
                                            props.navigation.navigate("SingleRoute", {routeData:x, userData:currentUser})
                                        }}/>
                                    <Space size = {10} />
                                </View>
                            )
                        }
                    )
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
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

});
