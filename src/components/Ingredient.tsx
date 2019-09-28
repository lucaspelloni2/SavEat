import React from 'react';
import styled from 'styled-components';
import {
  IngredientEvaluation,
  Product,
  RecipeIngredient,
} from '../helpers/backend-types';
import {MyView} from '../layout/Layout';
import {Image} from 'react-native';
import {__COLORS, __GRAY_COLORS} from '../layout/Colors';

type Props = {
  ingredient: Product;
};
const Container = styled(MyView)`
  flex-direction: row;
  background: blue;
  flex: 1;
`;

const ImageContainer = styled(MyView)``;

export const Ingredient = ({ingredient}: Props) => {
  console.log(ingredient);
  return (
    <Container>
      <ImageContainer>
        <Image
          style={{height: 100, width: 100}}
          source={{
            uri: ingredient.image,
          }}
          resizeMode={'contain'}
        />
      </ImageContainer>
    </Container>
  );
};
