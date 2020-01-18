import React from 'react';
import { StyleSheet, Text, View, Dimensions,StatusBar} from 'react-native';
import {
    createAppContainer, createSwitchNavigator,
} from 'react-navigation';
import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {RelappLogo, TopSeparator} from "../components/stylingComponents";
import Routes from "./Routes";
import Profiles from "./Profiles";
import History from "./History";
import CreateRoute from "../routesComponents/CreateRoute";
import {RoutesNavigation} from "../routesComponents/RoutesNavigation";
import {RouteProgressNavigation} from "../routesComponents/routesProgress/RouteProgressNavigation";
import {Ionicons} from "@expo/vector-icons";

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = Ionicons;
    let iconName;
    switch (routeName) {
        case 'History':
            iconName = `md-time`;
            break
        case 'Routes':
            iconName = `md-map`;
            break
        case 'Profile':
            iconName = `md-person`;
            break
        default:
            break
    }
    return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const TabNavigation  = createBottomTabNavigator(
    {
        History: { screen: History },
        Routes: { screen: RoutesNavigation },
        Profile: { screen: Profiles },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
                getTabBarIcon(navigation, focused, tintColor),
        }),
        initialRouteName: "Routes",
        tabBarOptions: {
            style:{
                backgroundColor: '#F0E6E6',
                borderTopColor: '#F0E6E6',
            },
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
        },
    },
)

const TabNavigationContainer = createAppContainer(TabNavigation);

const SwitchNavigation = createSwitchNavigator({
        Login: {
            screen: History,
        },
        Tabs: {
            screen: TabNavigationContainer,
        },
        Progress: {
            screen: RouteProgressNavigation,
        },
    },
    {
        initialRouteName:'Tabs',
    }
);

const MainNavigation = createAppContainer(SwitchNavigation);
export default MainNavigation;

