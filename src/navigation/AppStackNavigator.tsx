import React from 'react';
import {__SCREENS} from './Screens';
import {TextBold} from '../layout/Layout';
import {__COLORS} from '../layout/Colors';
import {createStackNavigator, NavigationScreenProp} from 'react-navigation';
import MainScreen from '../screens/MainScreen';
import BenchmarkScreen from '../screens/BenchmarkScreen';

type NavigationProps = {
  navigation: NavigationScreenProp<any, any>;
};

export const OnBoardingStackNavigator = createStackNavigator(
  {
    [__SCREENS.APP]: {
      screen: ({navigation}: NavigationProps) => (
        <MainScreen navigation={navigation} />
      ),
      path: __SCREENS.APP,
      navigationOptions: ({navigation}: NavigationProps) => ({
        headerTitle: <TextBold>title</TextBold>,
        headerLeft: <TextBold>Left</TextBold>,
        headerRight: <TextBold>right</TextBold>,
      }),
    },
    [__SCREENS.BENCHMARK]: {
      screen: ({navigation}: NavigationProps) => (
        <BenchmarkScreen navigation={navigation} />
      ),
      path: __SCREENS.BENCHMARK,
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
