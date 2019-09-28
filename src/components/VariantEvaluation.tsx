import React from 'react';
import {Text, View} from 'react-native';
import {ProductWithCarbonProjection} from '../helpers/backend-types';
import formatCo2 from '../layout/formatCo2';
import styled from 'styled-components';
import {getAlphaColor} from '../layout/AlphaColor';
import {__COLORS} from '../layout/Colors';
import getCo2Hue from '../helpers/get-co2-hue';

const Container = styled(View)`
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 10px;
  padding-top: 10px;
  border-top-width: 1px;
  border-top-color: ${getAlphaColor(0.1, __COLORS.TEARTIARY)};
`;

export default (props: {
  evaluation: ProductWithCarbonProjection;
  grayed?: boolean;
}) => {
  return (
    <Container
      style={{
        backgroundColor: props.grayed
          ? getAlphaColor(0.06, __COLORS.TEARTIARY)
          : 'white',
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text>{props.evaluation.product.name}</Text>
        <View style={{flex: 1}} />
        <Text>{props.evaluation.product.price}</Text>
      </View>
      <Text>
        {props.evaluation.positiveRemarks.map(positiveRm => (
          <Text style={{fontWeight: 'bold'}}>
            {positiveRm.message}
            {' ∙ '}
          </Text>
        ))}
        {props.evaluation.negativeRemarks.map(negativeRm => (
          <Text style={{fontWeight: 'bold', color: getCo2Hue(1000)}}>
            {negativeRm.message}
            {' ∙ '}
          </Text>
        ))}
        <Text>{formatCo2(props.evaluation.co2Offset)} CO₂</Text>
      </Text>
    </Container>
  );
};
