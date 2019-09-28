import React from 'react';
import styled from 'styled-components';
import {MyView, SPACING, TextBold} from '../layout/Layout';
import Season from '../assets/icons/season.svg';
import Price from '../assets/icons/price.svg';
import CO2 from '../assets/icons/co2.svg';
import {__COLORS} from '../layout/Colors';
import {getAlphaColor} from '../layout/AlphaColor';
import {TouchableOpacity, View} from 'react-native';
import {FilterMatch} from '../helpers/backend-types';

export const Container = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: ${SPACING * 3}px;
  margin-top: ${SPACING * 2}px;
`;
const SIZE = 40;
const BallContainer = styled(TouchableOpacity)`
  flex-direction: column;
  align-items: center;
`;
const Ball = styled(MyView)<{
  active?: boolean;
}>`
  background: ${__COLORS.WHITE};
  width: ${SIZE * 1.5}px;
  height: ${SIZE * 1.5}px;
  justify-content: center;
  border-width: 4px;
  border-color: ${props => (props.active ? __COLORS.TEARTIARY : 'transparent')};
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

type FilterType = {
  name: string;
  icon: React.ReactNode;
  filter: FilterMatch;
};

const Types: FilterType[] = [
  {
    name: 'Emissions',
    filter: 'emission',
    icon: <CO2 width={SIZE} height={SIZE} color={__COLORS.TEARTIARY} />,
  },
  {
    name: 'Season',
    filter: 'season',
    icon: <Season width={SIZE} height={SIZE} />,
  },
  {name: 'Price', filter: 'budget', icon: <Price width={SIZE} height={SIZE} />},
];

export const Filters = (props: {
  filter: FilterMatch | null;
  onFilterChange: (f: FilterMatch) => void;
}) => {
  return (
    <Container>
      {Types.map(t => {
        return (
          <BallContainer
            key={t.name}
            onPress={() => {
              props.onFilterChange(t.filter);
            }}>
            <Ball active={props.filter === t.filter}>
              <IconContainer>{t.icon}</IconContainer>
            </Ball>
            <Name>{t.name}</Name>
          </BallContainer>
        );
      })}
    </Container>
  );
};
