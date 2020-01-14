import React from 'react';
import { StyleSheet, Text, View, Dimensions,StatusBar} from 'react-native';
import {
    createAppContainer,
} from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {RelappLogo, TopSeparator} from "../components/stylingComponents";
import Routes from "./Routes";
import Profiles from "./Profiles";
import History from "./History";
import CreateRoute from "../routesComponents/CreateRoute";
import {RoutesNavigation} from "../routesComponents/RoutesNavigation";


const TabScreen = createMaterialTopTabNavigator(
    {
        History: { screen: History },
        Routes: { screen: RoutesNavigation },
        Profile: { screen: Profiles },
    },
    {
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#FFFFFF',
            inactiveTintColor: '#F8F8F8',
            style: {
                backgroundColor: '#F0E6E6',
            },
            labelStyle: {
                textAlign: 'center',
                color:'black',
                textTransform:'capitalize',
            },
            indicatorStyle: {
                borderBottomColor: 'gray',
                borderBottomWidth: 2,

            },
        },
    }
);

const TabNavigation = createAppContainer(TabScreen)

export default function Navigation() {
    return (
        <View style={{flex: 1}}>
            <TopSeparator/>
            <RelappLogo/>
            <TabNavigation />
        </View>
    );
}
