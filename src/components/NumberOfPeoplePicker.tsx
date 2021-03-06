import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components';
import {__COLORS} from '../layout/Colors';
import {__FONT_FAMILIES} from '../layout/Fonts';
import formatCo2 from '../layout/formatCo2';

const Row = styled(View)`
  flex-direction: row;
  margin-top: 30px;
  margin-bottom: 20px;
  align-items: center;
  padding-left: 16px;
  padding-right: 10px;
`;

const ChangeButton = styled(View)<{disabled: boolean}>`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${__COLORS.TEARTIARY};
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  opacity: ${props => (props.disabled ? 0.3 : 1)};
`;

const ChangeLabel = styled(Text)`
  font-family: ${__FONT_FAMILIES.MEDIUM};
  color: ${__COLORS.TEARTIARY};
  font-size: 36px;
  margin-top: 3px;
`;

const ForHowManyPeopleLabel = styled(Text)`
  font-family: ${__FONT_FAMILIES.BOLD};
`;

const TotalCO2 = styled(Text)`
  font-family: ${__FONT_FAMILIES.REGULAR};
`;

export default (props: {
  people: number;
  totalCo2: number;
  setPeople: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <Row>
      <View>
        <ForHowManyPeopleLabel>
          For {props.people} {props.people === 1 ? 'person' : 'people'}
        </ForHowManyPeopleLabel>
        <TotalCO2>{formatCo2(props.totalCo2)} CO₂ total</TotalCO2>
      </View>
      <View style={{flex: 1}} />
      <TouchableOpacity
        disabled={props.people === 1}
        onPress={() => {
          props.setPeople(p => p - 1);
        }}>
        <ChangeButton disabled={props.people === 1}>
          <ChangeLabel>-</ChangeLabel>
        </ChangeButton>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={props.people === 15}
        onPress={() => {
          props.setPeople(p => p + 1);
        }}>
        <ChangeButton disabled={props.people === 15}>
          <ChangeLabel style={{marginTop: 4}}>+</ChangeLabel>
        </ChangeButton>
      </TouchableOpacity>
      <View style={{width: 8}} />
    </Row>
  );
};
