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

const Separator = styled(MyView)<{color: string}>`
  width: 10px;
  height: 4px;
  background: ${props => props.color};
`;

export const Ingredient = ({ingredient}: Props) => {
  console.log(ingredient);

  const {product} = ingredient;
  const price = product.price; // rappe
  const co2offset = ingredient.co2Offset;
  const color = ingredient.product.colors;
  console.log(color);

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
    </Container>
  );
};
