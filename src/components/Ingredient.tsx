import React from 'react';
import styled from 'styled-components';
import {
  IngredientEvaluation,
  Product,
  ProductWithCarbonProjection,
  RecipeIngredient,
} from '../helpers/backend-types';
import {MyView, TextBold, TextExtraBold, TextRegular} from '../layout/Layout';
import {Image, StyleSheet} from 'react-native';
import {__COLORS, __GRAY_COLORS} from '../layout/Colors';
import IngredientEvaluationView from './IngredientEvaluationView';
import Card from './Card';

type Props = {
  ingredient: ProductWithCarbonProjection;
};
const Container = styled(MyView)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const ImageContainer = styled(MyView)``;

const Name = styled(TextExtraBold)`
  color: ${__GRAY_COLORS._BLACK};
  margin-top: 12px;
  text-align: center;
`;

const CO2 = styled(TextRegular)`
  color: ${__GRAY_COLORS._BLACK};
  margin-top: 12px;
  text-align: center;
`;

const Separator = styled(MyView)<{color: string}>`
  width: 10px;
  height: 4px;
  background: ${props => props.color};
`;

const Shadow = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
});

export const Ingredient = ({ingredient}: Props) => {
  const {product} = ingredient;
  const price = product.price; // rappe
  const co2offset = ingredient.co2Offset;
  const color = ingredient.product.colors;

  return (
    <Container>
      <ImageContainer>
        <Image
          style={{height: 100, width: 150, borderRadius: 10}}
          source={{
            uri: product.image,
          }}
          resizeMode={'contain'}
        />
      </ImageContainer>
      <Name fontSize={14}>{product.name}</Name>
      <CO2 fontSize={14}>{Math.round(co2offset).toFixed(0)} CO2</CO2>
    </Container>
  );
};
