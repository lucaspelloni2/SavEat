import React, {ReactNode} from 'react';
import {StatusBar, YellowBox} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

YellowBox.ignoreWarnings([
  'Remote debugger',
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillMount has been renamed',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillReceiveProps has been renamed',
  'Warning: componentWillUpdate has been renamed',
  '-[RCTRootView cancelTouches]',
]);

const App: () => ReactNode = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </>
  );
};

export default App;
