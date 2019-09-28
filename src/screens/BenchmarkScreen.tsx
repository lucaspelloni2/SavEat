import React from 'react';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import FullscreenBackground from '../layout/FullscreenBackground';

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

class BenchmarkScreen extends React.Component<Props, {}> {
  render() {
    return <FullscreenBackground />;
  }
}
export default withNavigation(BenchmarkScreen);
