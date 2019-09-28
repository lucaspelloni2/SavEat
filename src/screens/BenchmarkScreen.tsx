import React from 'react';
import styled from 'styled-components';
import {Flex, MyView} from '../layout/Layout';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import FullscreenBackground from '../layout/FullscreenBackground';

const Container = styled(Flex)``;

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

class BenchmarkScreen extends React.Component<Props, {}> {
  render() {
    return <FullscreenBackground />;
  }
}
export default withNavigation(BenchmarkScreen);
