import React from 'react';
import {View, Text} from 'react-native';
import {IngredientEvaluation} from '../helpers/backend-types';
import getCo2Hue from '../helpers/get-co2-hue';
import formatCo2 from '../layout/formatCo2';
import styled from 'styled-components';
import {__FONT_FAMILIES} from '../layout/Fonts';
import {__COLORS} from '../layout/Colors';
import {getAlphaColor} from '../layout/AlphaColor';

const Container = styled(View)`
  padding-left: 16px;
  padding-bottom: 10px;
  padding-top: 10px;
  border-top-width: 1px;
  border-top-color: ${getAlphaColor(0.1, __COLORS.TEARTIARY)};
`;

export default (props: {
  ingredient: IngredientEvaluation;
  people: number;
  grayed?: boolean;
}) => {
  return (
    <Container
      style={{
        backgroundColor: props.grayed
          ? getAlphaColor(0.06, __COLORS.TEARTIARY)
          : 'white',
      }}>
      <Text style={{fontFamily: __FONT_FAMILIES.MEDIUM}}>
        {props.ingredient.perPerson * props.people}
        {props.ingredient.unit} {props.ingredient.label}
      </Text>
      <Text style={{fontFamily: __FONT_FAMILIES.REGULAR}}>
        {props.ingredient.positiveRemarks.map(r => {
          return (
            <Text style={{color: getCo2Hue(0)}} key={r.message}>
              {r.message} ∙{' '}
            </Text>
          );
        })}
        {props.ingredient.negativeRemarks.map(r => {
          return (
            <Text
              style={{color: getCo2Hue(1000), fontWeight: 'bold'}}
              key={r.message}>
              {r.message} ∙{' '}
            </Text>
          );
        })}
        <Text
          style={{
            color: getCo2Hue(
              props.ingredient.averageCarbonEmission *
                props.ingredient.perPerson,
            ),
          }}>
          {formatCo2(
            props.ingredient.averageCarbonEmission *
              props.ingredient.perPerson *
              props.people,
          )}{' '}
          CO₂
        </Text>
      </Text>
    </Container>
  );
};
