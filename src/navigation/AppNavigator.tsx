import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {__SCREENS} from "./Screens";
import {OnBoardingStackNavigator} from "./AppStackNavigator";

export default createAppContainer(
    createSwitchNavigator(
        {
            [__SCREENS.APP]: OnBoardingStackNavigator,
        },
        {initialRouteName: __SCREENS.APP},
    ),
);
