import React from 'react';
import {Image} from 'react-native';

export default () => (
  <Image
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: '#09665C',
    }}
    source={require('../assets/images/background.png')}
  />
);
