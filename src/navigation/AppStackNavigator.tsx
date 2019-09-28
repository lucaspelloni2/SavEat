import React from 'react';
import {__SCREENS} from './Screens';
import {TextBold} from '../layout/Layout';
import {__COLORS} from '../layout/Colors';
import {createStackNavigator, NavigationScreenProp} from 'react-navigation';
import MainScreen from '../screens/MainScreen';
import BenchmarkScreen from '../screens/BenchmarkScreen';
import {BackIcon} from '../components/BackIcon';

type NavigationProps = {
  navigation: NavigationScreenProp<any, any>;
};

export const OnBoardingStackNavigator = createStackNavigator(
  {
    [__SCREENS.APP]: {
      screen: MainScreen,
      path: __SCREENS.APP,
      navigationOptions: ({navigation}: NavigationProps) => ({
        header: null,
      }),
      headerTransparent: true,
      backgroundColor: 'transparent',
    },
    [__SCREENS.BENCHMARK]: {
      screen: BenchmarkScreen,
      path: __SCREENS.BENCHMARK,
      headerTransparent: true,
      navigationOptions: ({navigation}: NavigationProps) => ({
        headerTitle: <TextBold>title</TextBold>,
        headerLeft: <BackIcon navigation={navigation} />,
        headerRight: <TextBold>right</TextBold>,
      }),
    },
  },
  {
    initialRouteName: __SCREENS.APP,
    cardStyle: {
      backgroundColor: __COLORS.APP_BACKGROUND,
    },
    headerMode: 'float',
    headerTransitionPreset: 'uikit',
    defaultNavigationOptions: {
      headerStyle: {
        elevation: 0,
        backgroundColor: __COLORS.APP_BACKGROUND,
        borderBottomWidth: 0,
      },
    },
  },
);
