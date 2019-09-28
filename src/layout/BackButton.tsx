import React from 'react';
import styled from 'styled-components';
import {Image, TouchableOpacity} from 'react-native';
import {__COLORS} from './Colors';
import {withNavigation} from 'react-navigation';

const Container = styled(TouchableOpacity)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.3);
  position: absolute;
  top: 40px;
  left: 10px;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Icon = styled(Image)`
  tint-color: ${__COLORS.SECONDARY};
  height: 30px;
  width: 30px;
`;

export default withNavigation(props => {
  return (
    <Container onPress={() => props.navigation.goBack()}>
      <Icon source={require('../assets/baseline_arrow_back_black_48dp.png')} />
    </Container>
  );
});
