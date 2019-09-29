import React from 'react';
import {View, Text} from 'react-native';
import {ProductWithCarbonProjection} from '../helpers/backend-types';
import VariantEvaluation from './VariantEvaluation';
import styled from 'styled-components';
import {__FONT_FAMILIES} from '../layout/Fonts';

const Title = styled(Text)`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  font-family: ${__FONT_FAMILIES.BOLD};
  margin-bottom: 8px;
  margin-top: 8px;
`;

export default (props: {variants: ProductWithCarbonProjection[]}) => {
  const limited = props.variants.slice(0, 6);
  return (
    <View
      style={{
        paddingTop: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingBottom: 50,
      }}>
      {limited.map((v, idx) => (
        <View key={idx}>
          {idx === 0 ? <Title>Lowest emission</Title> : null}
          {idx === 1 ? <Title>Other products</Title> : null}
          <VariantEvaluation evaluation={v} />
        </View>
      ))}
    </View>
  );
};
