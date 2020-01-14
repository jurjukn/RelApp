import {createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import BlockingScreen from "./BlockingScreen";
import Routes from "../../screens/Routes";

export const RouteProgressNavigation = createStackNavigator({
    BlockingScreen: {
        screen: BlockingScreen,
    },
    GoingScreen: {
        screen: BlockingScreen,
    },
    FinishScreen: {
        screen: BlockingScreen,
    },
    StatisticsScreen: {
        screen: BlockingScreen,
    },
    RankingScreen: {
        screen: BlockingScreen,
    },
    CommentsScreen: {
        screen: BlockingScreen,
    },
    }, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);
