import {createSwitchNavigator} from "react-navigation";
import Routes from "../screens/Routes";
import CreateRoute from "./CreateRoute";
import {createStackNavigator} from "react-navigation-stack";
import Route from "./Route";

export const RoutesNavigation = createStackNavigator({
    Route: {
        screen: Routes,
    },
    CreateRoute: {
        screen: CreateRoute,
    },
    SingleRoute: {
        screen: Route,
    },
}, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);
