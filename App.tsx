import React, {ReactNode} from 'react';
import {StatusBar} from 'react-native';
import {MyView, TextBold, TextExtraBold, TextRegular} from './src/layout/Layout';

const App: () => ReactNode = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <MyView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'blue',
        }}>
        <TextBold fontSize={80}>Bold</TextBold>
        <TextExtraBold fontSize={40}>Extra Bold</TextExtraBold>
        <TextRegular fontSize={40}>Regular</TextRegular>
      </MyView>
    </>
  );
};

export default App;
