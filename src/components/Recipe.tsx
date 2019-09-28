import React from 'react';
import styled from 'styled-components';
import {Image, StyleSheet, View} from 'react-native';
import {MyView, SPACING, TextBold} from '../layout/Layout';
import {__COLORS} from '../layout/Colors';
import {Recipe} from '../helpers/backend-types';

export type Ingredients = {
  id: string;
  image: string;
  co2: number;
  price: number;
};

type Props = {
  recipe: Recipe;
};

const Container = styled(View)`
  min-height: 150px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${__COLORS.SECONDARY};
`;

const PictureContainer = styled(MyView)`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const TitleContainer = styled(MyView)`
  justify-content: center;
  margin-left: ${SPACING * 2}px;
  flex: 1;
`;

const Title = styled(TextBold)`
  font-size: 20px;
`;

const Shadow = StyleSheet.create({
  shadow: {
    shadowColor: 'rgba(0,0,0, .7)',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 1,
    shadowRadius: 5,
    flexDirection: 'row',
  },
});

export const RecipePreview = ({recipe}: Props) => {
  const SIZE = 120;
  return (
    <Container>
      <PictureContainer>
        <View style={[Shadow.shadow]}>
          <Image
            source={{uri: recipe.image}}
            style={[
              {width: SIZE, height: SIZE, borderRadius: SIZE / 2},
              Shadow.shadow,
            ]}
          />
        </View>
      </PictureContainer>
      <TitleContainer>
        <Title>{recipe.name}</Title>
      </TitleContainer>
    </Container>
  );
};
