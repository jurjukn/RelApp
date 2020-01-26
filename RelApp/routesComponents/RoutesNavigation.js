import Routes from "../screens/Routes";
import CreateRoute from "./CreateRoute";
import {createStackNavigator} from "react-navigation-stack";
import SingleRoute from "./SingleRoute";

export const RoutesNavigation = createStackNavigator({
    Route: {
        screen: Routes,
    },
    CreateRoute: {
        screen: CreateRoute,
    },
    SingleRoute: {
        screen: SingleRoute,
    },
}, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);
