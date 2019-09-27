import React, {ReactNode} from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from "./src/navigation/AppNavigator";

const App: () => ReactNode = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </>
  );
};

export default App;
