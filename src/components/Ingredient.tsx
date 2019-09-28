import React from 'react';
import styled from 'styled-components';
import {IngredientEvaluation, Product, RecipeIngredient} from '../helpers/backend-types';
import {MyView} from '../layout/Layout';
import {Image} from 'react-native';

type Props = {
  ingredient: Product;
};
const Container = styled(MyView)``;

export const Ingredient = ({ingredient}: Props) => {
  return (
    <Container>
      <Image
        style={{height: 120, width: 120}}
        source={{
          uri: ingredient.image,
        }}
        resizeMode={'contain'}
      />
    </Container>
  );
};
