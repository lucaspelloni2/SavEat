import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {__COLORS} from '../layout/Colors';

const Dot = styled(View)`
  height: 6px;
  width: 6px;
  border-radius: 3px;
  background: ${__COLORS.TEARTIARY};
  margin-left: 8px;
  margin-right: 8px;
`;

const Row = styled(View)`
  flex-direction: row;
  justify-content: center;
`;

export default () => {
  return (
    <Row>
      <Dot />
      <Dot />
      <Dot />
    </Row>
  );
};
