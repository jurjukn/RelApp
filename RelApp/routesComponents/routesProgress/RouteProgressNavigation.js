import {createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import Routes from "../../screens/Routes";

import BlockingScreen from "./progressScreens/BlockingScreen";
import GoingScreen from "./progressScreens/GoingScreen"
import StatisticsScreen from "./progressScreens/StatisticsScreen"
import RatingScreen from "./progressScreens/RatingScreen"
import CommentScreen from "./progressScreens/CommentScreen"
import CheckPointsScreen from "./progressScreens/CheckPointsScreen"


export const RouteProgressNavigation = createStackNavigator({
    BlockingScreen: {
        screen: BlockingScreen,
    },
    GoingScreen: {
        screen: GoingScreen,
    },
    StatisticsScreen: {
        screen: StatisticsScreen,
    },
    RatingScreen: {
        screen: RatingScreen,
    },
    CommentScreen: {
        screen: CommentScreen,
    },
    CheckPointsScreen: {
        screen: CheckPointsScreen
    },
    }, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);
