import React from 'react';
import styled from 'styled-components';
import {MyView, SPACING, TextBold, TextRegular} from '../layout/Layout';
import Season from '../assets/icons/season.svg';
import Price from '../assets/icons/price.svg';
import CO2 from '../assets/icons/co2.svg';
import {__COLORS} from '../layout/Colors';
import {getAlphaColor} from '../layout/AlphaColor';
import {TouchableOpacity} from 'react-native';

export const Container = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: ${SPACING * 3}px;
  margin-top: ${SPACING * 2}px;
`;
const SIZE = 40;
const BallContainer = styled(MyView)`
  flex-direction: column;
  align-items: center;
`;
const Ball = styled(MyView)`
  background: ${__COLORS.WHITE};
  width: ${SIZE * 1.5}px;
  height: ${SIZE * 1.5}px;
  justify-content: center;
  border-radius: ${(SIZE * 2) / 2}px;
  align-items: center;
  padding: 12px;
`;

const Name = styled(TextBold)`
  font-size: 12px;
  margin-top: 8px;
  color: ${getAlphaColor(0.75, __COLORS.WHITE)};
`;

const IconContainer = styled(MyView)``;

const Types = [
  {
    name: 'Emissions',
    icon: <CO2 width={SIZE} height={SIZE} color={__COLORS.TEARTIARY} />,
  },
  {name: 'Season', icon: <Season width={SIZE} height={SIZE} />},
  {name: 'Price', icon: <Price width={SIZE} height={SIZE} />},
];

export const Filters = () => {
  return (
    <Container>
      {Types.map(t => {
        return (
          <BallContainer key={t.name}>
            <Ball>
              <IconContainer>{t.icon}</IconContainer>
            </Ball>
            <Name>{t.name}</Name>
          </BallContainer>
        );
      })}
    </Container>
  );
};
