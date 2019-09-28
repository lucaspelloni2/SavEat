import React from 'react';
import styled from 'styled-components';
import {TouchableOpacity, Image} from 'react-native';
import {MyView} from '../layout/Layout';

export type Ingredients = {
  image: string;
  co2: number;
};
export type RecipeType = {
  image: string;
  name: string;
  ingredients: Ingredients[];
  provenance: string;
  co2: number; // server-side already computes average for recipe
};

type Props = {
  recipe: RecipeType;
};

const Container = styled(TouchableOpacity)``;

const PictureContainer = styled(MyView)``;

export const Recipe = ({recipe}: Props) => {
  return (
    <Container>
      <PictureContainer>
        <Image source={{uri: recipe.image}} />
      </PictureContainer>
    </Container>
  );
};
