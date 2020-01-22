import React from 'react';
import {
    createAppContainer, createSwitchNavigator,
} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Profiles from "./Profiles";
import History from "./History";
import {RoutesNavigation} from "../routesComponents/RoutesNavigation";
import {RouteProgressNavigation} from "../routesComponents/routesProgress/RouteProgressNavigation";
import {Ionicons} from "@expo/vector-icons";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {MainColors} from "../components/stylingComponents";

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
                backgroundColor: MainColors.greyColor,
                borderTopColor: '#F0E6E6',

            },
            activeTintColor: MainColors.iconColor,
            activeBackgroundColor:MainColors.greenColor,
            inactiveTintColor: MainColors.darkGreyColor,
        },
    },
)

const NavigationLogin = createSwitchNavigator({
    SignIn: {screen: SignIn},
    SignUp: {screen: SignUp},
  });

const NavigatorLogin = createAppContainer(NavigationLogin);

const TabNavigationContainer = createAppContainer(TabNavigation);

const SwitchNavigation = createSwitchNavigator({
        Login: {
            screen: NavigatorLogin,
        },
        Tabs: {
            screen: TabNavigationContainer,
        },
        Progress: {
            screen: RouteProgressNavigation,
        },
    },
    {
        initialRouteName:'Login',
    }
);

const MainNavigation = createAppContainer(SwitchNavigation);
export default MainNavigation;

