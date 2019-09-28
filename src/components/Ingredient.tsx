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
import getCo2Hue from '../helpers/get-co2-hue';
import {getAlphaColor} from '../layout/AlphaColor';

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

const CO2 = styled(TextRegular)<{color: string}>`
  margin-top: 5px;
  text-align: center;
  color: ${props => props.color};
`;

const Label = styled(MyView)<{color: string}>`
  padding: 2px 8px 4px 8px;
  border-radius: 6px;
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
      <Name fontSize={13}>
        {product.name.substr(0, 32)} {product.name.length > 32 && '..'}
      </Name>
      <Label color={getAlphaColor(0.3, getCo2Hue(co2offset))}>
        <CO2 fontSize={14} color={getAlphaColor(1, getCo2Hue(co2offset))}>
          {Math.round(co2offset).toFixed(0)}g CO₂ / 100g
        </CO2>
      </Label>
    </Container>
  );
};
