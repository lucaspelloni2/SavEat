import React from 'react';
import styled from 'styled-components';
import {TouchableOpacity} from 'react-native';
import {SPACING} from '../layout/Layout';
import {NavigationScreenProp} from 'react-navigation';
// @ts-ignore
import BackSVG from '../assets/icons/back.svg';

const SVGContainer = styled(TouchableOpacity)`
  margin-left: ${SPACING / 2}px;
  padding: ${SPACING * 2}px;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  margin-left: ${SPACING * 2}px;
`;

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

export const BackIcon = ({navigation}: Props) => {
  return (
    <SVGContainer
      onPress={() => {
        navigation.pop();
      }}>
      <BackSVG width={20} height={20} />
    </SVGContainer>
  );
};
