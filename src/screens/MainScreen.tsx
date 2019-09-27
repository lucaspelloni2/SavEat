import React from 'react';
import styled from 'styled-components';
import {Flex, MyView} from '../layout/Layout';
import {NavigationScreenProp} from 'react-navigation';
import {TouchableOpacity} from 'react-native';
import {__SCREENS} from '../navigation/Screens';

const Container = styled(Flex)`
  background: red;
`;

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

class MainScreen extends React.Component<Props, {}> {
  componentDidMount(): void {}

  render() {
    const {navigation} = this.props;
    return (
      <Container number={1}>
        <TouchableOpacity
          style={{width: 200, height: 200, backgroundColor: 'blue'}}
          onPress={() => {
            navigation.navigate(__SCREENS.BENCHMARK);
          }}
        />
      </Container>
    );
  }
}
export default MainScreen;
